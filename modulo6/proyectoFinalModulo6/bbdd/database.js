const mongoose = require('mongoose');

class Database {
  constructor() {
    this.connectionString = 'mongodb+srv://casicanario:casicanario@cluster0.dcgskbx.mongodb.net/profesionales_db';
    this.isConnected = false;
  }

  // Conectar a MongoDB
  async connect() {
    try {
      await mongoose.connect(this.connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      this.isConnected = true;
      console.log('Conectado exitosamente a MongoDB');
      console.log('Base de datos: profesionales_db');
      return true;
    } catch (error) {
      console.error('Error conectando a MongoDB:', error.message);
      this.isConnected = false;
      return false;
    }
  }

  // Desconectar de MongoDB
  async disconnect() {
    try {
      await mongoose.disconnect();
      this.isConnected = false;
      console.log('Desconectado de MongoDB');
    } catch (error) {
      console.error('Error desconectando de MongoDB:', error.message);
    }
  }

  // Verificar estado de conexión
  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host,
      name: mongoose.connection.name
    };
  }

  // Limpiar la base de datos (útil para testing)
  async clearDatabase() {
    try {
      const collections = await mongoose.connection.db.listCollections().toArray();
      for (let collection of collections) {
        await mongoose.connection.db.collection(collection.name).deleteMany({});
      }
      console.log('Base de datos limpiada');
    } catch (error) {
      console.error('Error limpiando la base de datos:', error.message);
    }
  }
}

module.exports = Database;