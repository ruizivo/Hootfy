const cron = require('node-cron');
const PageMonitor = require('../core/page-monitor');
const ConfigManager = require('../core/config-manager');
const StorageAdapter = require('../storage/storage-adapter');
const NotificationSender = require('../core/notification-sender');

class CronJobManager {
  constructor(config = {}) {
    this.config = config;
    this.configManager = new ConfigManager();
    this.storageAdapter = new StorageAdapter(this.configManager.getConfig());
    this.notificationSender = new NotificationSender();
    this.pageMonitor = new PageMonitor(
      this.configManager, 
      this.notificationSender, 
      this.storageAdapter
    );
  }

  start() {
    // Padrão: a cada 30 minutos
    const schedule = this.config.schedule || '*/30 * * * *';

    cron.schedule(schedule, async () => {
      console.log('Verificação periódica iniciada:', new Date().toISOString());
      
      try {
        const results = await this.pageMonitor.checkAllUrls();
        
        // Registra histórico de execução
        const history = await this.storageAdapter.get('monitor_history') || [];
        history.push({
          timestamp: new Date().toISOString(),
          results
        });

        // Mantém apenas os 100 últimos registros
        const trimmedHistory = history.slice(-100);
        await this.storageAdapter.set('monitor_history', trimmedHistory);

        console.log(`Verificação concluída. ${results.length} URLs com mudanças.`);
      } catch (error) {
        console.error('Erro na verificação periódica:', error);
      }
    });

    console.log(`Tarefas periódicas iniciadas. Próxima execução: ${this.getNextExecution(schedule)}`);
  }

  getNextExecution(schedule) {
    // Lógica simplificada para próxima execução
    const cronParser = require('cron-parser');
    const interval = cronParser.parseExpression(schedule);
    return interval.next().toISOString();
  }

  updateSchedule(newSchedule) {
    // Método para atualizar o agendamento dinamicamente
    this.stop();
    this.config.schedule = newSchedule;
    this.start();
  }

  stop() {
    // Implementação de parada das tarefas
    cron.getTasks().forEach(task => task.stop());
  }
}

module.exports = CronJobManager;