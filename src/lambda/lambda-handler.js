const ConfigManager = require('../core/config-manager');
const PageMonitor = require('../core/page-monitor');
const StorageAdapter = require('../storage/storage-adapter');
const NotificationSender = require('../core/notification-sender');

const chromium = require('@sparticuz/chromium');
const puppeteer = require("puppeteer");

module.exports.check = async (event) => {
  try {

    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const configManager = new ConfigManager();
    const storageAdapter = new StorageAdapter(configManager.getConfig());
    const notificationSender = new NotificationSender();   
    const pageMonitor = new PageMonitor(
      configManager, 
      notificationSender, 
      storageAdapter,
      browser
    );

    const results = await pageMonitor.checkAllUrls();
    
    //console.error('result:', results);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Verificação concluída',
        changedUrls: results.length,
        details: results
      })
    };
  } catch (error) {
    console.error('Erro no Lambda:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Erro durante a verificação',
        error: error.message
      })
    };
  }
};