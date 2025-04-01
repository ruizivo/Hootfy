const ConfigManager = require('../src/core/config-manager');
const PageMonitor = require('../src/core/page-monitor');
const StorageAdapter = require('../src/storage/storage-adapter');
const NotificationSender = require('../src/core/notification-sender');

exports.handler = async (event, context) => {
  try {
    const configManager = new ConfigManager();
    const storageAdapter = new StorageAdapter(process.env.DB_TYPE || 'file');
    const notificationSender = new NotificationSender(process.env.GLOBAL_WEBHOOK_URL);
    
    const pageMonitor = new PageMonitor(
      configManager, 
      notificationSender, 
      storageAdapter
    );

    const results = await pageMonitor.checkAllUrls();
    
    console.error('result:', results);

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