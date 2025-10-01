/**
 * 📧 EMAIL API REST SERVER
 * ========================================
 * API REST para envío de emails usando PostMark
 * Proyecto Final - Módulo 4
 */

// =============================================
// 📦 DEPENDENCIAS
// =============================================
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const validator = require('validator');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// Importar módulos personalizados
const EmailService = require('./services/EmailService');
const EmailStorage = require('./storage/EmailStorage');

// =============================================
// 🔧 CONFIGURACIÓN DEL SERVIDOR
// =============================================
const app = express();
const PORT = process.env.PORT || 3000;

// Inicializar servicios
const emailService = new EmailService();
const emailStorage = new EmailStorage();

// =============================================
// 🛡️ MIDDLEWARES DE SEGURIDAD
// =============================================

// Helmet para headers de seguridad
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));

// CORS
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://yourdomain.com'] 
        : true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
    credentials: true
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutos
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // 100 requests por ventana
    message: {
        error: 'Demasiadas peticiones desde esta IP',
        message: 'Por favor, inténtalo de nuevo más tarde',
        retryAfter: '15 minutos'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/api/', limiter);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// =============================================
// 🔐 MIDDLEWARE DE AUTENTICACIÓN
// =============================================
const authenticateAPI = (req, res, next) => {
    const apiKey = req.headers['x-api-key'] || req.headers['authorization']?.replace('Bearer ', '');
    
    if (!apiKey) {
        return res.status(401).json({
            error: 'API Key requerida',
            message: 'Incluye X-API-Key en los headers o Authorization Bearer token'
        });
    }
    
    if (apiKey !== process.env.API_KEY) {
        return res.status(403).json({
            error: 'API Key inválida',
            message: 'La API Key proporcionada no es válida'
        });
    }
    
    next();
};

// =============================================
// 🛠️ MIDDLEWARE DE VALIDACIÓN
// =============================================
const validateEmailData = (req, res, next) => {
    const { from, to, subject, message } = req.body;
    const errors = [];
    
    // Validar campo 'from'
    if (!from || typeof from !== 'string' || !validator.isEmail(from)) {
        errors.push('El campo "from" debe ser un email válido');
    }
    
    // Validar campo 'to'
    if (!to || typeof to !== 'string' || !validator.isEmail(to)) {
        errors.push('El campo "to" debe ser un email válido');
    }
    
    // Validar campo 'subject'
    if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
        errors.push('El campo "subject" es requerido y no puede estar vacío');
    } else if (subject.length > 200) {
        errors.push('El campo "subject" no puede exceder 200 caracteres');
    }
    
    // Validar campo 'message'
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
        errors.push('El campo "message" es requerido y no puede estar vacío');
    } else if (message.length > 10000) {
        errors.push('El campo "message" no puede exceder 10,000 caracteres');
    }
    
    if (errors.length > 0) {
        return res.status(400).json({
            error: 'Datos de entrada inválidos',
            message: 'Por favor, corrige los siguientes errores:',
            errors: errors
        });
    }
    
    next();
};

// =============================================
// 📊 MIDDLEWARE DE LOGGING
// =============================================
const logRequest = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;
    const ip = req.ip || req.connection.remoteAddress;
    
    console.log(`📡 [${timestamp}] ${method} ${url} - IP: ${ip}`);
    next();
};

app.use(logRequest);

// =============================================
// 🌐 RUTAS DE LA API
// =============================================

/**
 * 🏠 GET / - Información de la API
 */
app.get('/', (req, res) => {
    res.json({
        name: '📧 Email API REST',
        version: '1.0.0',
        description: 'API REST para envío de emails usando PostMark',
        project: 'Proyecto Final - Módulo 4',
        endpoints: {
            'GET /': 'Información de la API',
            'GET /api/status': 'Estado del servicio',
            'GET /api/mail?from=email': 'Obtener emails enviados desde una dirección',
            'GET /api/mail?to=email': 'Obtener emails enviados a una dirección',
            'POST /api/mail': 'Enviar un nuevo email'
        },
        usage: {
            authentication: 'Incluye X-API-Key en los headers',
            rateLimit: '100 requests por 15 minutos',
            bodyFormat: {
                from: 'string (email)',
                to: 'string (email)',
                subject: 'string (máx 200 chars)',
                message: 'string (máx 10,000 chars)'
            }
        },
        documentation: 'Ver README.md para más detalles'
    });
});

/**
 * 📊 GET /api/status - Estado del servicio
 */
app.get('/api/status', (req, res) => {
    const uptime = process.uptime();
    const emailCount = emailStorage.getEmailCount();
    
    res.json({
        status: 'online',
        uptime: `${Math.floor(uptime / 60)} minutos`,
        timestamp: new Date().toISOString(),
        emailsSent: emailCount,
        postmarkStatus: emailService.isConfigured() ? 'configured' : 'not_configured',
        environment: process.env.NODE_ENV || 'development',
        version: '1.0.0'
    });
});

/**
 * 📧 GET /api/mail?from=direccion_correo - Obtener emails por remitente
 * 📧 GET /api/mail?to=direccion_correo - Obtener emails por destinatario
 */
app.get('/api/mail', authenticateAPI, (req, res) => {
    try {
        const { from, to } = req.query;
        
        if (!from && !to) {
            return res.status(400).json({
                error: 'Parámetro requerido',
                message: 'Debe incluir "from" o "to" en los query parameters',
                examples: [
                    '/api/mail?from=sender@example.com',
                    '/api/mail?to=recipient@example.com'
                ]
            });
        }
        
        let emails = [];
        
        if (from) {
            if (!validator.isEmail(from)) {
                return res.status(400).json({
                    error: 'Email inválido',
                    message: 'El parámetro "from" debe ser un email válido'
                });
            }
            emails = emailStorage.getEmailsFrom(from);
        }
        
        if (to) {
            if (!validator.isEmail(to)) {
                return res.status(400).json({
                    error: 'Email inválido',
                    message: 'El parámetro "to" debe ser un email válido'
                });
            }
            emails = emailStorage.getEmailsTo(to);
        }
        
        res.json({
            success: true,
            query: { from, to },
            count: emails.length,
            emails: emails
        });
        
    } catch (error) {
        console.error('❌ Error al obtener emails:', error);
        res.status(500).json({
            error: 'Error interno del servidor',
            message: 'No se pudieron obtener los emails'
        });
    }
});

/**
 * 📨 POST /api/mail - Enviar un nuevo email
 */
app.post('/api/mail', authenticateAPI, validateEmailData, async (req, res) => {
    try {
        const { from, to, subject, message } = req.body;
        const emailId = uuidv4();
        
        console.log(`📧 Enviando email: ${from} → ${to}`);
        console.log(`📋 Asunto: ${subject}`);
        
        // Crear objeto email
        const emailData = {
            id: emailId,
            from: from.toLowerCase().trim(),
            to: to.toLowerCase().trim(),
            subject: subject.trim(),
            message: message.trim(),
            timestamp: new Date().toISOString(),
            status: 'pending'
        };
        
        // Intentar enviar el email usando PostMark
        try {
            const result = await emailService.sendEmail(emailData);
            
            emailData.status = 'sent';
            emailData.postmarkId = result.MessageID;
            emailData.postmarkStatus = result.ErrorCode === 0 ? 'success' : 'error';
            
            console.log('✅ Email enviado exitosamente:', result.MessageID);
            
        } catch (emailError) {
            console.error('❌ Error al enviar email:', emailError.message);
            
            emailData.status = 'failed';
            emailData.error = emailError.message;
            
            // Almacenar de todas formas para llevar registro
        }
        
        // Almacenar el email en el storage
        emailStorage.addEmail(emailData);
        
        // Respuesta según el estado
        if (emailData.status === 'sent') {
            res.status(200).json({
                success: true,
                message: 'Email enviado exitosamente',
                data: {
                    id: emailData.id,
                    from: emailData.from,
                    to: emailData.to,
                    subject: emailData.subject,
                    timestamp: emailData.timestamp,
                    postmarkId: emailData.postmarkId
                }
            });
        } else {
            res.status(207).json({ // 207 Multi-Status
                success: false,
                message: 'Email almacenado pero no enviado',
                warning: 'Revisa la configuración de PostMark',
                data: {
                    id: emailData.id,
                    from: emailData.from,
                    to: emailData.to,
                    subject: emailData.subject,
                    timestamp: emailData.timestamp,
                    error: emailData.error
                }
            });
        }
        
    } catch (error) {
        console.error('💥 Error interno al procesar email:', error);
        res.status(500).json({
            error: 'Error interno del servidor',
            message: 'No se pudo procesar la solicitud de envío'
        });
    }
});

// =============================================
// ❌ MANEJO DE ERRORES
// =============================================

// Ruta no encontrada
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Endpoint no encontrado',
        message: `La ruta ${req.originalUrl} no existe`,
        availableEndpoints: [
            'GET /',
            'GET /api/status',
            'GET /api/mail?from=email',
            'GET /api/mail?to=email',
            'POST /api/mail'
        ]
    });
});

// Manejo de errores global
app.use((error, req, res, next) => {
    console.error('💥 Error no controlado:', error);
    
    res.status(500).json({
        error: 'Error interno del servidor',
        message: 'Ha ocurrido un error inesperado',
        timestamp: new Date().toISOString()
    });
});

// =============================================
// 🚀 INICIAR SERVIDOR
// =============================================
const server = app.listen(PORT, () => {
    console.log('\n📧 ========================================');
    console.log('   EMAIL API REST - SERVIDOR INICIADO');
    console.log('========================================');
    console.log(`🌐 Servidor corriendo en: http://localhost:${PORT}`);
    console.log(`🔧 Entorno: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📨 PostMark configurado: ${emailService.isConfigured() ? '✅' : '❌'}`);
    console.log(`📊 Rate limiting: ${process.env.RATE_LIMIT_MAX_REQUESTS || 100} requests/15min`);
    console.log('========================================\n');
    
    if (!emailService.isConfigured()) {
        console.log('⚠️  IMPORTANTE: Configura las variables de entorno para PostMark');
        console.log('   - Copia .env.example a .env');
        console.log('   - Agrega tu POSTMARK_API_TOKEN');
        console.log('   - Configura POSTMARK_FROM_EMAIL\n');
    }
});

// Manejo graceful de cierre
process.on('SIGTERM', () => {
    console.log('📧 Cerrando servidor...');
    server.close(() => {
        console.log('✅ Servidor cerrado correctamente');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('\n📧 Cerrando servidor...');
    server.close(() => {
        console.log('✅ Servidor cerrado correctamente');
        process.exit(0);
    });
});

module.exports = app;