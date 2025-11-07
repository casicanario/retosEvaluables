const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./database');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar rutas
const userRoutes = require('./routes/user.routes');
const photosRoutes = require('./routes/photos.routes');

// Importar manejo de errores
const errorHandling = require('./error/errorHandling');

// Configurar rutas
app.use('/users', userRoutes);
app.use('/photos', photosRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.json({
        message: 'API REST de Fotos con MongoDB',
        endpoints: {
            photos: {
                'GET /photos?usuario=nombre': 'Obtener todas las fotos de un usuario',
                'POST /photos': 'Crear nueva foto (body: usuario, url, titulo, descripcion)',
                'PUT /photos': 'Modificar descripción (body: titulo, nuevaDescripcion)',
                'DELETE /photos?usuario=nombre&titulo=titulo': 'Eliminar foto específica',
                'DELETE /photos/all?usuario=nombre': 'Eliminar todas las fotos de un usuario'
            },
            users: {
                'GET /users': 'Obtener todos los usuarios',
                'POST /users': 'Crear nuevo usuario (body: name, email, role, verified)'
            }
        }
    });
});

// Middleware de manejo de errores (debe ir al final)
app.use(errorHandling);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});