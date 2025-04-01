const FileStorage = require('./file-storage');
const SqliteStorage = require('./sqlite-storage');
const PostgresStorage = require('./postgres-storage');
const S3Storage = require('./s3-storage');

class StorageAdapter {
  constructor(config) {
    this.config = config;
    this.storage = this.createStorage();
  }

  createStorage() {
    const storageType = this.config.storage_type || 'file';
    const storageConfig = this.config.storage_config[storageType];

    switch (storageType) {
      case 'file':
        return new FileStorage(storageConfig.path || './data');
      case 'sqlite_local':
        return new SqliteStorage(storageConfig.path || './database.sqlite');
      case 'sqlite_external':
        return new SqliteStorage(storageConfig.externalPath);
      case 'postgres':
        return new PostgresStorage(storageConfig);
      case 's3':
        return new S3Storage(storageConfig);
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