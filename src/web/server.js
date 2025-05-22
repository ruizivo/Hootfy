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

const ConfigRoutes = require('./routes/config-routes');
const UrlRoutes = require('./routes/url-routes');
const MonitorRoutes = require('./routes/monitor-routes');
const CronRoutes = require('./routes/cron-routes');
const ReportRoutes = require('./routes/report-routes');

class WebServer {
  constructor() {
    this.app = express();
    this.configManager = new ConfigManager();
    this.storageAdapter = new StorageAdapter(this.configManager.getConfig());
    this.notificationSender = new NotificationSender(this.configManager.config.webhook_global);
    this.io=null;
    this.server = null;

    this.setupMiddlewares();
  }

   async init(){
    console.log(`Chrome initiating...`);
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
    
    console.log(`Chrome started`);

    this.server = http.createServer(this.app);
    this.io =  Server(this.server, {
      cors: {
        origin: '*', // adjust if necessary
      },
    });

    this.io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      socket.on('start-verification', async () => {
        const urls = ['https://example1.com', 'https://example2.com'];

        for (const url of urls) {
          // Simulate steps
          socket.emit('progress', `Checking: ${url}`);
          await new Promise((r) => setTimeout(r, 1000)); // simulate delay
          socket.emit('progress', `OK: ${url}`);
        }
        socket.on('disconnect', () => {
          console.log('Client disconnected:', socket.id);
        });
        socket.emit('completed', 'Verification completed.');
      });
    }); 
    console.log(`WebSocket started`);


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

    // Servir arquivos estáticos da pasta 'data' na rota '/html'

    const reportsPath = path.join(__dirname, '../../data/reports');
    this.app.use('/html', express.static(reportsPath));

    console.log('Serving reports from:', reportsPath);
  }

  setupRoutes() {
    const configRoutes = new ConfigRoutes(this.configManager);
    const urlRoutes = new UrlRoutes(this.configManager);
    const monitorRoutes = new MonitorRoutes(this.pageMonitor);
    const cronRoutes = new CronRoutes(this.configManager, this.pageMonitor);
    const reportRoutes = new ReportRoutes(this.storageAdapter);

    this.app.use('/api/config', configRoutes.router);
    this.app.use('/api/url', urlRoutes.router);
    this.app.use('/api/monitor', monitorRoutes.router);
    this.app.use('/api/cron', cronRoutes.router);
    this.app.use('/api/report', reportRoutes.router);
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