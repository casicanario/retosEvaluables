# API REST - Alumnos y Asignaturas

## Descripción
API REST funcional para gestionar alumnos y sus asignaturas/notas utilizando MySQL como base de datos.

## Funcionalidades Implementadas

### 📚 Endpoints de Alumnos
- **GET /alumnos/:id** - Obtiene los datos del alumno por ID
- **GET /alumnos/:nombre** - Obtiene los datos del alumno por nombre  
- **GET /alumnos** - Obtiene toda la lista de alumnos
- **POST /alumnos** - Añade un nuevo alumno
- **PUT /alumnos/:id** - Modifica los datos de un alumno
- **DELETE /alumnos/:id** - Elimina un alumno

### 📊 Endpoints de Asignaturas y Notas
- **GET /media?id=5** - Obtiene la nota media del alumno por ID
- **GET /media?nombre=Juan** - Obtiene la nota media del alumno por nombre
- **GET /apuntadas?id=5** - Lista las asignaturas del alumno por ID
- **GET /apuntadas?nombre=Juan** - Lista las asignaturas del alumno por nombre

## 🗄️ Estructura de la Base de Datos

### Tabla: alumnos
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- nombre (VARCHAR(100), NOT NULL)
- email (VARCHAR(150), UNIQUE, NOT NULL)
- edad (INT)
- fecha_registro (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
```

### Tabla: asignaturas
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- nombre (VARCHAR(100), NOT NULL, UNIQUE)
- creditos (INT, DEFAULT 6)
- descripcion (TEXT)
```

### Tabla: notas
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- alumno_id (INT, FOREIGN KEY -> alumnos.id)
- asignatura_id (INT, FOREIGN KEY -> asignaturas.id)
- nota (DECIMAL(4,2), CHECK 0-10)
- fecha_examen (DATE)
- UNIQUE(alumno_id, asignatura_id)
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v14 o superior)
- MySQL Server
- npm

### Pasos de instalación

1. **Instalar dependencias**
   ```bash
   cd "c:\\Codenotch\\retosEvaluables\\modulo5\\Tema 3"
   npm install
   ```

2. **Configurar variables de entorno**
   ```bash
   # Copia el archivo de ejemplo
   copy .env.example .env
   ```
   
   Edita el archivo `.env` con tus credenciales de MySQL:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=tu_password
   DB_NAME=escuela_db
   PORT=3000
   ```

3. **Configurar la base de datos**
   ```bash
   npm run setup
   ```
   
   Este comando:
   - Crea la base de datos `escuela_db`
   - Crea las tablas necesarias
   - Inserta datos de ejemplo

4. **Iniciar el servidor**
   ```bash
   npm start
   # o para desarrollo con auto-reload:
   npm run dev
   ```

5. **Probar la API**
   ```bash
   npm test
   ```

## 📋 Ejemplos de Uso

### Obtener todos los alumnos
```bash
curl http://localhost:3000/alumnos
```

### Obtener alumno por ID
```bash
curl http://localhost:3000/alumnos/1
```

### Obtener alumno por nombre
```bash
curl http://localhost:3000/alumnos/Juan%20Pérez
```

### Crear nuevo alumno
```bash
curl -X POST http://localhost:3000/alumnos \\
  -H "Content-Type: application/json" \\
  -d "{\"nombre\":\"Nuevo Alumno\",\"email\":\"nuevo@email.com\",\"edad\":20}"
```

### Actualizar alumno
```bash
curl -X PUT http://localhost:3000/alumnos/1 \\
  -H "Content-Type: application/json" \\
  -d "{\"nombre\":\"Juan Actualizado\",\"email\":\"juan.nuevo@email.com\",\"edad\":21}"
```

### Eliminar alumno
```bash
curl -X DELETE http://localhost:3000/alumnos/1
```

### Obtener media de notas
```bash
curl "http://localhost:3000/media?id=1"
curl "http://localhost:3000/media?nombre=Juan%20Pérez"
```

### Obtener asignaturas del alumno
```bash
curl "http://localhost:3000/apuntadas?id=2"
curl "http://localhost:3000/apuntadas?nombre=María%20García"
```

## Datos de Ejemplo

La base de datos incluye los siguientes datos de ejemplo:

### Alumnos
- Juan Pérez (juan.perez@email.com) - 20 años
- María García (maria.garcia@email.com) - 19 años  
- Carlos López (carlos.lopez@email.com) - 21 años
- Ana Martínez (ana.martinez@email.com) - 18 años
- Pedro Sánchez (pedro.sanchez@email.com) - 22 años

### Asignaturas
- Matemáticas (6 créditos)
- Física (6 créditos)
- Química (4 créditos)
- Historia (4 créditos)
- Literatura (4 créditos)
- Inglés (6 créditos)

## 🔧 Scripts Disponibles

- `npm start` - Inicia el servidor en producción
- `npm run dev` - Inicia el servidor en modo desarrollo (con nodemon)
- `npm run setup` - Configura la base de datos y datos de ejemplo
- `npm test` - Ejecuta las pruebas de los endpoints

## 🌐 Endpoints de Prueba

Visita http://localhost:3000 para ver la documentación de la API y todos los endpoints disponibles.

## ⚠️ Notas Importantes

1. **Seguridad**: Esta es una implementación básica para fines educativos. En producción se necesitarían:
   - Autenticación y autorización
   - Validación más robusta
   - Sanitización de inputs
   - Rate limiting

2. **Base de datos**: Asegúrate de que MySQL esté corriendo antes de iniciar la aplicación.

3. **Cors**: La API permite requests desde cualquier origen para facilitar las pruebas.

## 📝 Estructura del Proyecto

```
Tema 3/
├── app.js              # Aplicación principal con todos los endpoints
├── setup-database.js   # Script para configurar la base de datos
├── test-endpoints.js   # Pruebas automatizadas de los endpoints
├── package.json        # Dependencias y scripts
├── .env.example        # Plantilla de variables de entorno
├── .env               # Variables de entorno (no subir a git)
└── README.md          # Este archivo
```