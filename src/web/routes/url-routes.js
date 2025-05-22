const express = require('express');

class UrlRoutes {
  constructor(configManager) {
    this.router = express.Router();
    this.configManager = configManager;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/', this.addUrl.bind(this));
    this.router.put('/:id', this.editUrl.bind(this));
    this.router.delete('/:id', this.removeUrl.bind(this));
  }

  async addUrl(req, res) {
    try {
      this.configManager.addUrl(req.body);
      res.json({ message: 'URL added successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async editUrl(req, res) {
    try {
      this.configManager.updateUrl(req.params.id, req.body);
      res.json({ message: 'URL updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async removeUrl(req, res) {
    try {
      this.configManager.removeUrlByIndex(req.params.id);
      res.json({ message: 'URL removed successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UrlRoutes;