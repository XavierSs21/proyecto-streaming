let common, os;

async function initializeOCI() {
  const ociCommon = await import('oci-common');
  const ociObjectStorage = await import('oci-objectstorage');
  return {
    common: ociCommon.default || ociCommon,
    os: ociObjectStorage.default || ociObjectStorage
  };
}

class OracleStorageService {
  constructor() {
    this.initialized = false;
    this.initPromise = this.initialize();
  }

  async initialize() {
    if(process.env.USE_ORACLE_STORAGE !== 'true'){
      console.log('Oracle Storage desactivado');
      this.initialize = false;
      return;
    }
    try {
      const modules = await initializeOCI();
      common = modules.common;
      os = modules.os;

      const provider = new common.ConfigFileAuthenticationDetailsProvider(
        process.env.OCI_CONFIG_PATH
      );
      
      this.client = new os.ObjectStorageClient({
        authenticationDetailsProvider: provider
      });
      
      this.namespace = process.env.OCI_NAMESPACE;
      this.bucketName = process.env.OCI_BUCKET_NAME;
      this.region = process.env.OCI_REGION;
      
      this.initialized = true;
      console.log('Oracle Storage Service initialized');
    } catch (error) {
      console.error(' Error initializing Oracle Storage Service:', error);
      throw error;
    }
  }

  async ensureInitialized() {
    if (!this.initialized) {
      await this.initPromise;
    }
  }

  async uploadFile(fileName, fileBuffer, contentType) {
    await this.ensureInitialized();
    
    try {
      console.log(`📤 Uploading file: ${fileName}`);
      
      const putObjectRequest = {
        namespaceName: this.namespace,
        bucketName: this.bucketName,
        objectName: fileName,
        putObjectBody: fileBuffer,
        contentType: contentType
      }; 

      await this.client.putObject(putObjectRequest);

      const fileUrl = `https://objectstorage.${this.region}.oraclecloud.com/n/${this.namespace}/b/${this.bucketName}/o/${encodeURIComponent(fileName)}`;
      
      console.log(`✅ File uploaded successfully: ${fileUrl}`);
      
      return {
        success: true,
        url: fileUrl,
        fileName: fileName
      };
    } catch (error) {
      console.error('❌ Error uploading to Oracle Storage:', error);
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  async deleteFile(fileName) {
    await this.ensureInitialized();
    
    try {
      console.log(`🗑️  Deleting file: ${fileName}`);
      
      const deleteObjectRequest = {
        namespaceName: this.namespace,
        bucketName: this.bucketName,
        objectName: fileName
      };

      await this.client.deleteObject(deleteObjectRequest);
      
      console.log(`✅ File deleted successfully: ${fileName}`);
      
      return {
        success: true,
        message: `File ${fileName} deleted successfully`
      };
    } catch (error) {
      console.error('❌ Error deleting from Oracle Storage:', error);
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }

  async listFiles(prefix = '') {
    await this.ensureInitialized();
    
    try {
      const listObjectsRequest = {
        namespaceName: this.namespace,
        bucketName: this.bucketName,
        prefix: prefix
      };

      const response = await this.client.listObjects(listObjectsRequest);
      
      return {
        success: true,
        files: response.listObjects.objects || []
      };
    } catch (error) {
      console.error('❌ Error listing files:', error);
      throw new Error(`Failed to list files: ${error.message}`);
    }
  }
}

export default new OracleStorageService();