const { S3 } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const { promisify } = require('util');
const { Readable } = require('stream');

class S3Storage {
  constructor(options) {
    this.options = options;
    this.folder = options.path.endsWith('/') ? options.path : options.path + '/';

    // Configuração do cliente S3
    const s3Config = {
      region: options.region || 'us-east-1'
    };

    // Se as credenciais forem fornecidas, use-as
    // Caso contrário, o SDK usará automaticamente as credenciais do ambiente
    if (options.access_key_id && options.secret_access_key) {
      s3Config.credentials = {
        accessKeyId: options.access_key_id,
        secretAccessKey: options.secret_access_key
      };
    }

    this.s3 = new S3(s3Config);

    // Promisify os métodos do S3 que vamos usar
    this.getObject = promisify(this.s3.getObject.bind(this.s3));
    this.deleteObject = promisify(this.s3.deleteObject.bind(this.s3));
    this.listObjects = promisify(this.s3.listObjects.bind(this.s3));
  }

  async streamToString(stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      stream.on('error', (err) => reject(err));
      stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    });
  }

  async get(key) {
    try {
      const result = await this.getObject({
        Bucket: this.options.bucket_name,
        Key: key
      });
      return await this.streamToString(result.Body);
    } catch (error) {
      if (error.Code === 'NoSuchKey') {
        return null;
      }
      console.error('Erro ao ler do S3:', error);
      throw error;
    }
  }

  async set(key, value, contentType = 'text/plain') {
    try {
      const upload = new Upload({
        client: this.s3,
        params: {
          Bucket: this.options.bucket_name,
          Key: key,
          Body: value,
          ContentType: `${contentType}; charset=utf-8`
        }
      });
      await upload.done();
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
        Key: key
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