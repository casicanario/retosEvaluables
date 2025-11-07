const express = require('express');
const router = express.Router();
const photosController = require('../controller/photos.controller');

// GET /photos?usuario=nombre - Obtener todas las fotos de un usuario
router.get('/', photosController.getPhotos);

// POST /photos - Crear nueva foto
router.post('/', photosController.postPhoto);

// PUT /photos - Modificar descripción de foto por título
router.put('/', photosController.putPhoto);

// DELETE /photos?usuario=nombre&titulo=titulo - Eliminar foto específica
router.delete('/', photosController.deletePhoto);

// DELETE /photos/all?usuario=nombre - Eliminar todas las fotos de un usuario
router.delete('/all', photosController.deleteAllPhotos);

module.exports = router;