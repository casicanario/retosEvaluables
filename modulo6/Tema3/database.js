const { MongoClient } = require('mongodb');
require('dotenv').config();

class DatabaseConnection {
    constructor() {
        this.client = null;
        this.db = null;
        this.uri = process.env.MONGODB_URI;
        this.dbName = process.env.DATABASE_NAME;
    }

    async connect() {
        try {
            console.log('Conectando a MongoDB...');
            this.client = new MongoClient(this.uri);
            await this.client.connect();
            this.db = this.client.db(this.dbName);
            console.log('Conectado exitosamente a MongoDB');
            return this.db;
        } catch (error) {
            console.error('Error conectando a MongoDB:', error);
            throw error;
        }
    }

    async disconnect() {
        try {
            if (this.client) {
                await this.client.close();
                console.log('Desconectado de MongoDB');
            }
        } catch (error) {
            console.error('Error desconectando de MongoDB:', error);
            throw error;
        }
    }

    getDatabase() {
        if (!this.db) {
            throw new Error('No hay conexión a la base de datos. Llama a connect() primero.');
        }
        return this.db;
    }

    getCollection(collectionName) {
        return this.getDatabase().collection(collectionName);
    }
}

module.exports = DatabaseConnection;