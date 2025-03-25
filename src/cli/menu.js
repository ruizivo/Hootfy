const readline = require('readline');
const ConfigManager = require('../core/config-manager');
const PageMonitor = require('../core/page-monitor');
const StorageAdapter = require('../storage/storage-adapter');
const NotificationSender = require('../core/notification-sender');

class CLIMenu {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.configManager = new ConfigManager();
    this.storageAdapter = new StorageAdapter(process.env.DB_TYPE || 'file');
    this.notificationSender = new NotificationSender(process.env.GLOBAL_WEBHOOK_URL);
    this.pageMonitor = new PageMonitor(
      this.configManager, 
      this.notificationSender, 
      this.storageAdapter
    );

  }

  async run() {
    try {
      await this.start();
    } catch (error) {
      console.error('Erro durante a execução do menu:', error);
    } finally {
      this.rl.close();
    }
  }

  async start() {
    while (true) {
      console.clear();
      console.log('=== Monitor de Páginas Web - Testes Locais ===');
      console.log('1. Executar verificação de todas as URLs');
      console.log('2. Inicializar (primeira execução ou reinicializar)');
      console.log('3. Simular mudança em uma página');
      console.log('4. Editar configuração');
      console.log('5. Visualizar conteúdo armazenado');
      console.log('6. Limpar dados de URLs removidas');
      console.log('0. Sair');

      const choice = await this.prompt('Escolha uma opção: ');

      switch (choice) {
        case '1':
          await this.checkAllUrls();
          break;
        case '2':
          await this.initialize();
          break;
        case '3':
          await this.simulateChange();
          break;
        case '4':
          await this.editConfig();
          break;
        case '5':
          await this.viewStoredContent();
          break;
        case '6':
          await this.cleanRemovedUrls();
          break;
        case '0':
          console.log("Encerrando o programa");
          this.rl.close();
          return;
        default:
          console.log('Opção inválida');
      }

      await this.pause();
    }
  }

  async prompt(question) {
    return new Promise(resolve => {
      this.rl.question(question, resolve);
    });
  }

  async pause() {
    await this.prompt('Pressione Enter para continuar...');
  }

  async checkAllUrls() {
    console.log('Verificando todas as URLs...');
    const results = await this.pageMonitor.checkAllUrls();
    if (results.length === 0) {
      console.log('Nenhuma mudança detectada.');
    } else {
      results.forEach(result => {
        console.log(`Mudanças na URL: ${result.url}`);
        result.changes.forEach(change => {
          console.log(` - ${change.type}: ${change.content}`);
        });
      });
    }
  }

  async initialize() {
    // Implementação de inicialização
    console.log('Inicializando sistema...');
  }

  async simulateChange() {
    // Implementação de simulação de mudança
    console.log('Simulando mudança em uma página...');
  }

  async editConfig() {
    // Implementação de edição de configuração
    console.log('Editando configuração...');
  }

  async viewStoredContent() {
    // Implementação de visualização de conteúdo armazenado
    console.log('Visualizando conteúdo armazenado...');
  }

  async cleanRemovedUrls() {
    // Implementação de limpeza de URLs removidas
    console.log('Limpando dados de URLs removidas...');
  }
}

const cliMenu = new CLIMenu();
cliMenu.run();

module.exports = CLIMenu;