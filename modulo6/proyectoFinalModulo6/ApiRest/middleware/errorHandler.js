// Middleware de manejo de errores globales
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.stack);

  // Error de validación de Mongoose
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      message: 'Error de validación',
      errors: errors
    });
  }

  // Error de duplicado (MongoDB)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      message: `El ${field} ya existe`,
      error: 'Recurso duplicado'
    });
  }

  // Error de cast (ID inválido)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'ID inválido',
      error: 'Formato de ID incorrecto'
    });
  }

  // Error por defecto
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.stack : 'Error interno'
  });
};

// Middleware para rutas no encontradas
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Ruta no encontrada: ${req.method} ${req.path}`,
    availableEndpoints: {
      'GET /profesionales': 'Obtener todos los profesionales',
      'GET /profesionales?firstName=X&lastName=Y': 'Buscar por nombre y apellido',
      'GET /profesionales/:firstName/:lastName': 'Obtener profesional específico',
      'POST /profesionales': 'Crear nuevo profesional',
      'PUT /profesionales': 'Actualizar profesional',
      'DELETE /profesionales': 'Eliminar profesional'
    }
  });
};

module.exports = {
  errorHandler,
  notFound
};