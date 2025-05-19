const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const ConfigManager = require('../core/config-manager');
const PageMonitor = require('../core/page-monitor');
const StorageAdapter = require('../storage/storage-adapter');
const NotificationSender = require('../core/notification-sender');
const puppeteer = require("puppeteer");
const CronJobManager = require('../utils/cron-job-manager');
const http = require ('http');
const Server = require ('socket.io');

class WebServer {
  constructor() {
    this.app = express();
    this.configManager = new ConfigManager();
    this.storageAdapter = new StorageAdapter(this.configManager.getConfig());
    this.notificationSender = new NotificationSender(this.configManager.config.webhook_global);
    this.io=null;
    this.server = null;

    this.setupMiddlewares();
    this.setupRoutes();
  }

   async init(){
    console.log(`Iniciando chrome`);
    let browser = null;
    if(process.env.NODE_ENV == 'production') {
      browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium',
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--single-process',
          '--no-zygote',
          '--no-first-run',
          '--disable-dev-tools',
          '--disable-features=site-per-process',
        ],
        headless: 'new',
      });
    }

    this.pageMonitor = new PageMonitor(
      this.configManager, 
      this.notificationSender, 
      this.storageAdapter,
      browser
    );
    
    console.log(`Iniciado chrome`);

    this.server = http.createServer(this.app);
    this.io =  Server(this.server, {
      cors: {
        origin: '*', // ajuste se necessário
      },
    });

    this.io.on('connection', (socket) => {
      console.log('Cliente conectado:', socket.id);

      socket.on('start-verificacao', async () => {
        const urls = ['https://exemplo1.com', 'https://exemplo2.com'];

        for (const url of urls) {
          // Simula etapas
          socket.emit('progresso', `Verificando: ${url}`);
          await new Promise((r) => setTimeout(r, 1000)); // simula delay
          socket.emit('progresso', `OK: ${url}`);
        }
        socket.on('disconnect', () => {
          console.log('Cliente desconectado:', socket.id);
        });
        socket.emit('finalizado', 'Verificação concluída.');
      });
    }); 
    console.log(`Iniciado websocket`);
  }

  setupMiddlewares() {

    // Add CORS middleware
    this.app.use(cors({
      origin: '*', // Allows all origins - use carefully in production => origin:  'https://yourdomain.com', // Specific origin
      methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }));

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    // Servir arquivos estáticos da pasta 'data' na rota '/html'

    const reportsPath = path.join(__dirname, '../../data/reports');
    this.app.use('/html', express.static(reportsPath));

    console.log('Serving reports from:', reportsPath);
  }

  setupRoutes() {
    this.app.get('/api/config', this.getConfig.bind(this));
    this.app.post('/api/config', this.updateConfig.bind(this));
    this.app.post('/api/url', this.addUrl.bind(this));
    this.app.put('/api/url/:id', this.editUrl.bind(this));
    this.app.delete('/api/url/:id', this.removeUrl.bind(this));
    this.app.get('/api/monitor', this.runMonitor.bind(this));
    this.app.get('/api/history', this.getMonitorHistory.bind(this));


    this.app.post('/api/cron/start', this.cronStart.bind(this));
    this.app.post('/api/cron/stop', this.cronStop.bind(this));
    this.app.post('/api/cron/status', this.cronStatus.bind(this));


    this.app.delete('/api/report/', this.removeReport.bind(this));
  }

  async cronStart(req, res) {
    try {
      this.configManager.activeScheduler();
      CronJobManager.start(this.pageMonitor)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async cronStop(req, res) {
    try {
      this.configManager.deactiveScheduler();
      CronJobManager.stop()
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async cronStatus(req, res) {
    try {
      res.json(CronJobManager.isRunning());
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getConfig(req, res) {
    try {
      res.json(this.configManager.config);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateConfig(req, res) {
    try { 
      this.configManager.saveConfig(req.body); 
      res.json({ message: 'Configuração atualizada com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async addUrl(req, res) {
    try {
      this.configManager.addUrl(req.body);
      res.json({ message: 'URL adicionada com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async editUrl(req, res) {
    try {
      this.configManager.updateUrl(req.params.id, req.body);
      res.json({ message: 'URL adicionada com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async removeUrl(req, res) {
    try {
      this.configManager.removeUrlByIndex(req.params.id);
      res.json({ message: 'URL removida com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async removeReport(req, res) {
    try {
      this.storageAdapter.delete(req.body.path);
      res.json({ message: 'Report removido com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async runMonitor(req, res) {
    try {
      const results = await this.pageMonitor.checkAllUrls();
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getMonitorHistory(req, res) {
    try {
      //const folder= path.join('./data', 'reports');
      // Lógica para buscar histórico de monitoramento
      const history = await this.storageAdapter.getAllKeys('reports') || [];
      res.json(history);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  start(port = 3000) {
    //this.app.listen(port, '0.0.0.0', () => {
    this.server.listen(3000, () => {
      console.log(`Web Server running on port: ${port}`);
      console.log(`Environment: ${process.env.NODE_ENV }`)

      if(this.configManager.isNeedToInitiateScheduler()){
        CronJobManager.start(this.pageMonitor)
      }
    });
  }
}

const webServer = new WebServer();

webServer.init();
webServer.start();

module.exports = WebServer;