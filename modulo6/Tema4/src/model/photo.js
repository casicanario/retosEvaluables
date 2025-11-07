const { Schema, model } = require('mongoose');

const PhotoSchema = new Schema({
    usuario: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    fechaModificacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Photo', PhotoSchema, 'photos');