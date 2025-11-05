const { ObjectId } = require('mongodb');

/**
 * Modelo para validar y estructurar los datos de las fotos
 */
class PhotoModel {
    /**
     * Crea una nueva instancia de foto
     * @param {string} usuario - Nombre del usuario
     * @param {string} url - URL de la foto
     * @param {string} titulo - Ttulo de la foto
     * @param {string} descripcion - Descripcin de la foto
     */
    constructor(usuario, url, titulo, descripcion) {
        this.usuario = usuario;
        this.url = url;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fechaCreacion = new Date();
        this.fechaModificacion = new Date();
    }

    /**
     * Valida los datos de la foto
     * @returns {Object} - Objeto con validacin
     */
    validate() {
        const errors = [];

        if (!this.usuario || typeof this.usuario !== 'string' || this.usuario.trim().length === 0) {
            errors.push('El nombre del usuario es requerido y debe ser un string vlido');
        }

        if (!this.url || typeof this.url !== 'string' || this.url.trim().length === 0) {
            errors.push('La URL de la foto es requerida y debe ser un string vlido');
        }

        if (!this.titulo || typeof this.titulo !== 'string' || this.titulo.trim().length === 0) {
            errors.push('El ttulo de la foto es requerido y debe ser un string vlido');
        }

        if (!this.descripcion || typeof this.descripcion !== 'string' || this.descripcion.trim().length === 0) {
            errors.push('La descripcin de la foto es requerida y debe ser un string vlido');
        }

        // Validacin bsica de URL
        try {
            new URL(this.url);
        } catch (error) {
            errors.push('La URL de la foto no tiene un formato vlido');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * Convierte la instancia a un objeto plano para MongoDB
     * @returns {Object} - Objeto para insertar en MongoDB
     */
    toDocument() {
        return {
            usuario: this.usuario.trim(),
            url: this.url.trim(),
            titulo: this.titulo.trim(),
            descripcion: this.descripcion.trim(),
            fechaCreacion: this.fechaCreacion,
            fechaModificacion: this.fechaModificacion
        };
    }

    /**
     * Crea una instancia de PhotoModel desde un documento de MongoDB
     * @param {Object} document - Documento de MongoDB
     * @returns {PhotoModel} - Instancia de PhotoModel
     */
    static fromDocument(document) {
        const photo = new PhotoModel(
            document.usuario,
            document.url,
            document.titulo,
            document.descripcion
        );
        photo._id = document._id;
        photo.fechaCreacion = document.fechaCreacion;
        photo.fechaModificacion = document.fechaModificacion;
        return photo;
    }
}

module.exports = PhotoModel;