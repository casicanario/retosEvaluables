const { ObjectId } = require('mongodb');
const PhotoModel = require('./models/PhotoModel');
const DatabaseConnection = require('./database');

class PhotoService {
    constructor() {
        this.dbConnection = new DatabaseConnection();
        this.collectionName = 'photos';
    }

    /**
     * Inicializa la conexin a la base de datos
     */
    async init() {
        await this.dbConnection.connect();
        this.collection = this.dbConnection.getCollection(this.collectionName);
    }

    /**
     * Cierra la conexin a la base de datos
     */
    async close() {
        await this.dbConnection.disconnect();
    }

    /**
     * SUBIDA DE FOTOS
     * Dado un usuario, url de foto, ttulo y descripcin se debe guardar en la coleccin 'photos'
     * @param {string} usuario - Nombre del usuario
     * @param {string} url - URL de la foto
     * @param {string} titulo - Ttulo de la foto
     * @param {string} descripcion - Descripcin de la foto
     * @returns {Object} - Resultado de la operacin
     */
    async subirFoto(usuario, url, titulo, descripcion) {
        try {
                        console.log('Subiendo nueva foto...');
            
            // Crear y validar el modelo
            const foto = new PhotoModel(usuario, url, titulo, descripcion);
            const validation = foto.validate();
            
            if (!validation.isValid) {
                return {
                    success: false,
                    message: 'Datos de la foto invlidos',
                    errors: validation.errors
                };
            }

            // Insertar en la base de datos
            const result = await this.collection.insertOne(foto.toDocument());
            
            console.log('Foto subida exitosamente con ID:', result.insertedId);
            
            return {
                success: true,
                message: 'Foto subida exitosamente',
                data: {
                    _id: result.insertedId,
                    usuario,
                    url,
                    titulo,
                    descripcion
                }
            };
        } catch (error) {
            console.error('Error subiendo foto:', error);
            return {
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            };
        }
    }

    /**
     * OBTENER FOTOS
     * Dado un usuario obtener todas sus fotos
     * @param {string} usuario - Nombre del usuario
     * @returns {Object} - Resultado de la operacin
     */
    async obtenerFotos(usuario) {
        try {
            console.log(`Obteniendo fotos del usuario: ${usuario}`);
            
            if (!usuario || typeof usuario !== 'string' || usuario.trim().length === 0) {
                return {
                    success: false,
                    message: 'El nombre del usuario es requerido'
                };
            }

            const fotos = await this.collection.find({ usuario: usuario.trim() }).toArray();
            
            console.log(`Encontradas ${fotos.length} fotos para el usuario: ${usuario}`);
            
            return {
                success: true,
                message: `Fotos del usuario ${usuario} obtenidas exitosamente`,
                data: fotos,
                count: fotos.length
            };
        } catch (error) {
            console.error('Error obteniendo fotos:', error);
            return {
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            };
        }
    }

    /**
     * MODIFICAR FOTOS
     * Dado el ttulo de una foto y una descripcin modificar su descripcin
     * @param {string} titulo - Ttulo de la foto a modificar
     * @param {string} nuevaDescripcion - Nueva descripcin
     * @returns {Object} - Resultado de la operacin
     */
    async modificarFoto(titulo, nuevaDescripcion) {
        try {
            console.log(`Modificando foto con ttulo: ${titulo}`);
            
            if (!titulo || typeof titulo !== 'string' || titulo.trim().length === 0) {
                return {
                    success: false,
                    message: 'El ttulo de la foto es requerido'
                };
            }

            if (!nuevaDescripcion || typeof nuevaDescripcion !== 'string' || nuevaDescripcion.trim().length === 0) {
                return {
                    success: false,
                    message: 'La nueva descripcin es requerida'
                };
            }

            const result = await this.collection.updateOne(
                { titulo: titulo.trim() },
                { 
                    $set: { 
                        descripcion: nuevaDescripcion.trim(),
                        fechaModificacion: new Date()
                    }
                }
            );

            if (result.matchedCount === 0) {
                return {
                    success: false,
                    message: `No se encontr ninguna foto con el ttulo: ${titulo}`
                };
            }

            console.log('Foto modificada exitosamente');
            
            return {
                success: true,
                message: 'Foto modificada exitosamente',
                data: {
                    titulo,
                    nuevaDescripcion,
                    modificados: result.modifiedCount
                }
            };
        } catch (error) {
            console.error('Error modificando foto:', error);
            return {
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            };
        }
    }

    /**
     * ELIMINAR FOTO
     * Dado un usuario y un ttulo eliminar su foto
     * @param {string} usuario - Nombre del usuario
     * @param {string} titulo - Ttulo de la foto a eliminar
     * @returns {Object} - Resultado de la operacin
     */
    async eliminarFoto(usuario, titulo) {
        try {
            console.log(`Eliminando foto "${titulo}" del usuario: ${usuario}`);
            
            if (!usuario || typeof usuario !== 'string' || usuario.trim().length === 0) {
                return {
                    success: false,
                    message: 'El nombre del usuario es requerido'
                };
            }

            if (!titulo || typeof titulo !== 'string' || titulo.trim().length === 0) {
                return {
                    success: false,
                    message: 'El ttulo de la foto es requerido'
                };
            }

            const result = await this.collection.deleteOne({
                usuario: usuario.trim(),
                titulo: titulo.trim()
            });

            if (result.deletedCount === 0) {
                return {
                    success: false,
                    message: `No se encontr la foto "${titulo}" del usuario ${usuario}`
                };
            }

            console.log('Foto eliminada exitosamente');
            
            return {
                success: true,
                message: 'Foto eliminada exitosamente',
                data: {
                    usuario,
                    titulo,
                    eliminados: result.deletedCount
                }
            };
        } catch (error) {
            console.error('Error eliminando foto:', error);
            return {
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            };
        }
    }

    /**
     * ELIMINAR TODAS LAS FOTOS
     * Dado un usuario eliminar todas sus fotos
     * @param {string} usuario - Nombre del usuario
     * @returns {Object} - Resultado de la operacin
     */
    async eliminarTodasLasFotos(usuario) {
        try {
            console.log(`Eliminando todas las fotos del usuario: ${usuario}`);
            
            if (!usuario || typeof usuario !== 'string' || usuario.trim().length === 0) {
                return {
                    success: false,
                    message: 'El nombre del usuario es requerido'
                };
            }

            const result = await this.collection.deleteMany({ usuario: usuario.trim() });

            console.log(`Eliminadas ${result.deletedCount} fotos del usuario: ${usuario}`);
            
            return {
                success: true,
                message: `Eliminadas todas las fotos del usuario ${usuario}`,
                data: {
                    usuario,
                    eliminados: result.deletedCount
                }
            };
        } catch (error) {
            console.error('Error eliminando todas las fotos:', error);
            return {
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            };
        }
    }

    /**
     * Mtodo auxiliar para obtener estadsticas de la coleccin
     * @returns {Object} - Estadsticas de la coleccin
     */
    async obtenerEstadisticas() {
        try {
            const totalFotos = await this.collection.countDocuments();
            const usuariosUnicos = await this.collection.distinct('usuario');
            
            return {
                success: true,
                data: {
                    totalFotos,
                    totalUsuarios: usuariosUnicos.length,
                    usuarios: usuariosUnicos
                }
            };
        } catch (error) {
            console.error('Error obteniendo estadsticas:', error);
            return {
                success: false,
                message: 'Error obteniendo estadsticas',
                error: error.message
            };
        }
    }
}

module.exports = PhotoService;