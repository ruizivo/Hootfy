const fs = require('fs');
const path = require('path');

class Logger {
  constructor(logDir = './logs') {
    this.logDir = logDir;
    this.ensureLogDirectory();
  }

  ensureLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  getCurrentLogFile() {
    const date = new Date();
    const filename = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.log`;
    return path.join(this.logDir, filename);
  }

  log(level, message, metadata = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...metadata
    };

    const logString = JSON.stringify(logEntry) + '\n';
    fs.appendFileSync(this.getCurrentLogFile(), logString);

    // Log para console dependendo do nível
    switch(level) {
      case 'error':
        console.error(logEntry);
        break;
      case 'warn':
        console.warn(logEntry);
        break;
      default:
        console.log(logEntry);
    }
  }

  error(message, metadata = {}) {
    this.log('error', message, metadata);
  }

  warn(message, metadata = {}) {
    this.log('warn', message, metadata);
  }

  info(message, metadata = {}) {
    this.log('info', message, metadata);
  }

  debug(message, metadata = {}) {
    this.log('debug', message, metadata);
  }

  readLogs(options = {}) {
    const { 
      limit = 100, 
      startDate, 
      endDate, 
      level 
    } = options;

    const logFiles = fs.readdirSync(this.logDir)
      .filter(file => file.endsWith('.log'))
      .sort()
      .reverse();

    const logs = [];

    for (const file of logFiles) {
      const filePath = path.join(this.logDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      fileContent.split('\n').forEach(line => {
        try {
          if (line.trim()) {
            const logEntry = JSON.parse(line);
            
            // Filtros
            if (level && logEntry.level !== level) return;
            if (startDate && new Date(logEntry.timestamp) < new Date(startDate)) return;
            if (endDate && new Date(logEntry.timestamp) > new Date(endDate)) return;

            logs.push(logEntry);
          }
        } catch (error) {
          console.error('Erro ao processar entrada de log:', error);
        }
      });

      if (logs.length >= limit) break;
    }

    return logs.slice(0, limit);
  }
}

module.exports = Logger;