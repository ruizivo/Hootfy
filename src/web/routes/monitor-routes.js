const express = require('express');

class MonitorRoutes {
  constructor(pageMonitor) {
    this.router = express.Router();
    this.pageMonitor = pageMonitor;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/run', this.runMonitor.bind(this));
    //this.router.get('/history', this.getMonitorHistory.bind(this));
  }

  async runMonitor(req, res) {
    try {
      const results = await this.pageMonitor.checkAllUrls();
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

//   async getMonitorHistory(req, res) {
//     try {
//       const history = await this.pageMonitor.getHistory();
//       res.json(history);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }
}

module.exports = MonitorRoutes;