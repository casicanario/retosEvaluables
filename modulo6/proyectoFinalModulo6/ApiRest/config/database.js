const mongoose = require('mongoose');

class Database {
  constructor() {
    this.connectionString = process.env.MONGODB_URI || 'mongodb+srv://casicanario:casicanario@cluster0.dcgskbx.mongodb.net/profesionales_db';
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
      console.log('API conectada exitosamente a MongoDB');
      console.log('Base de datos: profesionales_db');
      return true;
    } catch (error) {
      console.error('Error conectando a MongoDB desde API:', error.message);
      this.isConnected = false;
      return false;
    }
  }

  // Desconectar de MongoDB
  async disconnect() {
    try {
      await mongoose.disconnect();
      this.isConnected = false;
      console.log('API desconectada de MongoDB');
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
}

module.exports = Database;