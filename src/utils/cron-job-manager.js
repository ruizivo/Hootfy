const cron = require('node-cron');

class CronJobManager {

  static task = null;
  static page = null;

  static start(pageMonitor) {
    this.page = pageMonitor;
    if (!this.task) {
      console.log(`Tarefas periódicas iniciadas`);
      // Padrão: a cada 30 minutos
      const schedule = pageMonitor.configManager.config.schedule || '*/30 * * * *';

      this.task = cron.schedule(schedule, async () => {
        console.log('Verificação periódica iniciada:', new Date().toISOString());
        
        try {
          const results = await pageMonitor.checkAllUrls();
          
          // // Registra histórico de execução
          // const history = await this.storageAdapter.get('monitor_history') || [];
          // history.push({
          //   timestamp: new Date().toISOString(),
          //   results
          // });

          // // Mantém apenas os 100 últimos registros
          // const trimmedHistory = history.slice(-100);
          // await this.storageAdapter.set('monitor_history', trimmedHistory);

          console.log(`Verificação concluída. ${results.length} URLs com mudanças.`);
        } catch (error) {
          console.error('Erro na verificação periódica:', error);
        }
      });

      //console.log(`Tarefas periódicas iniciadas. Próxima execução: ${this.getNextExecution(schedule)}`);
    }
  }

  getNextExecution(schedule) {
    // Lógica simplificada para próxima execução
    const cronParser = require('cron-parser');
    const interval = cronParser.parseExpression(schedule);
    return interval.next().toISOString();
  }

  static updateSchedule(newSchedule) {
    // Método para atualizar o agendamento dinamicamente
    this.stop();
    this.config.schedule = newSchedule;
    this.start();
  }

  static stop() {
    // Implementação de parada das tarefas
    //cron.getTasks().forEach(task => task.stop());

    if (this.task) {
      this.task.stop();
      this.task = null;
      console.log('Cron parado');
    }
  }

  static isRunning() {
    return this.task !== null;
  }
}

module.exports = CronJobManager;