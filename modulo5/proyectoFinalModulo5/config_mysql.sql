# 🔧 CONFIGURACIÓN RÁPIDA DE MYSQL
# Ejecuta estos comandos en MySQL Command Line o Workbench

# 1. Crear usuario si no existe (opcional)
CREATE USER IF NOT EXISTS 'museo_user'@'localhost' IDENTIFIED BY 'museo123';

# 2. Dar permisos completos
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost';
GRANT ALL PRIVILEGES ON *.* TO 'museo_user'@'localhost' IF EXISTS;

# 3. Aplicar cambios
FLUSH PRIVILEGES;

# 4. Crear base de datos
CREATE DATABASE IF NOT EXISTS museo_db;

# 5. Verificar
SHOW DATABASES;
SELECT USER();