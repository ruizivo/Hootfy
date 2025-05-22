const express = require('express');

class ConfigRoutes {
  constructor(configManager) {
    this.router = express.Router();
    this.configManager = configManager;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/', this.getConfig.bind(this));
    this.router.put('/', this.updateConfig.bind(this));
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
      res.json({ message: 'Configuration updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ConfigRoutes;