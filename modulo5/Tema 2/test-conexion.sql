-- ===================================================
-- 🧪 PRUEBA DE CONEXIÓN MYSQL
-- ===================================================
-- 
-- Ejecuta estas consultas una por una en VS Code
-- para verificar que la conexión funciona
--

-- 1. Verificar versión de MySQL
SELECT VERSION() as MySQL_Version;

-- 2. Mostrar bases de datos existentes
SHOW DATABASES;

-- 3. Verificar usuario actual
SELECT USER() as Current_User;

-- 4. Mostrar hora del servidor
SELECT NOW() as Server_Time;

-- ===================================================
-- 🎯 SI TODO FUNCIONA, CONTINÚA CON:
-- ===================================================
-- 
-- 1. Ejecutar: crear_base_datos.sql (completo)
-- 2. Usar: consultas_workbench.sql (una por una para capturas)
--