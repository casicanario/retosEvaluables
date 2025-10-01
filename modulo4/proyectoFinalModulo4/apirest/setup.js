#!/usr/bin/env node

/**
 * 🚀 SCRIPT DE INICIO RÁPIDO
 * ========================================
 * Script para inicializar y probar la Email API REST
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 ========================================');
console.log('   EMAIL API REST - INICIO RÁPIDO');
console.log('========================================\n');

// Verificar si existe .env
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
    console.log('⚠️  Archivo .env no encontrado');
    console.log('📋 Creando .env desde .env.example...\n');
    
    const envExamplePath = path.join(__dirname, '.env.example');
    if (fs.existsSync(envExamplePath)) {
        fs.copyFileSync(envExamplePath, envPath);
        console.log('✅ Archivo .env creado exitosamente');
    } else {
        console.log('❌ .env.example no encontrado');
    }
}

// Verificar node_modules
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
    console.log('📦 node_modules no encontrado');
    console.log('🔧 Ejecuta: npm install\n');
} else {
    console.log('✅ Dependencias encontradas\n');
}

// Mostrar instrucciones
console.log('📋 INSTRUCCIONES:');
console.log('1. Instalar dependencias: npm install');
console.log('2. Configurar .env con tus credenciales PostMark');
console.log('3. Ejecutar servidor: npm start o npm run dev');
console.log('4. Probar API: http://localhost:3000\n');

console.log('🔗 ENDPOINTS DISPONIBLES:');
console.log('• GET  /                    - Información de la API');
console.log('• GET  /api/status          - Estado del servicio');
console.log('• GET  /api/mail?from=email - Emails desde dirección');
console.log('• GET  /api/mail?to=email   - Emails hacia dirección');
console.log('• POST /api/mail            - Enviar nuevo email\n');

console.log('🔐 AUTENTICACIÓN:');
console.log('Incluye header: X-API-Key: codenotch-email-api-2025-secure-key\n');

console.log('📧 POSTMARK SETUP:');
console.log('1. Crear cuenta en https://postmarkapp.com/');
console.log('2. Obtener Server API Token');
console.log('3. Configurar dominio verificado');
console.log('4. Actualizar POSTMARK_API_TOKEN y POSTMARK_FROM_EMAIL en .env\n');

console.log('✨ ¡Todo listo para empezar!');
console.log('========================================');

// Si se pasa argumento 'start', intentar iniciar el servidor
if (process.argv.includes('start')) {
    console.log('\n🚀 Iniciando servidor...\n');
    require('./server.js');
}