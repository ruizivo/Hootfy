const AWS = require('aws-sdk');
const { promisify } = require('util');

class S3Storage {
  constructor(options) {
    this.options = options;
    this.folder = options.folder.endsWith('/') ? options.folder : options.folder + '/';

    this.s3 = new AWS.S3({
      accessKeyId: options.access_key_id,
      secretAccessKey: options.secret_access_key,
      region: options.region || 'us-east-1'
    });

    // Promisify os métodos do S3 que vamos usar
    this.putObject = promisify(this.s3.putObject.bind(this.s3));
    this.getObject = promisify(this.s3.getObject.bind(this.s3));
    this.deleteObject = promisify(this.s3.deleteObject.bind(this.s3));
    this.listObjects = promisify(this.s3.listObjects.bind(this.s3));
  }

  async get(key) {
    try {
      const result = await this.getObject({
        Bucket: this.options.bucket_name,
        Key: this.folder + key
      });
      return result.Body.toString('utf-8');
    } catch (error) {
      if (error.code === 'NoSuchKey') {
        return null;
      }
      console.error('Erro ao ler do S3:', error);
      throw error;
    }
  }

  async set(key, value) {
    try {
      await this.putObject({
        Bucket: this.options.bucket_name,
        Key: this.folder + key,
        Body: value,
        ContentType: 'text/plain'
      });
      return true;
    } catch (error) {
      console.error('Erro ao salvar no S3:', error);
      throw error;
    }
  }

  async delete(key) {
    try {
      await this.deleteObject({
        Bucket: this.options.bucket_name,
        Key: this.folder + key
      });
      return true;
    } catch (error) {
      console.error('Erro ao deletar do S3:', error);
      throw error;
    }
  }

  async getAllKeys() {
    try {
      const result = await this.listObjects({
        Bucket: this.options.bucket_name
      });
      return result.Contents.map(item => item.Key);
    } catch (error) {
      console.error('Erro ao listar objetos do S3:', error);
      throw error;
    }
  }
}

module.exports = S3Storage; 