// Modelo y esquema para la coleccin 'photos'
// Mdulo 6 - Tema 2: rboles, Subdocumentos y Operaciones CRUD

const mongoose = require('mongoose');

// Definicin del esquema para las fotos
const photoSchema = new mongoose.Schema({
  // Nombre del usuario que sube la foto
  usuario: {
    type: String,
    required: true,
    trim: true
  },
  
  // URL de la foto
  url: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
      },
      message: 'La URL debe ser vlida y apuntar a una imagen'
    }
  },
  
  // Ttulo de la foto
  titulo: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  
  // Descripcin de la foto
  descripcion: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  
  // Metadatos adicionales
  fechaSubida: {
    type: Date,
    default: Date.now
  },
  
  // Etiquetas para categorizar las fotos (ejemplo de array)
  etiquetas: [{
    type: String,
    lowercase: true
  }],
  
  // Informacin de la foto (ejemplo de subdocumento)
  metadatos: {
    tamao: {
      ancho: Number,
      alto: Number
    },
    formato: String,
    tamao_archivo: String
  }
}, {
  timestamps: true // Aade createdAt y updatedAt automticamente
});

// ndices para mejorar el rendimiento de las consultas
photoSchema.index({ usuario: 1 }); // ndice en usuario para bsquedas rpidas
photoSchema.index({ fechaSubida: -1 }); // ndice en fecha para ordenar
photoSchema.index({ etiquetas: 1 }); // ndice en etiquetas

// Crear el modelo
const Photo = mongoose.model('Photo', photoSchema, 'photos');

module.exports = Photo;