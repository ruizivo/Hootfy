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
    return path.join(this.basePath, `${key.replace("https://","").replace("http://","")}.json`);
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
}


module.exports = FileStorage;