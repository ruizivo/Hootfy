const axios = require('axios');

class NotificationSender {
  constructor(globalWebhook = null) {
    this.globalWebhook = globalWebhook;
  }

  async send(url, changes, specificWebhook = null) {
    const webhookUrl = specificWebhook || this.globalWebhook;

    if (!webhookUrl) {
      console.log('Nenhum webhook configurado');
      return false;
    }

    try {
      const payload = {
        url,
        timestamp: new Date().toISOString(),
        changes
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