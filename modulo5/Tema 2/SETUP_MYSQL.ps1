# 🚀 CONFIGURACIÓN AUTOMÁTICA DE MYSQL
# =====================================

## 📋 OPCIONES DISPONIBLES

### OPCIÓN 1: XAMPP (MÁS FÁCIL)
# 1. Descargar XAMPP: https://www.apachefriends.org/download.html
# 2. Instalar XAMPP
# 3. Iniciar Apache y MySQL desde el panel de control
# 4. Ir a http://localhost/phpmyadmin
# 5. Crear base de datos 'escuela_db'

### OPCIÓN 2: MySQL Community Server
# 1. Descargar: https://dev.mysql.com/downloads/mysql/
# 2. Instalar con configuración por defecto
# 3. Recordar la contraseña de root
# 4. Agregar MySQL al PATH del sistema

### OPCIÓN 3: Docker (Para desarrolladores)
# 1. Instalar Docker Desktop
# 2. Ejecutar: docker run -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -d mysql:8.0
# 3. Conectar con root/password

### OPCIÓN 4: Base de datos online (TEMPORAL)
# Usar db4free.net o remotemysql.com para pruebas

## 🔧 CONFIGURACIÓN RÁPIDA CON XAMPP

Write-Host "🚀 CONFIGURACIÓN MYSQL PARA MÓDULO 5" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green

Write-Host "`n📋 PASOS A SEGUIR:" -ForegroundColor Yellow
Write-Host "1. Descargar XAMPP desde: https://www.apachefriends.org/download.html" -ForegroundColor White
Write-Host "2. Instalar XAMPP (dejar opciones por defecto)" -ForegroundColor White
Write-Host "3. Abrir XAMPP Control Panel" -ForegroundColor White
Write-Host "4. Iniciar Apache y MySQL" -ForegroundColor White
Write-Host "5. Ir a http://localhost/phpmyadmin" -ForegroundColor White
Write-Host "6. Crear base de datos llamada 'escuela_db'" -ForegroundColor White

Write-Host "`n💡 ALTERNATIVA RÁPIDA:" -ForegroundColor Cyan
Write-Host "Si ya tienes una extensión MySQL en VS Code:" -ForegroundColor White
Write-Host "1. Abre la extensión MySQL" -ForegroundColor White
Write-Host "2. Crea una nueva conexión (localhost:3306)" -ForegroundColor White
Write-Host "3. Usuario: root, Contraseña: (vacía o la que configuraste)" -ForegroundColor White

Write-Host "`n🎯 UNA VEZ CONFIGURADO:" -ForegroundColor Green
Write-Host "Vuelve aquí y ejecutaremos los scripts para crear la base de datos" -ForegroundColor White