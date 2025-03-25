const axios = require('axios');
const HTMLCleaner = require('../utils/html-cleaner');
const DiffGenerator = require('../utils/diff-generator');
const StorageAdapter = require('../storage/storage-adapter');
const NotificationSender = require('./notification-sender');

class PageMonitor {
  constructor(config, notificationSender, storageAdapter) {
    this.config = config;
    this.notificationSender = notificationSender;
    this.storageAdapter = storageAdapter;
  }

  async checkUrl(urlConfig) {
    try {
      const response = await axios.get(urlConfig.url);
      const cleanedHtml = HTMLCleaner.clean(
        response.data, 
        [...(this.config.remove_elements_global || []), ...(urlConfig.remove_elements || [])]
      );
      const textContent = HTMLCleaner.extractText(cleanedHtml);

      const storedContent = await this.storageAdapter.get(urlConfig.url);

      if (!storedContent) {
        await this.storageAdapter.set(urlConfig.url, textContent);
        return null;
      }

      const changes = DiffGenerator.generateDiff(storedContent, textContent);

      if (changes.length > 0) {
        const formattedChanges = DiffGenerator.formatChangesForWebhook(changes);
        
        await this.notificationSender.send(
          urlConfig.url, 
          formattedChanges, 
          urlConfig.webhook
        );

        await this.storageAdapter.set(urlConfig.url, textContent);
      }

      return changes;
    } catch (error) {
      console.error(`Erro ao verificar URL ${urlConfig.url}:`, error.message);
      return null;
    }
  }

  async checkAllUrls() {
    const activeUrls = this.config.getActiveUrls();
    const results = [];

    for (const urlConfig of activeUrls) {
      const changes = await this.checkUrl(urlConfig);
      if (changes && changes.length > 0) {
        results.push({
          url: urlConfig.url,
          changes
        });
      }
    }

    return results;
  }
}

module.exports = PageMonitor;