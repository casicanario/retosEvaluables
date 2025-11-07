const UserModel = require('../model/user');

// GET - Obtener todos los usuarios
function getUsers(request, response) {
    console.log(request.body);
    
    UserModel.find()
        .then((users) => {
            console.log("Usuarios obtenidos correctamente");
            console.log(users);
            response.status(200).json(users);
        })
        .catch((error) => {
            console.error("Error obteniendo usuarios:", error);
            response.status(500).json({ error: error.message });
        });
}

// POST - Crear nuevo usuario
function postUser(request, response) {
    console.log(request.body);
    
    let usuario = new UserModel({
        name: request.body.name,
        email: request.body.email,
        role: request.body.role,
        verified: request.body.verified
    });
    
    usuario.save()
        .then((user) => {
            console.log("Usuario guardado correctamente");
            console.log(user);
            response.status(201).json(user);
        })
        .catch((error) => {
            console.error("Error guardando usuario:", error);
            response.status(400).json({ error: error.message });
        });
}

module.exports = {
    getUsers,
    postUser
};