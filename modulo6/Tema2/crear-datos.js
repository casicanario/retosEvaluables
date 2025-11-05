const PhotoService = require('./PhotoService');

async function crearDatosPermanentes() {
    const photoService = new PhotoService();

    try {
        // Inicializar conexión
        await photoService.init();
        
        console.log('Creando datos permanentes para visualizar en Compass...');

        // Crear algunas fotos de ejemplo
        await photoService.subirFoto(
            'Juan Pérez',
            'https://ejemplo.com/foto1.jpg',
            'Atardecer en la playa',
            'Una hermosa puesta de sol en la costa mediterránea'
        );

        await photoService.subirFoto(
            'Juan Pérez',
            'https://ejemplo.com/foto2.jpg',
            'Montañas nevadas',
            'Vista panorámica de los Alpes en invierno'
        );

        await photoService.subirFoto(
            'María González',
            'https://ejemplo.com/foto3.jpg',
            'Ciudad nocturna',
            'Las luces de la ciudad reflejándose en el río'
        );

        await photoService.subirFoto(
            'Ana López',
            'https://ejemplo.com/foto4.jpg',
            'Bosque otoñal',
            'Colores dorados del otoño en el bosque'
        );

        await photoService.subirFoto(
            'Carlos Ruiz',
            'https://ejemplo.com/foto5.jpg',
            'Lago cristalino',
            'Reflexión perfecta en aguas tranquilas'
        );

        console.log('Datos creados exitosamente!');
        console.log('Ahora puedes ver la base de datos "photos_db" en MongoDB Compass');
        console.log('Ve a la colección "photos" para ver los documentos insertados');

        // Mostrar estadísticas
        const stats = await photoService.obtenerEstadisticas();
        console.log('Estadísticas:', stats.data);

    } catch (error) {
        console.error('Error creando datos:', error);
    } finally {
        // Cerrar conexión
        await photoService.close();
    }
}

// Ejecutar
crearDatosPermanentes();