
const FileStorage = require('../storage/file-storage');
const SqliteStorage = require('../storage/sqlite-storage');
const PostgresStorage = require('../storage/postgres-storage');


class StorageAdapter {
  constructor(type = 'file', options = {}) {
    this.type = type;
    this.options = options;
    this.storage = this.createStorage();
  }

  createStorage() {
    switch (this.type) {
      case 'file':
        return new FileStorage(this.options.path || './data');
      case 'sqlite_local':
        return new SqliteStorage(this.options.path || './database.sqlite');
      case 'sqlite_external':
        return new SqliteStorage(this.options.externalPath);
      case 'postgres':
        return new PostgresStorage(this.options);
      default:
        return new FileStorage('./data');
    }
  }

  async get(key) {
    return this.storage.get(key);
  }

  async set(key, value) {
    return this.storage.set(key, value);
  }

  async delete(key) {
    return this.storage.delete(key);
  }

  async getAllKeys() {
    return this.storage.getAllKeys();
  }
}

module.exports = StorageAdapter;