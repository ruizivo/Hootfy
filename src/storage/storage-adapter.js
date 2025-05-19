const FileStorage = require('./file-storage');
// const SqliteStorage = require('./sqlite-storage');
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
        return new FileStorage('./data');
      case 's3':
        return new S3Storage(storageConfig);
      default:
        return new FileStorage('./data');
    }
  }

  async get(key) {
    return this.storage.get(key);
  }

  async set(key, value, contentType = 'text/plain') {
    return this.storage.set(key, value, contentType);
  }

  async delete(key) {
    return this.storage.delete(key);
  }

  async getAllKeys(path) {
    return this.storage.getAllKeys(path);
  }
}

module.exports = StorageAdapter;