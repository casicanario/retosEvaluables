# Base de Datos MongoDB - Profesionales

Esta carpeta contiene la implementación directa de la base de datos MongoDB para la gestión de profesionales del entretenimiento.

## Archivos

- **package.json** - Dependencias y scripts del proyecto BBDD
- **database.js** - Clase para gestión de conexión a MongoDB
- **profesionalModel.js** - Modelo/esquema de la colección Profesional
- **profesionalService.js** - Servicios y operaciones CRUD
- **crearDatos.js** - Script para poblar la BBDD con datos de ejemplo
- **index.js** - Aplicación principal para probar la BBDD
- **test.js** - Suite de pruebas para validar operaciones

## Instalación

```bash
cd bbdd
npm install
```

## Uso

### Poblar la base de datos
```bash
node crearDatos.js
```

### Ejecutar aplicación principal
```bash
npm start
```

### Ejecutar pruebas
```bash
npm test
```

## Estructura de la Base de Datos

**Base de datos:** `profesionales_db`
**Colección:** `profesional`

### Esquema del Profesional
```javascript
{
  name: String,          // Nombre completo
  age: Number,           // Edad (18-120)
  weight: Number,        // Peso en kg (30-300)
  height: Number,        // Altura en cm (120-250)
  isRetired: Boolean,    // Estado de retiro
  nationality: String,   // Nacionalidad
  oscarNumber: Number,   // Número de Oscars (≥0)
  profession: String,    // Profesión
  createdAt: Date,       // Fecha de creación (automático)
  updatedAt: Date        // Fecha de actualización (automático)
}
```

## Capturas de Pantalla Requeridas

Para completar el proyecto, necesitas hacer capturas de pantalla de:

1. **MongoDB Compass** mostrando:
   - Conexión a la base de datos `profesionales_db`
   - Vista de la colección `profesional`
   - Documentos insertados en la colección
   - Operaciones de consulta

2. **Terminal** mostrando:
   - Ejecución de `node crearDatos.js`
   - Ejecución de `npm start`
   - Ejecución de `npm test`
   - Resultados de las operaciones CRUD

Guarda estas capturas en una carpeta llamada `Capturas` dentro de esta carpeta `bbdd`.