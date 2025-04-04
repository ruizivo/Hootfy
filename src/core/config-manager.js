const fs = require('fs');
const path = require('path');

class ConfigManager {
  constructor(configPath = path.join(__dirname, '../../config/default-config.json')) {
    this.configPath = configPath;
    this.config = this.loadConfig();
  }

  loadConfig() {
    try {
      const rawConfig = fs.readFileSync(this.configPath, 'utf8');
      return JSON.parse(rawConfig);
    } catch (error) {
      console.error('Erro ao carregar configuração:', error);
      return this.getDefaultConfig();
    }
  }

  getDefaultConfig() {
    return {
      webhook_global: null,
      remove_elements_global: [],
      urls: []
    };
  }

  getConfig(){
    return this.config;
  }

  saveConfig(config) {
    try {
      fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2));
      this.config = config;
    } catch (error) {
      console.error('Erro ao salvar configuração:', error);
    }
  }

  addUrl(urlConfig) {
    this.config.urls.push(urlConfig);
    this.saveConfig(this.config);
  }

  removeUrl(url) {
    this.config.urls = this.config.urls.filter(u => u.url !== url);
    this.saveConfig(this.config);
  }

  updateUrl(url, newConfig) {
    const index = this.config.urls.findIndex(u => u.url === url);
    if (index !== -1) {
      this.config.urls[index] = { ...this.config.urls[index], ...newConfig };
      this.saveConfig(this.config);
    }
  }

  getActiveUrls() {
    this.config = this.loadConfig();

    return this.config.urls
      .filter(url => url.active !== false)
      .map(url => ({
        ...url,
        webhook: url.webhook || this.config.webhook_global,
        remove_elements: [
          ...(this.config.remove_elements_global || []),
          ...(url.remove_elements || [])
        ],
        name:url.url.replace("https://","").replace("http://","").replaceAll("/","-")
      }));
  }
}

module.exports = ConfigManager;