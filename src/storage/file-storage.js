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

  async getAllKeys(dir) {
    const result = [];
  
    async function readDirRecursive(currentPath, folderName) {
      const entries =  fs.readdirSync(currentPath, { withFileTypes: true });
  
      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name);
  
        if (entry.isDirectory()) {
          await readDirRecursive(fullPath, entry.name);
        } else if (entry.isFile()) {
          const match = entry.name.match(/^(\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}-\d{3})Z\.html$/);
  
          if (match) {
            const originalTimestamp = match[1]; // exemplo: 2025-05-07T14-34-58-718
            const isoTimestamp = originalTimestamp.replace(/T(\d{2})-(\d{2})-(\d{2})-(\d{3})/, 'T$1:$2:$3.$4'); // -> 2025-05-07T14:34:58.718
  
            const formattedDate = new Date(isoTimestamp + 'Z'); // adiciona o Z para indicar UTC
  
            result.push({
              url: folderName,
              file: entry.name,
              timestamp: formattedDate,
              path: fullPath,
            });
          }
        }
      }
    }
    const myPath = this.basePath + '/' + dir;
    await readDirRecursive(myPath, path.basename(myPath));
    return result;
  }

}

module.exports = FileStorage;