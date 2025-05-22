const express = require('express');
const CronJobManager = require('../../utils/cron-job-manager');

class CronRoutes {
  constructor(configManager, pageMonitor) {
    this.router = express.Router();
    this.configManager = configManager;
    this.pageMonitor = pageMonitor;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/start', this.cronStart.bind(this));
    this.router.post('/stop', this.cronStop.bind(this));
    this.router.get('/status', this.cronStatus.bind(this));
  }

  async cronStart(req, res) {
    try {
      this.configManager.activeScheduler();
      CronJobManager.start(this.pageMonitor)
      res.json({ message: 'Cron jobs started successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async cronStop(req, res) {
    try {
      this.configManager.deactiveScheduler();
      CronJobManager.stop()
      res.json({ message: 'Cron jobs stopped successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async cronStatus(req, res) {
    try {
      const status = CronJobManager.isRunning();
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CronRoutes;