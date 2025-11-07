const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const Database = require('./config/database');
const profesionalRoutes = require('./routes/profesionalRoutes');
const { errorHandler, notFound } = require('./middleware/errorHandler');

class ApiServer {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.db = new Database();
    
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  // Configurar middleware
  setupMiddleware() {
    // Seguridad
    this.app.use(helmet());
    
    // CORS
    this.app.use(cors({
      origin: process.env.CORS_ORIGIN || '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }));
    
    // Logging
    this.app.use(morgan('combined'));
    
    // Parseo de JSON
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true }));
  }

  // Configurar rutas
  setupRoutes() {
    // Ruta de salud
    this.app.get('/health', (req, res) => {
      const dbStatus = this.db.getConnectionStatus();
      res.status(200).json({
        success: true,
        message: 'API funcionando correctamente',
        timestamp: new Date().toISOString(),
        database: dbStatus,
        endpoints: {
          'GET /profesionales': 'Obtener todos los profesionales',
          'GET /profesionales?firstName=X&lastName=Y': 'Buscar por nombre y apellido',
          'GET /profesionales/:firstName/:lastName': 'Obtener profesional específico',
          'POST /profesionales': 'Crear nuevo profesional',
          'PUT /profesionales': 'Actualizar profesional',
          'DELETE /profesionales': 'Eliminar profesional'
        }
      });
    });

    // Ruta raíz
    this.app.get('/', (req, res) => {
      res.status(200).json({
        success: true,
        message: 'API REST de Profesionales - Proyecto Final Módulo 6',
        version: '1.0.0',
        documentation: {
          health: 'GET /health - Estado de la API',
          profesionales: 'GET /profesionales - Gestión de profesionales'
        }
      });
    });

    // Rutas de profesionales
    this.app.use('/profesionales', profesionalRoutes);
  }

  // Configurar manejo de errores
  setupErrorHandling() {
    // Middleware para rutas no encontradas
    this.app.use(notFound);
    
    // Middleware de manejo de errores
    this.app.use(errorHandler);
  }

  // Iniciar servidor
  async start() {
    try {
      // Conectar a la base de datos
      console.log('Conectando a la base de datos...');
      const connected = await this.db.connect();
      
      if (!connected) {
        console.log('No se pudo conectar a la base de datos. Cerrando servidor...');
        process.exit(1);
      }

      // Iniciar servidor
      this.server = this.app.listen(this.port, () => {
        console.log('================================');
        console.log(`Servidor API iniciado en puerto ${this.port}`);
        console.log(`URL: http://localhost:${this.port}`);
        console.log(`Health: http://localhost:${this.port}/health`);
        console.log(`Profesionales: http://localhost:${this.port}/profesionales`);
        console.log('================================');
      });

      // Manejo de señales para cierre graceful
      process.on('SIGTERM', () => this.gracefulShutdown());
      process.on('SIGINT', () => this.gracefulShutdown());

    } catch (error) {
      console.error('Error iniciando el servidor:', error.message);
      process.exit(1);
    }
  }

  // Cierre graceful del servidor
  async gracefulShutdown() {
    console.log('\nCerrando servidor...');
    
    if (this.server) {
      this.server.close(() => {
        console.log('Servidor HTTP cerrado');
      });
    }
    
    await this.db.disconnect();
    console.log('Servidor cerrado correctamente');
    process.exit(0);
  }
}

// Crear y iniciar el servidor
const server = new ApiServer();

// Iniciar solo si se ejecuta directamente
if (require.main === module) {
  server.start();
}

module.exports = server;