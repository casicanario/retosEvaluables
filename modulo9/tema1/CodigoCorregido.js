const express = require('express');
const app = express();

// Middleware para parsear JSON en el body de las peticiones
app.use(express.json());

/**
 * Endpoint POST /tasks - Crear una nueva tarea
 * @body {title: string, description: string} - Datos de la tarea
 */
app.post('/tasks', (req, res) => {
    const task = req.body;
    
    // Validación: El título es obligatorio
    if (!task.title || task.title.trim() === '') {
        return res.status(400).send({ 
            error: 'El título de la tarea es obligatorio',
            message: 'Por favor, proporciona un título válido para la tarea'
        });
    }
    
    // Validación adicional: verificar longitud mínima
    if (task.title.trim().length < 3) {
        return res.status(400).send({ 
            error: 'El título es demasiado corto',
            message: 'El título debe tener al menos 3 caracteres'
        });
    }
    
    // Sanitización: eliminar espacios en blanco
    task.title = task.title.trim();
    if (task.description) {
        task.description = task.description.trim();
    }
    
    // Agregar información adicional
    task.id = Date.now();
    task.createdAt = new Date().toISOString();
    task.status = 'pendiente';
    
    // Respuesta exitosa con código 201
    res.status(201).send({ 
        message: 'Tarea creada exitosamente', 
        task 
    });
});

app.listen(3000, () => {
    console.log('Servidor en ejecución en el puerto 3000');
});