const fs = require('fs');
const path = require('path');

class FileStorage {
  constructor(basePath) {
    this.basePath = basePath;
    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath, { recursive: true });
    }
  }

  getFilePath(key) {
    return path.join(this.basePath, `${key.replace("https://","").replace("http://","").replaceAll("/","-")}.json`);
  }

  get(key) {
    const filePath = this.getFilePath(key);
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  }

  set(key, value) {
    const filePath = this.getFilePath(key);
    fs.writeFileSync(filePath, JSON.stringify(value, null, 2));
  }

  delete(key) {
    const filePath = this.getFilePath(key);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  async getAllKeys() {
    try {
      // Lê todos os arquivos no diretório base
      const files = fs.readdirSync(this.basePath);
      
      // Filtra apenas arquivos .json e converte os nomes de volta para URLs
      return files
        .filter(file => file.endsWith('.json'))
        .map(file => {
          // Remove a extensão .json e restaura o protocolo http/https
          const key = file.replace('.json', '');
          // Verifica se a URL começa com www. para adicionar o protocolo apropriado
          return key.startsWith('www.') ? `https://${key}` : key;
        });
    } catch (error) {
      console.error('Erro ao listar chaves:', error);
      return [];
    }
  }
}


module.exports = FileStorage;