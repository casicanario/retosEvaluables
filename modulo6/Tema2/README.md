# Sistema CRUD de Fotos con MongoDB

Este proyecto implementa un sistema completo de gestión de fotos utilizando MongoDB como base de datos NoSQL.

## 📋 Características

- **Subida de fotos**: Guardar información de fotos con usuario, URL, título y descripción
- **Obtener fotos**: Recuperar todas las fotos de un usuario específico
- **Modificar fotos**: Actualizar la descripción de una foto usando su título
- **Eliminar foto**: Eliminar una foto específica de un usuario
- **Eliminar todas**: Eliminar todas las fotos de un usuario
- **Estadísticas**: Obtener información general de la colección

## 🛠️ Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución
- **MongoDB**: Base de datos NoSQL
- **MongoDB Driver**: Driver oficial para Node.js

## 📁 Estructura del Proyecto

```
Tema2/
├── models/
│   └── PhotoModel.js      # Modelo y validación de datos
├── database.js            # Conexión a MongoDB
├── PhotoService.js        # Servicios CRUD principales
├── index.js              # Archivo principal
├── test.js               # Pruebas y demostraciones
├── package.json          # Configuración del proyecto
├── .env                  # Variables de entorno
└── README.md             # Documentación
```

## 🚀 Instalación y Configuración

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Configurar MongoDB**:
   - Asegúrate de tener MongoDB instalado y ejecutándose
   - La configuración por defecto usa `mongodb://localhost:27017/photos_db`
   - Puedes modificar la URL en el archivo `.env`

3. **Ejecutar las pruebas**:
   ```bash
   npm run test
   ```

4. **Ejecutar la aplicación**:
   ```bash
   npm start
   ```

## 📚 Uso de las Funciones CRUD

### 1. Subir Foto
```javascript
const result = await photoService.subirFoto(
    'Juan Pérez',
    'https://ejemplo.com/foto.jpg',
    'Mi foto favorita',
    'Una descripción detallada de la foto'
);
```

### 2. Obtener Fotos de un Usuario
```javascript
const fotos = await photoService.obtenerFotos('Juan Pérez');
```

### 3. Modificar Descripción de una Foto
```javascript
const result = await photoService.modificarFoto(
    'Mi foto favorita',
    'Nueva descripción actualizada'
);
```

### 4. Eliminar una Foto Específica
```javascript
const result = await photoService.eliminarFoto('Juan Pérez', 'Mi foto favorita');
```

### 5. Eliminar Todas las Fotos de un Usuario
```javascript
const result = await photoService.eliminarTodasLasFotos('Juan Pérez');
```

## 🗄️ Esquema de Datos

Cada foto se almacena con la siguiente estructura:

```javascript
{
    _id: ObjectId,
    usuario: String,           // Nombre del usuario
    url: String,              // URL de la foto
    titulo: String,           // Título de la foto
    descripcion: String,      // Descripción de la foto
    fechaCreacion: Date,      // Fecha de creación
    fechaModificacion: Date   // Fecha de última modificación
}
```

## ✅ Validaciones

- **Usuario**: Requerido, string no vacío
- **URL**: Requerida, formato de URL válido
- **Título**: Requerido, string no vacío
- **Descripción**: Requerida, string no vacío

## 🧪 Pruebas Incluidas

El archivo `test.js` incluye pruebas completas que demuestran:

1. ✅ Subida de múltiples fotos
2. ✅ Obtención de fotos por usuario
3. ✅ Modificación de descripciones
4. ✅ Eliminación de fotos específicas
5. ✅ Eliminación masiva de fotos
6. ✅ Validación de errores
7. ✅ Estadísticas de la colección

## 🌟 Características Avanzadas

- **Validación robusta**: Validación completa de datos de entrada
- **Manejo de errores**: Respuestas estructuradas con mensajes descriptivos
- **Timestamps**: Seguimiento automático de fechas de creación y modificación
- **Estadísticas**: Información útil sobre la colección y usuarios
- **Conexión reutilizable**: Gestión eficiente de la conexión a MongoDB

## 🔧 Variables de Entorno

```
MONGODB_URI=mongodb://localhost:27017/photos_db
DATABASE_NAME=photos_db
COLLECTION_NAME=photos
```

## 📝 Notas Importantes

- Asegúrate de tener MongoDB ejecutándose antes de usar la aplicación
- La base de datos y colección se crean automáticamente si no existen
- Todas las operaciones incluyen validación de entrada y manejo de errores
- Los resultados se devuelven en formato JSON consistente