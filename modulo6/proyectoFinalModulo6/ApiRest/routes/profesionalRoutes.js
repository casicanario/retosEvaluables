const express = require('express');
const router = express.Router();
const ProfesionalController = require('../controllers/profesionalController');

// GET /profesionales?firstName=Chris&lastName=Hemsworth
// GET /profesionales - Obtener todos los profesionales
router.get('/', ProfesionalController.obtenerProfesionales);

// GET /profesionales/:firstName/:lastName - Obtener profesional por nombre
router.get('/:firstName/:lastName', ProfesionalController.obtenerProfesionalPorNombre);

// POST /profesionales - Crear nuevo profesional
router.post('/', ProfesionalController.crearProfesional);

// PUT /profesionales - Actualizar profesional
router.put('/', ProfesionalController.actualizarProfesional);

// DELETE /profesionales - Eliminar profesional
router.delete('/', ProfesionalController.eliminarProfesional);

module.exports = router;