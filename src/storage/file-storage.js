const fs = require('fs');
const path = require('path');

class FileStorage {
  constructor(basePath) {
    this.basePath = basePath;
    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath, { recursive: true });
      fs.mkdirSync(path.join(basePath, 'content'), { recursive: true });
      fs.mkdirSync(path.join(basePath, 'reports'), { recursive: true });
      fs.mkdirSync(path.join(basePath, 'screenshots'), { recursive: true });
    }
  }

  getFilePath(key) {
    return key
  }

  get(key) {
    const filePath = this.getFilePath(key);
    try {
      // Verificar se o arquivo existe
      if (!fs.existsSync(filePath)) {
        return null;
      }

      // Ler o conteúdo do arquivo
      const data = fs.readFileSync(filePath, 'utf8');
      
      // Verificar se o arquivo é JSON (baseado na extensão)
      if (key.endsWith('.json')) {
        return JSON.parse(data);
      }
      
      // Para outros tipos de arquivo, retornar como string
      return data;
    } catch (error) {
      console.error(`Erro ao ler arquivo ${filePath}:`, error);
      return null;
    }
  }

  set(key, value, contentType = 'application/json') {
    const filePath = this.getFilePath(key);
    
    try {
      // Garantir que o diretório existe
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // Salvar o conteúdo com base no tipo de conteúdo
      if (contentType === 'application/json' || key.endsWith('.json')) {
        fs.writeFileSync(filePath, JSON.stringify(value, null, 2));
      } else {
        // Para HTML e outros tipos de texto, salvar diretamente
        fs.writeFileSync(filePath, value);
      }
      
      return true;
    } catch (error) {
      console.error(`Erro ao salvar arquivo ${filePath}:`, error);
      throw error;
    }
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