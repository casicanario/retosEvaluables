const express = require('express');
const app = express();

app.post('/tasks', (req, res) => {
    const task = req.body;
    // Nota: debemos asegurar que la tarea en algún lugar
    if (!task.title) {
        res.status(400).send('El titulo de la tarea es obligatorio');
    } else {
        res.status(200).send({ message: 'Tarea creada', task });
    }
});

app.listen(3000, () => {
    console.log('Servidor en ejecución en el puerto 3000');
});