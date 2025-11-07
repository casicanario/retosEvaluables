const Database = require('./database');
const Profesional = require('./profesionalModel');

class ProfesionalService {
  constructor() {
    this.db = new Database();
  }

  // Inicializar conexión
  async init() {
    return await this.db.connect();
  }

  // Cerrar conexión
  async close() {
    return await this.db.disconnect();
  }

  // Crear un nuevo profesional
  async crearProfesional(datosProfesional) {
    try {
      const profesional = new Profesional(datosProfesional);
      const resultado = await profesional.save();
      console.log('Profesional creado:', resultado.name);
      return resultado;
    } catch (error) {
      console.error('Error creando profesional:', error.message);
      throw error;
    }
  }

  // Obtener todos los profesionales
  async obtenerTodosProfesionales() {
    try {
      const profesionales = await Profesional.find({});
      console.log(`Encontrados ${profesionales.length} profesionales`);
      return profesionales;
    } catch (error) {
      console.error('Error obteniendo profesionales:', error.message);
      throw error;
    }
  }

  // Buscar profesional por nombre
  async buscarPorNombre(nombre) {
    try {
      const profesional = await Profesional.findOne({ name: nombre });
      if (profesional) {
        console.log('Profesional encontrado:', profesional.name);
      } else {
        console.log('Profesional no encontrado:', nombre);
      }
      return profesional;
    } catch (error) {
      console.error('Error buscando profesional:', error.message);
      throw error;
    }
  }

  // Buscar profesionales por filtros
  async buscarPorFiltros(filtros) {
    try {
      const profesionales = await Profesional.find(filtros);
      console.log(`Encontrados ${profesionales.length} profesionales con los filtros aplicados`);
      return profesionales;
    } catch (error) {
      console.error('Error buscando con filtros:', error.message);
      throw error;
    }
  }

  // Actualizar profesional
  async actualizarProfesional(nombre, datosActualizados) {
    try {
      const profesional = await Profesional.findOneAndUpdate(
        { name: nombre },
        datosActualizados,
        { new: true, runValidators: true }
      );
      if (profesional) {
        console.log('Profesional actualizado:', profesional.name);
      } else {
        console.log('Profesional no encontrado para actualizar:', nombre);
      }
      return profesional;
    } catch (error) {
      console.error('Error actualizando profesional:', error.message);
      throw error;
    }
  }

  // Eliminar profesional
  async eliminarProfesional(nombre) {
    try {
      const resultado = await Profesional.findOneAndDelete({ name: nombre });
      if (resultado) {
        console.log('Profesional eliminado:', resultado.name);
      } else {
        console.log('Profesional no encontrado para eliminar:', nombre);
      }
      return resultado;
    } catch (error) {
      console.error('Error eliminando profesional:', error.message);
      throw error;
    }
  }

  // Contar profesionales
  async contarProfesionales() {
    try {
      const count = await Profesional.countDocuments({});
      console.log(`Total de profesionales: ${count}`);
      return count;
    } catch (error) {
      console.error('Error contando profesionales:', error.message);
      throw error;
    }
  }
}

module.exports = ProfesionalService;