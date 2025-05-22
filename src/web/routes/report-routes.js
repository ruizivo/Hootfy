const express = require('express');

class ReportRoutes {
  constructor(storageAdapter) {
    this.router = express.Router();
    this.storageAdapter = storageAdapter;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.delete('/', this.removeReport.bind(this));
    this.router.get('/', this.getReportHistory.bind(this));
  }

  async removeReport(req, res) {
    try {
      this.storageAdapter.delete(req.body.path);
      res.json({ message: 'Report removed successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getReportHistory(req, res) {
    try {
      //const folder= path.join('./data', 'reports');
      // Lógica para buscar histórico de monitoramento
      const history = await this.storageAdapter.getAllKeys('reports') || [];
      res.json(history);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ReportRoutes;