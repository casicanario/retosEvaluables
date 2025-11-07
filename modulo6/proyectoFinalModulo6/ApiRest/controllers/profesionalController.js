const Profesional = require('../models/profesionalModel');

class ProfesionalController {
  
  // GET /profesionales?firstName=Chris&lastName=Hemsworth
  // GET /profesionales - Obtener todos los profesionales
  static async obtenerProfesionales(req, res) {
    try {
      const { firstName, lastName } = req.query;
      let filtro = {};
      
      // Si se proporcionan firstName y lastName, buscar por nombre completo
      if (firstName && lastName) {
        filtro.name = `${firstName} ${lastName}`;
      }
      
      const profesionales = await Profesional.find(filtro);
      
      if (profesionales.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No se encontraron profesionales con los criterios especificados',
          data: []
        });
      }
      
      res.status(200).json({
        success: true,
        message: `Se encontraron ${profesionales.length} profesionales`,
        count: profesionales.length,
        data: profesionales
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }
  
  // GET /profesionales/:firstName/:lastName
  static async obtenerProfesionalPorNombre(req, res) {
    try {
      const { firstName, lastName } = req.params;
      const nombreCompleto = `${firstName} ${lastName}`;
      
      const profesional = await Profesional.findOne({ name: nombreCompleto });
      
      if (!profesional) {
        return res.status(404).json({
          success: false,
          message: `No se encontró el profesional: ${nombreCompleto}`,
          data: null
        });
      }
      
      res.status(200).json({
        success: true,
        message: `Profesional encontrado: ${nombreCompleto}`,
        data: profesional
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }
  
  // POST /profesionales
  static async crearProfesional(req, res) {
    try {
      const datosProfesional = req.body;
      
      // Validar que se proporcionen todos los campos requeridos
      const camposRequeridos = ['name', 'age', 'weight', 'height', 'nationality', 'profession'];
      const camposFaltantes = camposRequeridos.filter(campo => !datosProfesional[campo]);
      
      if (camposFaltantes.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Faltan campos requeridos',
          camposFaltantes: camposFaltantes
        });
      }
      
      // Verificar si ya existe un profesional con ese nombre
      const profesionalExistente = await Profesional.findOne({ name: datosProfesional.name });
      if (profesionalExistente) {
        return res.status(409).json({
          success: false,
          message: `Ya existe un profesional con el nombre: ${datosProfesional.name}`,
          data: null
        });
      }
      
      const nuevoProfesional = new Profesional(datosProfesional);
      const profesionalGuardado = await nuevoProfesional.save();
      
      res.status(201).json({
        success: true,
        message: `Profesional creado exitosamente: ${profesionalGuardado.name}`,
        data: profesionalGuardado
      });
      
    } catch (error) {
      if (error.name === 'ValidationError') {
        res.status(400).json({
          success: false,
          message: 'Error de validación',
          errors: Object.values(error.errors).map(err => err.message)
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Error interno del servidor',
          error: error.message
        });
      }
    }
  }
  
  // PUT /profesionales
  static async actualizarProfesional(req, res) {
    try {
      const { name, ...datosActualizados } = req.body;
      
      if (!name) {
        return res.status(400).json({
          success: false,
          message: 'El campo "name" es requerido para actualizar un profesional'
        });
      }
      
      const profesionalActualizado = await Profesional.findOneAndUpdate(
        { name: name },
        datosActualizados,
        { new: true, runValidators: true }
      );
      
      if (!profesionalActualizado) {
        return res.status(404).json({
          success: false,
          message: `No se encontró el profesional: ${name}`,
          data: null
        });
      }
      
      res.status(200).json({
        success: true,
        message: `Profesional actualizado exitosamente: ${name}`,
        data: profesionalActualizado
      });
      
    } catch (error) {
      if (error.name === 'ValidationError') {
        res.status(400).json({
          success: false,
          message: 'Error de validación',
          errors: Object.values(error.errors).map(err => err.message)
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Error interno del servidor',
          error: error.message
        });
      }
    }
  }
  
  // DELETE /profesionales
  static async eliminarProfesional(req, res) {
    try {
      const { name } = req.body;
      
      if (!name) {
        return res.status(400).json({
          success: false,
          message: 'El campo "name" es requerido para eliminar un profesional'
        });
      }
      
      const profesionalEliminado = await Profesional.findOneAndDelete({ name: name });
      
      if (!profesionalEliminado) {
        return res.status(404).json({
          success: false,
          message: `No se encontró el profesional: ${name}`,
          data: null
        });
      }
      
      res.status(200).json({
        success: true,
        message: `Profesional eliminado exitosamente: ${name}`,
        data: profesionalEliminado
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }
}

module.exports = ProfesionalController;