const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

// GET /users - Obtener todos los usuarios
router.get('/', userController.getUsers);

// POST /users - Crear nuevo usuario
router.post('/', userController.postUser);

module.exports = router;