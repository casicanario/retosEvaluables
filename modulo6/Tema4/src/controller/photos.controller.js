const PhotoModel = require('../model/photo');

// GET /photos - Dado un usuario obtiene todas sus fotos
function getPhotos(request, response) {
    const usuario = request.query.usuario;
    
    if (!usuario) {
        return response.status(400).json({ 
            error: "Parámetro 'usuario' es requerido" 
        });
    }
    
    console.log(`Obteniendo fotos del usuario: ${usuario}`);
    
    PhotoModel.find({ usuario: usuario })
        .then((photos) => {
            console.log(`Encontradas ${photos.length} fotos para el usuario: ${usuario}`);
            response.status(200).json({
                message: `Fotos del usuario ${usuario} obtenidas exitosamente`,
                count: photos.length,
                data: photos
            });
        })
        .catch((error) => {
            console.error("Error obteniendo fotos:", error);
            response.status(500).json({ error: error.message });
        });
}

// POST /photos - Dado un usuario, url de foto, título y descripción se debe guardar en la colección
function postPhoto(request, response) {
    console.log("Creando nueva foto:", request.body);
    
    const { usuario, url, titulo, descripcion } = request.body;
    
    // Validaciones
    if (!usuario || !url || !titulo || !descripcion) {
        return response.status(400).json({
            error: "Todos los campos son requeridos: usuario, url, titulo, descripcion"
        });
    }
    
    const nuevaFoto = new PhotoModel({
        usuario,
        url,
        titulo,
        descripcion,
        fechaCreacion: new Date(),
        fechaModificacion: new Date()
    });
    
    nuevaFoto.save()
        .then((photo) => {
            console.log("Foto guardada exitosamente:", photo._id);
            response.status(201).json({
                message: "Foto creada exitosamente",
                data: photo
            });
        })
        .catch((error) => {
            console.error("Error guardando foto:", error);
            response.status(400).json({ error: error.message });
        });
}

// PUT /photos - Dado el título de una foto y una descripción modificar su descripción
function putPhoto(request, response) {
    console.log("Modificando foto:", request.body);
    
    const { titulo, nuevaDescripcion } = request.body;
    
    if (!titulo || !nuevaDescripcion) {
        return response.status(400).json({
            error: "Campos 'titulo' y 'nuevaDescripcion' son requeridos"
        });
    }
    
    PhotoModel.findOneAndUpdate(
        { titulo: titulo },
        { 
            descripcion: nuevaDescripcion,
            fechaModificacion: new Date()
        },
        { new: true }
    )
        .then((photo) => {
            if (!photo) {
                return response.status(404).json({
                    message: `No se encontró ninguna foto con el título: ${titulo}`
                });
            }
            
            console.log("Foto modificada exitosamente");
            response.status(200).json({
                message: "Foto modificada exitosamente",
                data: photo
            });
        })
        .catch((error) => {
            console.error("Error modificando foto:", error);
            response.status(500).json({ error: error.message });
        });
}

// DELETE /photos - Dado un usuario y un título eliminar su foto
function deletePhoto(request, response) {
    const { usuario, titulo } = request.query;
    
    if (!usuario || !titulo) {
        return response.status(400).json({
            error: "Parámetros 'usuario' y 'titulo' son requeridos"
        });
    }
    
    console.log(`Eliminando foto "${titulo}" del usuario: ${usuario}`);
    
    PhotoModel.findOneAndDelete({ usuario: usuario, titulo: titulo })
        .then((photo) => {
            if (!photo) {
                return response.status(404).json({
                    message: `No se encontró la foto "${titulo}" del usuario ${usuario}`
                });
            }
            
            console.log("Foto eliminada exitosamente");
            response.status(200).json({
                message: "Foto eliminada exitosamente",
                data: photo
            });
        })
        .catch((error) => {
            console.error("Error eliminando foto:", error);
            response.status(500).json({ error: error.message });
        });
}

// DELETE /photos/all - Dado un usuario eliminar todas sus fotos
function deleteAllPhotos(request, response) {
    const usuario = request.query.usuario;
    
    if (!usuario) {
        return response.status(400).json({
            error: "Parámetro 'usuario' es requerido"
        });
    }
    
    console.log(`Eliminando todas las fotos del usuario: ${usuario}`);
    
    PhotoModel.deleteMany({ usuario: usuario })
        .then((result) => {
            console.log(`Eliminadas ${result.deletedCount} fotos del usuario: ${usuario}`);
            response.status(200).json({
                message: `Eliminadas todas las fotos del usuario ${usuario}`,
                deletedCount: result.deletedCount
            });
        })
        .catch((error) => {
            console.error("Error eliminando todas las fotos:", error);
            response.status(500).json({ error: error.message });
        });
}

module.exports = {
    getPhotos,
    postPhoto,
    putPhoto,
    deletePhoto,
    deleteAllPhotos
};