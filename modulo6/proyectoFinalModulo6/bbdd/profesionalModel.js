const mongoose = require('mongoose');

// Esquema de la colección Profesional
const profesionalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 120
  },
  weight: {
    type: Number,
    required: true,
    min: 30,
    max: 300
  },
  height: {
    type: Number,
    required: true,
    min: 120,
    max: 250
  },
  isRetired: {
    type: Boolean,
    required: true,
    default: false
  },
  nationality: {
    type: String,
    required: true,
    trim: true
  },
  oscarNumber: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  profession: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true, // Añade createdAt y updatedAt automáticamente
  collection: 'profesional' // Forzar nombre de colección en singular
});

// Crear el modelo
const Profesional = mongoose.model('Profesional', profesionalSchema);

module.exports = Profesional;