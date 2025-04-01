const puppeteer = require('puppeteer');
const sharp = require('sharp');
const HTMLCleaner = require('../utils/html-cleaner');
const DiffGenerator = require('../utils/diff-generator');
const StorageAdapter = require('../storage/storage-adapter');
const NotificationSender = require('./notification-sender');
const ReportGenerator = require('../utils/report-generator');

class PageMonitor {
  constructor(config, notificationSender, storageAdapter) {
    this.config = config;
    this.notificationSender = notificationSender;
    this.storageAdapter = storageAdapter;
    this.browser = null;
  }

  async init() {
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
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

  async checkUrl(urlConfig) {
    try {
      if (!this.browser) {
        await this.init();
      }

      const page = await this.browser.newPage();
      
      // Configurar viewport para um tamanho padrão
      await page.setViewport({ width: 1920, height: 1080 });
      
      // Navegar para a URL
      await page.goto(urlConfig.url, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      let screenshot = null;
      // Capturar screenshot apenas se estiver habilitado
      if (urlConfig.enable_screenshot !== false) {
        const screenshotBuffer = await page.screenshot({
          fullPage: true,
          type: 'jpeg',
          quality: 80
        });
        screenshot = await this.compressScreenshot(screenshotBuffer);
      }
      
      // Obter o HTML da página
      const html = await page.content();
      const cleanedHtml = HTMLCleaner.clean(html, urlConfig.remove_elements, urlConfig.include_elements);
      const textContent = HTMLCleaner.extractText(cleanedHtml);

      const storedContent = await this.storageAdapter.get(urlConfig.url);
      const storedScreenshot = urlConfig.enable_screenshot !== false ? 
        await this.storageAdapter.get(`${urlConfig.url}_screenshot`) : null;

      if (!storedContent) {
        await this.storageAdapter.set(urlConfig.url, textContent);
        if (screenshot) {
          await this.storageAdapter.set(`${urlConfig.url}_screenshot`, screenshot);
        }
        await page.close();
        return null;
      }

      const changes = DiffGenerator.generateDiff(storedContent, textContent);

      if (changes.length > 0) {
        // Gerar e salvar relatório HTML
        const report = await ReportGenerator.generateReport(
          urlConfig.url,
          changes,
          storedContent,
          textContent,
          storedScreenshot,
          screenshot
        );
        const reportPath = await ReportGenerator.saveReport(report);

        // Enviar notificação com link para o relatório
        const formattedChanges = DiffGenerator.formatChangesForWebhook(changes);
        await this.notificationSender.send(
          urlConfig.url,
          {
            changes: formattedChanges,
            reportUrl: `file://${reportPath.replace(/\\/g, '/')}`
          },
          urlConfig.webhook
        );

        // Atualizar conteúdo armazenado
        await this.storageAdapter.set(urlConfig.url, textContent);
        if (screenshot) {
          await this.storageAdapter.set(`${urlConfig.url}_screenshot`, screenshot);
        }
      }

      await page.close();
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