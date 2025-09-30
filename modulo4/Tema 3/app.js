/**
 * API REST para gestión de libros
 * Módulo 4 - Tema 3
 * 
 * Endpoints implementados:
 * - GET /books - Obtiene todos los libros
 * - GET /books/:id - Obtiene un libro por ID
 * - POST /books - Añade un nuevo libro
 * - PUT /books/:id - Modifica un libro existente
 * - DELETE /books/:id - Elimina un libro
 */

const express = require('express');
const cors = require('cors');
const Book = require('./src/models/Book');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Array de libros (simulando base de datos)
let books = [
    new Book(1, 101, "El Quijote", "Novela", "Miguel de Cervantes", 15.99, "https://example.com/quijote.jpg"),
    new Book(2, 102, "Cien años de soledad", "Realismo mágico", "Gabriel García Márquez", 18.50, "https://example.com/cien-anos.jpg"),
    new Book(3, 103, "1984", "Distopía", "George Orwell", 12.75, "https://example.com/1984.jpg"),
    new Book(4, 104, "El principito", "Fábula", "Antoine de Saint-Exupéry", 10.99, "https://example.com/principito.jpg"),
    new Book(5, 105, "Orgullo y prejuicio", "Romance", "Jane Austen", 14.25, "https://example.com/orgullo.jpg")
];

// Variable para generar IDs únicos
let nextId = 6;

/**
 * GET /books - Obtiene toda la lista de libros
 */
app.get('/books', (req, res) => {
    try {
        console.log('📚 GET /books - Solicitando todos los libros');
        res.status(200).json({
            success: true,
            message: 'Lista de libros obtenida correctamente',
            data: books.map(book => book.toJSON()),
            count: books.length
        });
    } catch (error) {
        console.error('❌ Error en GET /books:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
});

/**
 * GET /books/:id - Obtiene los datos del libro cuyo id coincide con el pasado por parámetro
 */
app.get('/books/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        console.log(`🔍 GET /books/${id} - Buscando libro por ID`);
        
        const book = books.find(b => b.id_book === id);
        
        if (!book) {
            return res.status(404).json({
                success: false,
                message: `Libro con ID ${id} no encontrado`
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Libro encontrado',
            data: book.toJSON()
        });
    } catch (error) {
        console.error(`❌ Error en GET /books/${req.params.id}:`, error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
});

/**
 * POST /books - Añade un nuevo libro a la lista
 */
app.post('/books', (req, res) => {
    try {
        console.log('➕ POST /books - Añadiendo nuevo libro');
        const { id_user, title, type, author, price, photo } = req.body;
        
        // Validación de campos requeridos
        if (!id_user || !title || !type || !author || !price) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos requeridos: id_user, title, type, author, price'
            });
        }
        
        // Crear nuevo libro
        const newBook = new Book(nextId++, id_user, title, type, author, price, photo || '');
        books.push(newBook);
        
        console.log(`✅ Libro creado: ${newBook.getBookInfo()}`);
        
        res.status(201).json({
            success: true,
            message: 'Libro añadido correctamente',
            data: newBook.toJSON()
        });
    } catch (error) {
        console.error('❌ Error en POST /books:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
});

/**
 * PUT /books/:id - Modifica los datos de un libro cuyo id coincida con el pasado por parámetro
 */
app.put('/books/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        console.log(`📝 PUT /books/${id} - Modificando libro`);
        
        const bookIndex = books.findIndex(b => b.id_book === id);
        
        if (bookIndex === -1) {
            return res.status(404).json({
                success: false,
                message: `Libro con ID ${id} no encontrado`
            });
        }
        
        const { id_user, title, type, author, price, photo } = req.body;
        
        // Actualizar solo los campos proporcionados
        if (id_user !== undefined) books[bookIndex].id_user = id_user;
        if (title !== undefined) books[bookIndex].title = title;
        if (type !== undefined) books[bookIndex].type = type;
        if (author !== undefined) books[bookIndex].author = author;
        if (price !== undefined) books[bookIndex].price = price;
        if (photo !== undefined) books[bookIndex].photo = photo;
        
        console.log(`✅ Libro actualizado: ${books[bookIndex].getBookInfo()}`);
        
        res.status(200).json({
            success: true,
            message: 'Libro actualizado correctamente',
            data: books[bookIndex].toJSON()
        });
    } catch (error) {
        console.error(`❌ Error en PUT /books/${req.params.id}:`, error);
        res.status(500).json({
            success: false,
            message: 'Error internal del servidor',
            error: error.message
        });
    }
});

/**
 * DELETE /books/:id - Elimina el libro de la lista cuyo id coincida con el pasado por parámetro
 */
app.delete('/books/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        console.log(`🗑️ DELETE /books/${id} - Eliminando libro`);
        
        const bookIndex = books.findIndex(b => b.id_book === id);
        
        if (bookIndex === -1) {
            return res.status(404).json({
                success: false,
                message: `Libro con ID ${id} no encontrado`
            });
        }
        
        const deletedBook = books.splice(bookIndex, 1)[0];
        
        console.log(`✅ Libro eliminado: ${deletedBook.getBookInfo()}`);
        
        res.status(200).json({
            success: true,
            message: 'Libro eliminado correctamente',
            data: deletedBook.toJSON()
        });
    } catch (error) {
        console.error(`❌ Error en DELETE /books/${req.params.id}:`, error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
});

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint no encontrado',
        availableEndpoints: [
            'GET /books',
            'GET /books/:id',
            'POST /books',
            'PUT /books/:id',
            'DELETE /books/:id'
        ]
    });
});

// Manejo de errores globales
app.use((error, req, res, next) => {
    console.error('💥 Error no manejado:', error);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor API REST ejecutándose en http://localhost:${PORT}`);
    console.log(`📖 Endpoints disponibles:`);
    console.log(`   GET    /books      - Listar todos los libros`);
    console.log(`   GET    /books/:id  - Obtener libro por ID`);
    console.log(`   POST   /books      - Crear nuevo libro`);
    console.log(`   PUT    /books/:id  - Actualizar libro`);
    console.log(`   DELETE /books/:id  - Eliminar libro`);
    console.log(`📚 ${books.length} libros cargados en memoria`);
});

module.exports = app;