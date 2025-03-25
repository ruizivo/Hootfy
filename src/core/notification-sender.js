const axios = require('axios');

class NotificationSender {
  constructor(globalWebhook = null) {
    this.globalWebhook = globalWebhook;
  }

  async send(url, data, specificWebhook = null) {
    const webhookUrl = specificWebhook || this.globalWebhook;

    if (!webhookUrl) {
      console.log('Nenhum webhook configurado');
      return false;
    }

    try {
      const payload = {
        url,
        timestamp: new Date().toISOString(),
        changes: data.changes,
        reportUrl: data.reportUrl
      };

      const response = await axios.post(webhookUrl, payload);
      return response.status === 200;
    } catch (error) {
      console.error('Erro ao enviar notificação:', error.message);
      return false;
    }
  }
}

module.exports = NotificationSender;