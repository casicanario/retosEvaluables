const PhotoService = require('./PhotoService');

async function ejecutarPruebas() {
    const photoService = new PhotoService();

    try {
        // Inicializar conexin
        await photoService.init();
        
        console.log('\n INICIANDO PRUEBAS DEL SISTEMA CRUD DE FOTOS\n');
        console.log('='.repeat(60));

        // 1. SUBIR FOTOS
        console.log('\n1 PRUEBA: SUBIR FOTOS');
        console.log('-'.repeat(40));

        const foto1 = await photoService.subirFoto(
            'Juan Prez',
            'https://ejemplo.com/foto1.jpg',
            'Atardecer en la playa',
            'Una hermosa puesta de sol en la costa mediterrnea'
        );
        console.log('Resultado foto 1:', foto1);

        const foto2 = await photoService.subirFoto(
            'Juan Prez',
            'https://ejemplo.com/foto2.jpg',
            'Montaas nevadas',
            'Vista panormica de los Alpes en invierno'
        );
        console.log('Resultado foto 2:', foto2);

        const foto3 = await photoService.subirFoto(
            'Mara Gonzlez',
            'https://ejemplo.com/foto3.jpg',
            'Ciudad nocturna',
            'Las luces de la ciudad reflejndose en el ro'
        );
        console.log('Resultado foto 3:', foto3);

        // 2. OBTENER FOTOS
        console.log('\n2 PRUEBA: OBTENER FOTOS POR USUARIO');
        console.log('-'.repeat(40));

        const fotosJuan = await photoService.obtenerFotos('Juan Prez');
        console.log('Fotos de Juan Prez:', fotosJuan);

        const fotosMaria = await photoService.obtenerFotos('Mara Gonzlez');
        console.log('Fotos de Mara Gonzlez:', fotosMaria);

        // 3. MODIFICAR FOTO
        console.log('\n3 PRUEBA: MODIFICAR DESCRIPCIN DE FOTO');
        console.log('-'.repeat(40));

        const modificacion = await photoService.modificarFoto(
            'Atardecer en la playa',
            'Una espectacular puesta de sol en la costa mediterrnea con colores vibrantes'
        );
        console.log('Resultado modificacin:', modificacion);

        // Verificar modificacin
        const fotosJuanModificadas = await photoService.obtenerFotos('Juan Prez');
        console.log('Fotos de Juan despus de modificacin:', fotosJuanModificadas);

        // 4. ELIMINAR UNA FOTO
        console.log('\n4 PRUEBA: ELIMINAR UNA FOTO ESPECFICA');
        console.log('-'.repeat(40));

        const eliminacion = await photoService.eliminarFoto('Juan Prez', 'Montaas nevadas');
        console.log('Resultado eliminacin:', eliminacion);

        // Verificar eliminacin
        const fotosJuanDespuesEliminar = await photoService.obtenerFotos('Juan Prez');
        console.log('Fotos de Juan despus de eliminar una:', fotosJuanDespuesEliminar);

        // 5. SUBIR MS FOTOS PARA PRUEBA FINAL
        console.log('\n5 PREPARANDO PARA PRUEBA FINAL: SUBIR MS FOTOS');
        console.log('-'.repeat(40));

        await photoService.subirFoto(
            'Juan Prez',
            'https://ejemplo.com/foto4.jpg',
            'Bosque otoal',
            'Colores dorados del otoo en el bosque'
        );

        await photoService.subirFoto(
            'Juan Prez',
            'https://ejemplo.com/foto5.jpg',
            'Lago cristalino',
            'Reflexin perfecta en aguas tranquilas'
        );

        // 6. OBTENER ESTADSTICAS
        console.log('\n6 ESTADSTICAS ANTES DE ELIMINACIN MASIVA');
        console.log('-'.repeat(40));

        const stats = await photoService.obtenerEstadisticas();
        console.log('Estadsticas:', stats);

        // 7. ELIMINAR TODAS LAS FOTOS DE UN USUARIO
        console.log('\n7 PRUEBA: ELIMINAR TODAS LAS FOTOS DE UN USUARIO');
        console.log('-'.repeat(40));

        const eliminacionMasiva = await photoService.eliminarTodasLasFotos('Juan Prez');
        console.log('Resultado eliminacin masiva:', eliminacionMasiva);

        // Verificar eliminacin masiva
        const fotosJuanFinal = await photoService.obtenerFotos('Juan Prez');
        console.log('Fotos de Juan despus de eliminacin masiva:', fotosJuanFinal);

        // 8. ESTADSTICAS FINALES
        console.log('\n8 ESTADSTICAS FINALES');
        console.log('-'.repeat(40));

        const statsFinal = await photoService.obtenerEstadisticas();
        console.log('Estadsticas finales:', statsFinal);

        // 9. PRUEBA DE VALIDACIN DE ERRORES
        console.log('\n9 PRUEBA: VALIDACIN DE ERRORES');
        console.log('-'.repeat(40));

        const fotoInvalida = await photoService.subirFoto('', '', '', '');
        console.log('Resultado foto invlida:', fotoInvalida);

        const usuarioInexistente = await photoService.obtenerFotos('Usuario Inexistente');
        console.log('Fotos de usuario inexistente:', usuarioInexistente);

        console.log('\n TODAS LAS PRUEBAS COMPLETADAS');
        console.log('='.repeat(60));

    } catch (error) {
        console.error(' Error durante las pruebas:', error);
    } finally {
        // Cerrar conexin
        await photoService.close();
    }
}

// Ejecutar las pruebas si este archivo se ejecuta directamente
if (require.main === module) {
    ejecutarPruebas();
}

module.exports = { ejecutarPruebas };