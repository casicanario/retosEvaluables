// Funciones CRUD para la coleccin 'photos'
// Mdulo 6 - Tema 2: rboles, Subdocumentos y Operaciones CRUD

const mongoose = require('mongoose');
const Photo = require('./photos-model');

// Configuracin de conexin a MongoDB
const MONGODB_URI = 'mongodb://localhost:27017/photos_db';

// Conectar a MongoDB
async function conectarDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(' Conectado a MongoDB exitosamente');
  } catch (error) {
    console.error(' Error al conectar a MongoDB:', error);
    throw error;
  }
}

// 1. SUBIDA DE FOTOS
// Funcin para subir una nueva foto
async function subirFoto(usuario, url, titulo, descripcion, etiquetas = [], metadatos = {}) {
  try {
    const nuevaFoto = new Photo({
      usuario,
      url,
      titulo,
      descripcion,
      etiquetas,
      metadatos
    });
    
    const fotoGuardada = await nuevaFoto.save();
    console.log(' Foto subida exitosamente:', fotoGuardada._id);
    return fotoGuardada;
  } catch (error) {
    console.error(' Error al subir la foto:', error);
    throw error;
  }
}

// 2. OBTENER FOTOS
// Funcin para obtener todas las fotos de un usuario
async function obtenerFotos(usuario) {
  try {
    const fotos = await Photo.find({ usuario }).sort({ fechaSubida: -1 });
    console.log(` Encontradas ${fotos.length} fotos para el usuario: ${usuario}`);
    return fotos;
  } catch (error) {
    console.error(' Error al obtener las fotos:', error);
    throw error;
  }
}

// Funcin para obtener todas las fotos (sin filtro de usuario)
async function obtenerTodasLasFotos() {
  try {
    const fotos = await Photo.find({}).sort({ fechaSubida: -1 });
    console.log(` Total de fotos en la base de datos: ${fotos.length}`);
    return fotos;
  } catch (error) {
    console.error(' Error al obtener todas las fotos:', error);
    throw error;
  }
}

// 3. MODIFICAR FOTOS
// Funcin para modificar el ttulo y descripcin de una foto
async function modificarFoto(fotoId, nuevoTitulo, nuevaDescripcion) {
  try {
    const fotoModificada = await Photo.findByIdAndUpdate(
      fotoId,
      { 
        titulo: nuevoTitulo,
        descripcion: nuevaDescripcion
      },
      { new: true, runValidators: true }
    );
    
    if (!fotoModificada) {
      throw new Error('Foto no encontrada');
    }
    
    console.log(' Foto modificada exitosamente:', fotoModificada._id);
    return fotoModificada;
  } catch (error) {
    console.error(' Error al modificar la foto:', error);
    throw error;
  }
}

// 4. ELIMINAR FOTO
// Funcin para eliminar una foto especfica
async function eliminarFoto(fotoId) {
  try {
    const fotoEliminada = await Photo.findByIdAndDelete(fotoId);
    
    if (!fotoEliminada) {
      throw new Error('Foto no encontrada');
    }
    
    console.log(' Foto eliminada exitosamente:', fotoEliminada._id);
    return fotoEliminada;
  } catch (error) {
    console.error(' Error al eliminar la foto:', error);
    throw error;
  }
}

// 5. ELIMINAR TODAS LAS FOTOS
// Funcin para eliminar todas las fotos de un usuario
async function eliminarTodasLasFotos(usuario) {
  try {
    const resultado = await Photo.deleteMany({ usuario });
    console.log(` Eliminadas ${resultado.deletedCount} fotos del usuario: ${usuario}`);
    return resultado;
  } catch (error) {
    console.error(' Error al eliminar todas las fotos:', error);
    throw error;
  }
}

// Funcin para cerrar la conexin a la base de datos
async function cerrarConexion() {
  try {
    await mongoose.connection.close();
    console.log(' Conexin a MongoDB cerrada');
  } catch (error) {
    console.error(' Error al cerrar la conexin:', error);
  }
}

// Exportar todas las funciones
module.exports = {
  conectarDB,
  subirFoto,
  obtenerFotos,
  obtenerTodasLasFotos,
  modificarFoto,
  eliminarFoto,
  eliminarTodasLasFotos,
  cerrarConexion
};