# API REST - Profesionales

Esta carpeta contiene la implementación de la API REST para la gestión de profesionales del entretenimiento utilizando Express.js y MongoDB.

## Archivos y Estructura

```
ApiRest/
├── package.json              # Dependencias y scripts
├── server.js                 # Servidor principal Express
├── .env                      # Variables de entorno
├── test-api.js              # Pruebas de la API
├── config/
│   └── database.js          # Configuración de base de datos
├── models/
│   └── profesionalModel.js  # Modelo Mongoose
├── controllers/
│   └── profesionalController.js # Lógica de negocio
├── routes/
│   └── profesionalRoutes.js # Definición de rutas
└── middleware/
    └── errorHandler.js      # Manejo de errores
```

## Instalación

```bash
cd ApiRest
npm install
```

## Configuración

El archivo `.env` contiene las variables de entorno:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/profesionales_db
CORS_ORIGIN=*
NODE_ENV=development
```

## Uso

### Iniciar servidor
```bash
npm start
```

### Modo desarrollo (con auto-reload)
```bash
npm run dev
```

### Ejecutar pruebas
```bash
npm test
```

## Endpoints Implementados

### Estado de la API
- **GET** `/health` - Estado de la API y base de datos
- **GET** `/` - Información general de la API

### Gestión de Profesionales

#### Consultas
- **GET** `/profesionales` - Obtener todos los profesionales
- **GET** `/profesionales?firstName=Chris&lastName=Hemsworth` - Buscar por nombre
- **GET** `/profesionales/:firstName/:lastName` - Obtener profesional específico

#### Modificaciones
- **POST** `/profesionales` - Crear nuevo profesional
- **PUT** `/profesionales` - Actualizar profesional existente
- **DELETE** `/profesionales` - Eliminar profesional

## Ejemplos de Peticiones

### GET - Obtener todos
```bash
GET http://localhost:3000/profesionales
```

### GET - Buscar por query params
```bash
GET http://localhost:3000/profesionales?firstName=Chris&lastName=Hemsworth
```

### GET - Buscar por ruta
```bash
GET http://localhost:3000/profesionales/Chris/Hemsworth
```

### POST - Crear profesional
```bash
POST http://localhost:3000/profesionales
Content-Type: application/json

{
  "name": "Nuevo Actor",
  "age": 35,
  "weight": 75,
  "height": 180,
  "isRetired": false,
  "nationality": "Spanish",
  "oscarNumber": 0,
  "profession": "Actor"
}
```

### PUT - Actualizar profesional
```bash
PUT http://localhost:3000/profesionales
Content-Type: application/json

{
  "name": "Chris Hemsworth",
  "age": 41
}
```

### DELETE - Eliminar profesional
```bash
DELETE http://localhost:3000/profesionales
Content-Type: application/json

{
  "name": "Chris Hemsworth"
}
```

## Códigos de Respuesta

- **200** - Operación exitosa
- **201** - Recurso creado exitosamente
- **400** - Error de validación o datos incorrectos
- **404** - Recurso no encontrado
- **409** - Conflicto (profesional duplicado)
- **500** - Error interno del servidor

## Capturas de Pantalla Requeridas

Para completar el proyecto, necesitas hacer capturas de pantalla de:

1. **Terminal** mostrando:
   - Inicio del servidor (`npm start`)
   - Ejecución de pruebas (`npm test`)
   - Logs del servidor funcionando

2. **Herramienta de pruebas** (Postman, Thunder Client, etc.) mostrando:
   - Petición GET a `/profesionales`
   - Petición GET con query params
   - Petición GET con parámetros de ruta
   - Petición POST creando un profesional
   - Petición PUT actualizando un profesional
   - Petición DELETE eliminando un profesional
   - Respuestas JSON de cada endpoint

3. **Navegador** mostrando:
   - GET `/health` en navegador
   - GET `/profesionales` en navegador
   - Respuestas JSON formateadas

Guarda estas capturas en una carpeta llamada `Capturas` dentro de esta carpeta `ApiRest`.

## Herramientas Recomendadas para Pruebas

- **Postman** - Cliente HTTP completo
- **Thunder Client** - Extensión para VS Code
- **Insomnia** - Cliente REST alternativo
- **cURL** - Línea de comandos
- **Navegador web** - Para peticiones GET simples