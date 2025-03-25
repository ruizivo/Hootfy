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
    console.log('Inicializando sistema...');
    
    // Verifica se já existe configuração
    const currentConfig = this.configManager.config;
    
    if (currentConfig.urls.length === 0) {
      console.log('Configuração inicial não encontrada. Criando configuração padrão...');
      
      // Solicita webhook global
      const webhookUrl = await this.prompt('Digite a URL do webhook global (ou pressione Enter para pular): ');
      
      // Solicita elementos a serem removidos
      console.log('Digite os seletores CSS dos elementos que devem ser removidos (um por linha, pressione Enter duas vezes para finalizar):');
      const removeElements = [];
      while (true) {
        const selector = await this.prompt('> ');
        if (!selector) break;
        removeElements.push(selector);
      }
      
      // Cria configuração inicial
      const initialConfig = {
        webhook_global: webhookUrl || null,
        remove_elements_global: removeElements,
        urls: []
      };
      
      // Salva configuração
      this.configManager.saveConfig(initialConfig);
      console.log('Configuração inicial criada com sucesso!');
    } else {
      console.log('Sistema já inicializado. Use a opção 4 para editar a configuração.');
    }
  }

  async simulateChange() {
    console.log('Simulando mudança em uma página...');
    
    // Lista URLs monitoradas
    const urls = this.configManager.getActiveUrls();
    if (urls.length === 0) {
      console.log('Nenhuma URL configurada para monitoramento.');
      return;
    }
    
    console.log('\nURLs disponíveis para simulação:');
    urls.forEach((url, index) => {
      console.log(`${index + 1}. ${url.url}`);
    });
    
    // Solicita seleção da URL
    const choice = await this.prompt('\nEscolha o número da URL para simular mudança: ');
    const selectedIndex = parseInt(choice) - 1;
    
    if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= urls.length) {
      console.log('Seleção inválida.');
      return;
    }
    
    const selectedUrl = urls[selectedIndex];
    
    // Simula mudança
    console.log(`\nSimulando mudança em: ${selectedUrl.url}`);
    const result = await this.pageMonitor.checkUrl(selectedUrl.url, true);
    
    if (result) {
      console.log('Mudança simulada com sucesso!');
      result.changes.forEach(change => {
        console.log(`- ${change.type}: ${change.content}`);
      });
    } else {
      console.log('Nenhuma mudança detectada.');
    }
  }

  async editConfig() {
    console.log('Editando configuração...');
    
    const config = this.configManager.config;
    
    while (true) {
      console.clear();
      console.log('=== Menu de Configuração ===');
      console.log('1. Adicionar URL para monitoramento');
      console.log('2. Remover URL do monitoramento');
      console.log('3. Editar webhook global');
      console.log('4. Editar elementos a serem removidos');
      console.log('5. Visualizar configuração atual');
      console.log('0. Voltar ao menu principal');
      
      const choice = await this.prompt('\nEscolha uma opção: ');
      
      switch (choice) {
        case '1':
          const url = await this.prompt('Digite a URL para monitorar: ');
          const webhook = await this.prompt('Digite o webhook específico (ou pressione Enter para usar o global): ');
          const removeElements = await this.prompt('Digite os seletores CSS para remover (separados por vírgula): ');
          
          this.configManager.addUrl({
            url,
            webhook: webhook || null,
            remove_elements: removeElements ? removeElements.split(',').map(s => s.trim()) : [],
            active: true
          });
          console.log('URL adicionada com sucesso!');
          break;
          
        case '2':
          const urls = this.configManager.getActiveUrls();
          if (urls.length === 0) {
            console.log('Nenhuma URL configurada.');
            break;
          }
          
          console.log('\nURLs disponíveis:');
          urls.forEach((url, index) => {
            console.log(`${index + 1}. ${url.url}`);
          });
          
          const urlIndex = await this.prompt('\nDigite o número da URL para remover: ');
          const selectedUrl = urls[parseInt(urlIndex) - 1];
          
          if (selectedUrl) {
            this.configManager.removeUrl(selectedUrl.url);
            console.log('URL removida com sucesso!');
          }
          break;
          
        case '3':
          const newWebhook = await this.prompt('Digite a nova URL do webhook global (ou pressione Enter para remover): ');
          config.webhook_global = newWebhook || null;
          this.configManager.saveConfig(config);
          console.log('Webhook global atualizado com sucesso!');
          break;
          
        case '4':
          console.log('Elementos atuais a serem removidos:', config.remove_elements_global.join(', '));
          const newElements = await this.prompt('Digite os novos seletores CSS (separados por vírgula): ');
          config.remove_elements_global = newElements ? newElements.split(',').map(s => s.trim()) : [];
          this.configManager.saveConfig(config);
          console.log('Elementos a serem removidos atualizados com sucesso!');
          break;
          
        case '5':
          console.log('\nConfiguração atual:');
          console.log(JSON.stringify(config, null, 2));
          break;
          
        case '0':
          return;
          
        default:
          console.log('Opção inválida.');
      }
      
      await this.pause();
    }
  }

  async viewStoredContent() {
    console.log('Visualizando conteúdo armazenado...');
    
    const urls = this.configManager.getActiveUrls();
    if (urls.length === 0) {
      console.log('Nenhuma URL configurada para monitoramento.');
      return;
    }
    
    console.log('\nURLs disponíveis:');
    urls.forEach((url, index) => {
      console.log(`${index + 1}. ${url.url}`);
    });
    
    const choice = await this.prompt('\nEscolha o número da URL para visualizar conteúdo: ');
    const selectedIndex = parseInt(choice) - 1;
    
    if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= urls.length) {
      console.log('Seleção inválida.');
      return;
    }
    
    const selectedUrl = urls[selectedIndex];
    
    try {
      const content = await this.storageAdapter.get(selectedUrl.url);
      if (content) {
        console.log('\nConteúdo armazenado:');
        console.log('===================');
        console.log(content);
      } else {
        console.log('Nenhum conteúdo armazenado para esta URL.');
      }
    } catch (error) {
      console.error('Erro ao recuperar conteúdo:', error.message);
    }
  }

  async cleanRemovedUrls() {
    console.log('Limpando dados de URLs removidas...');
    
    // Obtém todas as URLs ativas
    const activeUrls = this.configManager.getActiveUrls().map(url => url.url);
    
    try {
      // Lista todas as chaves no storage
      const allKeys = await this.storageAdapter.getAllKeys();
      
      // Filtra as chaves que não estão mais ativas
      const removedUrls = allKeys.filter(key => !activeUrls.includes(key));
      
      if (removedUrls.length === 0) {
        console.log('Nenhuma URL removida encontrada para limpar.');
        return;
      }
      
      console.log(`\nEncontradas ${removedUrls.length} URLs removidas:`);
      removedUrls.forEach((url, index) => {
        console.log(`${index + 1}. ${url}`);
      });
      
      const confirm = await this.prompt('\nDeseja limpar os dados dessas URLs? (s/n): ');
      
      if (confirm.toLowerCase() === 's') {
        let cleaned = 0;
        for (const url of removedUrls) {
          await this.storageAdapter.delete(url);
          cleaned++;
        }
        console.log(`\nLimpeza concluída! ${cleaned} URLs removidas.`);
      } else {
        console.log('Operação cancelada.');
      }
    } catch (error) {
      console.error('Erro ao limpar dados:', error.message);
    }
  }
}

const cliMenu = new CLIMenu();
cliMenu.run();

module.exports = CLIMenu;