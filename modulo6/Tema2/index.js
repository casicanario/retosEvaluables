const PhotoService = require('./PhotoService');

async function main() {
    const photoService = new PhotoService();

    try {
        // Inicializar conexin
        await photoService.init();
        console.log(' Sistema de gestin de fotos iniciado');

        // Aqu puedes agregar tu lgica personalizada
        // Por ejemplo, crear una interfaz de lnea de comandos
        // o exponer las funciones a travs de una API REST

        console.log('\n Funciones disponibles en PhotoService:');
        console.log('- subirFoto(usuario, url, titulo, descripcion)');
        console.log('- obtenerFotos(usuario)');
        console.log('- modificarFoto(titulo, nuevaDescripcion)');
        console.log('- eliminarFoto(usuario, titulo)');
        console.log('- eliminarTodasLasFotos(usuario)');
        console.log('- obtenerEstadisticas()');

        console.log('\n Para ejecutar las pruebas, usa: npm run test');

    } catch (error) {
        console.error(' Error iniciando la aplicacin:', error);
    }
}

// Ejecutar si este archivo es el punto de entrada
if (require.main === module) {
    main();
}

module.exports = { PhotoService };