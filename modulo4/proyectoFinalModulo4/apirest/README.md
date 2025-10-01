# 📧 Email API REST - Proyecto Final Módulo 4

## 🎯 Descripción del Proyecto
API REST completa para **envío de emails** usando **PostMark** como servicio de email transaccional. Este proyecto implementa todos los endpoints requeridos con funcionalidades adicionales de seguridad, validación y almacenamiento.

## 🚀 Características Principales

### ✅ **Endpoints Requeridos**
- **`GET /api/mail?from=direccion_correo`** - Obtener emails enviados desde una dirección
- **`GET /api/mail?to=direccion_correo`** - Obtener emails enviados hacia una dirección  
- **`POST /api/mail`** - Enviar un nuevo email

### ✅ **Funcionalidades Adicionales**
- **`GET /`** - Información completa de la API
- **`GET /api/status`** - Estado del servicio y estadísticas
- **🔐 Autenticación** con API Key
- **🛡️ Rate Limiting** (100 requests/15min)
- **⚡ Validación** completa de datos
- **📊 Logging** detallado de operaciones
- **🎨 Emails HTML** con formato profesional

## 📁 Estructura del Proyecto

```
apirest/
├── server.js                 # Servidor principal Express
├── package.json              # Dependencias y scripts
├── .env.example              # Variables de entorno
├── services/
│   └── EmailService.js       # Integración con PostMark
├── storage/
│   └── EmailStorage.js       # Almacenamiento de emails
└── README.md                # Esta documentación
```

## 🛠️ Tecnologías Utilizadas

### **Backend**
- **Node.js** v16+ - Runtime JavaScript
- **Express.js** - Framework web
- **PostMark** - Servicio de email transaccional

### **Dependencias Principales**
- `express` - Framework web
- `postmark` - Cliente oficial PostMark
- `cors` - Cross-Origin Resource Sharing
- `helmet` - Headers de seguridad
- `express-rate-limit` - Limitación de peticiones
- `validator` - Validación de emails
- `uuid` - Generación de IDs únicos
- `dotenv` - Variables de entorno

## 🔧 Instalación y Configuración

### **1. Instalar Dependencias**
```bash
cd apirest
npm install
```

### **2. Configurar Variables de Entorno**
```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar .env con tus credenciales
nano .env
```

### **3. Variables de Entorno Requeridas**
```env
# PostMark Configuration
POSTMARK_API_TOKEN=tu_postmark_api_token_aqui
POSTMARK_FROM_EMAIL=noreply@tudominio.com

# Server Configuration  
PORT=3000
NODE_ENV=development

# Security
API_KEY=tu_api_key_secreta_aqui

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### **4. Obtener Credenciales de PostMark**
1. Registrarse en [PostMark](https://postmarkapp.com/)
2. Crear un nuevo servidor
3. Obtener el **Server API Token**
4. Configurar un dominio verificado para el email remitente

## 🚀 Ejecución

### **Desarrollo**
```bash
npm run dev    # Con nodemon (recarga automática)
```

### **Producción**
```bash
npm start      # Servidor estándar
```

## 📡 Documentación de la API

### **🏠 GET /** 
Información general de la API
```json
{
  "name": "📧 Email API REST",
  "version": "1.0.0",
  "endpoints": { ... },
  "usage": { ... }
}
```

### **📊 GET /api/status**
Estado del servicio
```json
{
  "status": "online",
  "uptime": "15 minutos",
  "emailsSent": 3,
  "postmarkStatus": "configured"
}
```

### **🔍 GET /api/mail?from=email**
Obtener emails desde una dirección
```bash
curl -H "X-API-Key: tu_api_key" \
     "http://localhost:3000/api/mail?from=sender@example.com"
```

**Respuesta:**
```json
{
  "success": true,
  "query": { "from": "sender@example.com" },
  "count": 2,
  "emails": [
    {
      "id": "uuid-123",
      "from": "sender@example.com",
      "to": "recipient@example.com",
      "subject": "Asunto del email",
      "message": "Contenido del mensaje",
      "timestamp": "2025-01-01T10:00:00Z",
      "status": "sent",
      "postmarkId": "abc123"
    }
  ]
}
```

### **🔍 GET /api/mail?to=email**
Obtener emails hacia una dirección
```bash
curl -H "X-API-Key: tu_api_key" \
     "http://localhost:3000/api/mail?to=recipient@example.com"
```

### **📨 POST /api/mail**
Enviar un nuevo email
```bash
curl -X POST \
     -H "Content-Type: application/json" \
     -H "X-API-Key: tu_api_key" \
     -d '{
       "from": "sender@example.com",
       "to": "recipient@example.com", 
       "subject": "Asunto del email",
       "message": "Contenido del mensaje"
     }' \
     http://localhost:3000/api/mail
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Email enviado exitosamente",
  "data": {
    "id": "uuid-456",
    "from": "sender@example.com",
    "to": "recipient@example.com",
    "subject": "Asunto del email",
    "timestamp": "2025-01-01T12:00:00Z",
    "postmarkId": "def456"
  }
}
```

## 🔐 Autenticación

Todas las rutas `/api/*` requieren autenticación mediante API Key:

### **Método 1: Header X-API-Key**
```bash
curl -H "X-API-Key: tu_api_key_aqui" ...
```

### **Método 2: Authorization Bearer**
```bash
curl -H "Authorization: Bearer tu_api_key_aqui" ...
```

## 🛡️ Seguridad Implementada

### **🔒 Headers de Seguridad**
- **Helmet.js** para headers seguros
- **Content Security Policy**
- **CORS** configurado apropiadamente

### **⏱️ Rate Limiting**
- **100 requests por 15 minutos** por IP
- Headers de rate limit en respuestas
- Mensaje informativo al exceder límite

### **✅ Validación de Datos**
- **Emails válidos** (usando validator.js)
- **Campos requeridos** verificados
- **Límites de longitud** (subject: 200 chars, message: 10,000 chars)
- **Sanitización** de entrada

## 📊 Estructura de Almacenamiento

### **Array de Emails (Variable del Servidor)**
```javascript
emails = [
  {
    id: "uuid-string",           // ID único del email
    from: "string",              // Email remitente
    to: "string",                // Email destinatario  
    subject: "string",           // Asunto
    message: "string",           // Contenido
    timestamp: "ISO-string",     // Fecha/hora de envío
    status: "sent|failed|pending", // Estado del envío
    postmarkId: "string",        // ID de PostMark (opcional)
    error: "string"              // Error si falló (opcional)
  }
]
```

### **Datos de Ejemplo Precargados**
La API incluye 3 emails de ejemplo para pruebas inmediatas:
- Bienvenida al sistema
- Confirmación de registro  
- Mensaje de contacto

## 🔧 Integración con PostMark

### **Características**
- **Cliente oficial** PostMark para Node.js
- **Emails HTML y texto** automáticos
- **Templates responsivos** incluidos
- **Manejo robusto de errores** PostMark
- **Tracking de MessageID** para seguimiento

### **Formato de Email Generado**
- **Texto plano**: Mensaje original
- **HTML**: Template profesional con estilos CSS
- **Headers personalizados**: Para identificación
- **Footer branding**: Email API REST + PostMark

## ⚠️ Manejo de Errores

### **Errores de Validación (400)**
```json
{
  "error": "Datos de entrada inválidos",
  "message": "Por favor, corrige los siguientes errores:",
  "errors": [
    "El campo 'from' debe ser un email válido",
    "El campo 'subject' es requerido y no puede estar vacío"
  ]
}
```

### **Errores de Autenticación (401/403)**
```json
{
  "error": "API Key requerida",
  "message": "Incluye X-API-Key en los headers"
}
```

### **Errores de PostMark**
- **Configuración incorrecta**: Guía de configuración
- **Límites excedidos**: Información de límites PostMark
- **Emails inválidos**: Validación mejorada

## 📈 Monitoreo y Logging

### **Logs Detallados**
- ✅ Todas las peticiones HTTP
- ✅ Envíos de email exitosos/fallidos
- ✅ Errores con stack traces
- ✅ Estadísticas de uso

### **Formato de Logs**
```
📡 [2025-01-01T12:00:00Z] POST /api/mail - IP: 127.0.0.1
📧 Enviando email: sender@example.com → recipient@example.com
✅ Email enviado exitosamente: postmark-id-123
```

## 🧪 Testing

### **Endpoints de Prueba**
```bash
# 1. Verificar estado
curl http://localhost:3000/api/status

# 2. Obtener información
curl http://localhost:3000/

# 3. Probar autenticación
curl -H "X-API-Key: wrong-key" http://localhost:3000/api/mail?from=test@example.com

# 4. Enviar email de prueba
curl -X POST \
     -H "Content-Type: application/json" \
     -H "X-API-Key: tu_api_key" \
     -d '{"from":"test@example.com","to":"recipient@example.com","subject":"Test","message":"Mensaje de prueba"}' \
     http://localhost:3000/api/mail
```

### **Datos de Ejemplo Incluidos**
La API incluye emails de ejemplo que puedes consultar:
- `admin@codenotch.com`
- `noreply@codenotch.com`  
- `info@codenotch.com`

## 🚀 Deployment

### **Variables de Producción**
```env
NODE_ENV=production
PORT=3000
POSTMARK_API_TOKEN=tu_token_real_de_produccion
POSTMARK_FROM_EMAIL=noreply@tudominio-verificado.com
API_KEY=api_key_super_segura_de_produccion
```

### **Consideraciones de Producción**
- ✅ **HTTPS obligatorio**
- ✅ **API Keys seguras** (generadas aleatoriamente)
- ✅ **Rate limiting ajustado** según necesidades
- ✅ **Logs estructurados** para monitoreo
- ✅ **Dominio PostMark verificado**

## 📋 Checklist de Implementación

### ✅ **Endpoints Requeridos**
- [x] `GET /api/mail?from=direccion_correo`
- [x] `GET /api/mail?to=direccion_correo`  
- [x] `POST /api/mail` con body JSON

### ✅ **Integración PostMark**
- [x] Cliente oficial PostMark
- [x] Configuración via variables de entorno
- [x] Manejo de errores PostMark
- [x] Templates HTML profesionales

### ✅ **Almacenamiento**
- [x] Array de objetos en servidor
- [x] Estructura especificada (from, to, subject, message)
- [x] Filtrado por dirección from/to
- [x] Datos de ejemplo precargados

### ✅ **Funcionalidades Extra**
- [x] Autenticación con API Key
- [x] Rate limiting de seguridad
- [x] Validación completa de datos
- [x] Logging detallado
- [x] Documentación completa
- [x] Manejo robusto de errores
- [x] Configuración de producción

## 🎯 Resultado Final

**✅ Proyecto Final COMPLETADO** con implementación completa que incluye:

1. **📡 API REST funcional** con todos los endpoints requeridos
2. **📧 Integración PostMark** para envío real de emails
3. **📚 Sistema de almacenamiento** con estructura especificada
4. **🔐 Seguridad robusta** con autenticación y rate limiting
5. **📊 Monitoreo completo** con logs y estadísticas
6. **🎨 Emails profesionales** con templates HTML
7. **📋 Documentación detallada** para uso y deployment

**¡La API está lista para uso en producción!** 🚀