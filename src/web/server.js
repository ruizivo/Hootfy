const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ConfigManager = require('../core/config-manager');
const PageMonitor = require('../core/page-monitor');
const StorageAdapter = require('../storage/storage-adapter');
const NotificationSender = require('../core/notification-sender');

class WebServer {
  constructor() {
    this.app = express();
    this.configManager = new ConfigManager();
    this.storageAdapter = new StorageAdapter(process.env.DB_TYPE || 'file');
    this.notificationSender = new NotificationSender(process.env.GLOBAL_WEBHOOK_URL);
    this.pageMonitor = new PageMonitor(
      this.configManager, 
      this.notificationSender, 
      this.storageAdapter
    );

    this.setupMiddlewares();
    this.setupRoutes();
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
    this.app.use(express.static('public'));
  }

  setupRoutes() {
    this.app.get('/api/config', this.getConfig.bind(this));
    this.app.post('/api/config', this.updateConfig.bind(this));
    this.app.post('/api/url', this.addUrl.bind(this));
    this.app.delete('/api/url', this.removeUrl.bind(this));
    this.app.get('/api/monitor', this.runMonitor.bind(this));
    this.app.get('/api/history', this.getMonitorHistory.bind(this));
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

  async removeUrl(req, res) {
    try {
      this.configManager.removeUrl(req.body.url);
      res.json({ message: 'URL removida com sucesso' });
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
      // Lógica para buscar histórico de monitoramento
      const history = await this.storageAdapter.get('monitor_history') || [];
      res.json(history);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  start(port = 3000) {
    this.app.listen(port, () => {
      console.log(`Servidor web rodando na porta ${port}`);
    });
  }
}

const webServer = new WebServer();
webServer.start();

module.exports = WebServer;