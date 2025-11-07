function errorHandling(error, request, response, next) {
    console.error('Error capturado:', error);
    
    // Error de validación de Mongoose
    if (error.name === 'ValidationError') {
        return response.status(400).json({
            error: 'Error de validación',
            details: error.message
        });
    }
    
    // Error de cast (tipo de dato incorrecto)
    if (error.name === 'CastError') {
        return response.status(400).json({
            error: 'Formato de datos incorrecto',
            details: error.message
        });
    }
    
    // Error de conexión a la base de datos
    if (error.name === 'MongoNetworkError') {
        return response.status(503).json({
            error: 'Error de conexión a la base de datos',
            details: 'Servicio temporalmente no disponible'
        });
    }
    
    // Error genérico del servidor
    response.status(500).json({
        error: 'Error interno del servidor',
        details: error.message
    });
}

module.exports = errorHandling;