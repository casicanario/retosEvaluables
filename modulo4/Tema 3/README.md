# 📚 Books API REST - Módulo 4 Tema 3

API REST para la gestión de libros desarrollada con Node.js y Express.js.

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm (viene incluido con Node.js)

### Instalación
```bash
# Navegar al directorio del proyecto
cd "modulo4/Tema 3"

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# O ejecutar en modo producción
npm start
```

El servidor se ejecutará en `http://localhost:3000`.

## 📖 Endpoints de la API

### 🔍 GET /books
Obtiene toda la lista de libros.

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Lista de libros obtenida correctamente",
  "data": [
    {
      "id_book": 1,
      "id_user": 101,
      "title": "El Quijote",
      "type": "Novela",
      "author": "Miguel de Cervantes",
      "price": 15.99,
      "photo": "https://example.com/quijote.jpg"
    }
  ],
  "count": 5
}
```

### 🔍 GET /books/:id
Obtiene los datos del libro cuyo ID coincide con el pasado por parámetro.

**Parámetros:**
- `id` (number): ID del libro a buscar

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Libro encontrado",
  "data": {
    "id_book": 1,
    "id_user": 101,
    "title": "El Quijote",
    "type": "Novela",
    "author": "Miguel de Cervantes",
    "price": 15.99,
    "photo": "https://example.com/quijote.jpg"
  }
}
```

**Respuesta de error (404):**
```json
{
  "success": false,
  "message": "Libro con ID 999 no encontrado"
}
```

### ➕ POST /books
Añade un nuevo libro a la lista.

**Cuerpo de la petición:**
```json
{
  "id_user": 106,
  "title": "Nuevo Libro",
  "type": "Ficción",
  "author": "Autor Ejemplo",
  "price": 20.50,
  "photo": "https://example.com/nuevo-libro.jpg"
}
```

**Campos requeridos:** `id_user`, `title`, `type`, `author`, `price`
**Campos opcionales:** `photo`

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Libro añadido correctamente",
  "data": {
    "id_book": 6,
    "id_user": 106,
    "title": "Nuevo Libro",
    "type": "Ficción",
    "author": "Autor Ejemplo",
    "price": 20.50,
    "photo": "https://example.com/nuevo-libro.jpg"
  }
}
```

### 📝 PUT /books/:id
Modifica los datos de un libro cuyo ID coincida con el pasado por parámetro.

**Parámetros:**
- `id` (number): ID del libro a actualizar

**Cuerpo de la petición:** (todos los campos son opcionales)
```json
{
  "id_user": 107,
  "title": "Título Actualizado",
  "type": "Tipo Actualizado",
  "author": "Autor Actualizado",
  "price": 25.99,
  "photo": "https://example.com/actualizado.jpg"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Libro actualizado correctamente",
  "data": {
    "id_book": 1,
    "id_user": 107,
    "title": "Título Actualizado",
    "type": "Tipo Actualizado",
    "author": "Autor Actualizado",
    "price": 25.99,
    "photo": "https://example.com/actualizado.jpg"
  }
}
```

### 🗑️ DELETE /books/:id
Elimina el libro de la lista cuyo ID coincida con el pasado por parámetro.

**Parámetros:**
- `id` (number): ID del libro a eliminar

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Libro eliminado correctamente",
  "data": {
    "id_book": 1,
    "id_user": 101,
    "title": "El Quijote",
    "type": "Novela",
    "author": "Miguel de Cervantes",
    "price": 15.99,
    "photo": "https://example.com/quijote.jpg"
  }
}
```

## 🧪 Pruebas con Postman

Para probar la API puedes usar Postman o cualquier cliente HTTP. Aquí tienes algunos ejemplos:

### Obtener todos los libros
```
GET http://localhost:3000/books
```

### Obtener un libro específico
```
GET http://localhost:3000/books/1
```

### Crear un nuevo libro
```
POST http://localhost:3000/books
Content-Type: application/json

{
  "id_user": 106,
  "title": "Test Book",
  "type": "Test",
  "author": "Test Author",
  "price": 19.99,
  "photo": "https://example.com/test.jpg"
}
```

### Actualizar un libro
```
PUT http://localhost:3000/books/1
Content-Type: application/json

{
  "price": 29.99
}
```

### Eliminar un libro
```
DELETE http://localhost:3000/books/1
```

## 📁 Estructura del Proyecto

```
modulo4/Tema 3/
├── src/
│   └── models/
│       └── Book.js          # Clase Book con todos los atributos
├── app.js                   # Archivo principal de la API
├── package.json             # Configuración del proyecto
└── README.md               # Documentación
```

## 🛠️ Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución de JavaScript
- **Express.js**: Framework web para Node.js
- **CORS**: Middleware para habilitar CORS
- **Nodemon**: Herramienta para desarrollo (recarga automática)

## 📋 Funcionalidades Implementadas

- ✅ Clase Book con todos los atributos requeridos
- ✅ Constructor con parámetros para cada atributo
- ✅ API REST con todos los endpoints CRUD
- ✅ Validación de datos de entrada
- ✅ Manejo de errores robusto
- ✅ Respuestas JSON consistentes
- ✅ Logs informativos en consola
- ✅ Middleware CORS habilitado
- ✅ Documentación completa

## 🚦 Códigos de Estado HTTP

- **200 OK**: Operación exitosa
- **201 Created**: Recurso creado exitosamente
- **400 Bad Request**: Datos de entrada inválidos
- **404 Not Found**: Recurso no encontrado
- **500 Internal Server Error**: Error interno del servidor

---

**Desarrollado para el Módulo 4 - Tema 3 de Codenotch** 🎓