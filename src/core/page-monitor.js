const puppeteer = require('puppeteer');
const sharp = require('sharp');
const HTMLCleaner = require('../utils/html-cleaner');
const DiffGenerator = require('../utils/diff-generator');
const ReportGenerator = require('../utils/report-generator');
const path = require('path');
const fs = require('fs').promises;

class PageMonitor {
  constructor(configManager, notificationSender, storageAdapter, browser = null) {
    this.configManager = configManager;
    this.notificationSender = notificationSender;
    this.storageAdapter = storageAdapter;
    this.browser = browser;
    this.page = null;
  }

  async init() {
    if(!this.browser){
      this.browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async compressScreenshot(buffer) {
    try {
      // Redimensiona para largura máxima de 1920px mantendo proporção
      // Comprime para JPEG com qualidade 80%
      const compressed = await sharp(buffer)
        .resize(1920, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({ 
          quality: 80,
          progressive: true
        })
        .toBuffer();

      return compressed.toString('base64');
    } catch (error) {
      console.error('Erro ao comprimir screenshot:', error);
      return buffer.toString('base64');
    }
  }

  getStoragePath(key, type) {
    const config = this.configManager.getConfig();
    const basePath = this.storageAdapter.storage.basePath
    const folder = type === 'screenshot' ? 'screenshots' : 
                  type === 'report' ? 'reports' : 'content';
    
    if (config.storage_type === 'file') {
      return path.join(basePath, folder, key);
    } else {
      return `${basePath}/${folder}/${key}`;
    }
  }

  async saveReport(report) {
    try {
      const config = this.configManager.getConfig();
      const reportPath = this.getStoragePath(report.urlConfig.name + '/' + report.name, 'report');

      // Criar diretórios necessários se for storage local
      if (config.storage_type === 'file') {
        const dir = path.dirname(reportPath);
        await fs.mkdir(dir, { recursive: true });
      }

      // Salvar o relatório usando o storage adapter
      await this.storageAdapter.set(reportPath, report.content, 'text/html');

      return reportPath;
    } catch (error) {
      console.error('Erro ao salvar relatório:', error);
      throw error;
    }
  }

  async checkUrl(urlConfig) {
    try {
      console.log('go to url: ', urlConfig.url);
  
      // Variável para armazenar a resposta principal
      let mainResponse;
  
      this.page.on('response', response => {
        const request = response.request();
        if (!mainResponse && request.resourceType() === 'document') {
          mainResponse = response;
        }
      });
  
      // Navegar para a URL
      await this.page.goto(urlConfig.url, {
        waitUntil: 'domcontentloaded',
        timeout: 30000
      });
  
      // Verifica se obteve resposta principal
      if (mainResponse) {
        const status = mainResponse.status();
        if (status >= 400) {
          console.error(`Erro HTTP ${status} ao acessar ${urlConfig.url}`);
          return null; // ou lance um erro, ou salve esse status em algum log
        }
      } else {
        console.error('Não foi possível capturar a resposta principal da página.');
        return null;
      }
  
      let screenshot = null;
      if (urlConfig.enable_screenshot !== false) {
        console.log('take screenshot');
        const screenshotBuffer = await this.page.screenshot({
          fullPage: true,
          type: 'jpeg',
          quality: 80
        });
        screenshot = await this.compressScreenshot(screenshotBuffer);
      }
  
      console.log('getting html');
      const html = await this.page.content();
      const cleanedHtml = HTMLCleaner.clean(html, urlConfig.remove_elements, urlConfig.include_elements);
      const textContent = HTMLCleaner.extractText(cleanedHtml);
  
      const contentKey = this.getStoragePath(urlConfig.name, 'content');
      const screenshotKey = this.getStoragePath(urlConfig.name, 'screenshot');
  
      const storedContent = await this.storageAdapter.get(contentKey);
      const storedScreenshot = urlConfig.enable_screenshot !== false ? await this.storageAdapter.get(screenshotKey) : null;
  
      if (!storedContent) {
        console.log('first content view');
        await this.storageAdapter.set(contentKey, textContent);
        if (screenshot) {
          await this.storageAdapter.set(screenshotKey, screenshot);
        }
        return null;
      }
  
      console.log('getting a diff');
      const changes = DiffGenerator.generateDiff(storedContent, textContent);
  
      if (changes.length > 0) {
        console.log('generating html report');
        const report = await ReportGenerator.generateReport(
          urlConfig,
          changes,
          storedContent,
          textContent,
          storedScreenshot,
          screenshot
        );
  
        console.log('saving html report');
        const reportPath = await this.saveReport(report);
  
        const formattedChanges = DiffGenerator.formatChangesForWebhook(changes);
        console.log('send webhook');
        await this.notificationSender.send(
          urlConfig.url,
          {
            changes: formattedChanges,
            reportUrl: `file://${reportPath.replace(/\\/g, '/')}`
          },
          urlConfig.webhook
        );
  
        console.log('update content');
        await this.storageAdapter.set(contentKey, textContent);
        if (screenshot) {
          await this.storageAdapter.set(screenshotKey, screenshot);
        }
      }
  
      console.log('end this url');
      return changes;
    } catch (error) {
      console.error(`Erro ao verificar URL ${urlConfig.url}:`, error.message);
      return null;
    }
  }

  async checkAllUrls() {
    const activeUrls = this.configManager.getActiveUrls();
    const results = [];

    await this.init();
    if (!this.browser || !this.browser.connected) {
      this.browser = await puppeteer.launch();
    }
    this.page = await this.browser.newPage();
    await this.page.setViewport({ width: 1920, height: 1080 });

    for (const urlConfig of activeUrls) {
      const changes = await this.checkUrl(urlConfig);
      if (changes && changes.length > 0) {
        results.push({
          url: urlConfig.url,
          changes
        });
      }
    }

    this.page.close();

    return results;
  }
}

module.exports = PageMonitor;