# 🚀 INSTRUCCIONES DE CONFIGURACIÓN E INSTALACIÓN

## ⚠️ REQUISITOS PREVIOS

Antes de ejecutar la aplicación, necesitas tener instalado y configurado:

### 1. 📦 MySQL Server
- **Descargar:** https://dev.mysql.com/downloads/mysql/
- **Instalar:** MySQL Server 8.0 o superior
- **Configurar:** Usuario root con contraseña (o sin contraseña)

### 2. 🛠️ MySQL Workbench (Opcional pero recomendado)
- **Descargar:** https://dev.mysql.com/downloads/workbench/
- **Usar para:** Ejecutar scripts SQL visualmente

## 🔧 CONFIGURACIÓN PASO A PASO

### Paso 1: Verificar MySQL
```bash
# Verificar que MySQL esté ejecutándose
mysql --version

# Conectar a MySQL
mysql -u root -p
```

### Paso 2: Configurar Credenciales
Edita el archivo `.env` con tus credenciales de MySQL:

```env
# Configuración de la base de datos MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password_aqui    # ⚠️ CAMBIAR ESTO
DB_NAME=escuela_db
DB_PORT=3306
```

### Paso 3: Crear Base de Datos
Tienes 2 opciones:

#### Opción A: MySQL Workbench (Recomendado)
1. Abrir MySQL Workbench
2. Conectar a tu servidor local
3. Abrir el archivo `01_crear_esquema.sql`
4. Ejecutar todo el script (⚡ botón)

#### Opción B: Línea de Comandos
```bash
# Crear la base de datos
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS escuela_db;"

# Ejecutar el script de esquema
mysql -u root -p escuela_db < 01_crear_esquema.sql
```

### Paso 4: Verificar Instalación
```bash
# Probar conexión
npm run test

# Si funciona, deberías ver:
# ✅ Pool de conexiones MySQL creado exitosamente
# ✅ Conexión a MySQL exitosa
```

## 🎮 EJECUTAR LA APLICACIÓN

### Scripts Disponibles:

```bash
# 🧪 Probar conexión (EJECUTAR PRIMERO)
npm run test

# 🏗️ Instalar base de datos automáticamente
npm run install-db

# 🚀 Ejecutar todas las consultas SQL
npm run queries

# 📱 Aplicación interactiva
npm start

# 🔧 Desarrollo con recarga automática
npm run dev
```

## 🔍 RESOLUCIÓN DE PROBLEMAS

### ❌ Error: "Access denied for user 'root'"
**Causa:** Contraseña incorrecta en `.env`
**Solución:** Verificar contraseña de MySQL

### ❌ Error: "Can't connect to MySQL server"
**Causa:** MySQL no está ejecutándose
**Solución:** 
```bash
# Windows
net start mysql

# macOS
brew services start mysql

# Linux
sudo service mysql start
```

### ❌ Error: "Unknown database 'escuela_db'"
**Causa:** Base de datos no existe
**Solución:** Ejecutar `01_crear_esquema.sql` primero

### ❌ Error: "Table doesn't exist"
**Causa:** Esquema no se creó correctamente
**Solución:** Re-ejecutar el script de esquema

## 📊 VERIFICAR QUE TODO FUNCIONA

### Test de Conexión Exitoso:
```
🧪 INICIANDO PRUEBAS DE CONEXIÓN MYSQL
==================================================
✅ Pool de conexiones MySQL creado exitosamente
🔗 Conexión a MySQL exitosa:
   📍 Host: localhost:3306
   🏷️  Base de datos: escuela_db
   👤 Usuario: root
   ⏰ Fecha/Hora: 2025-01-02 14:30:45

📊 INFORMACIÓN DE LA BASE DE DATOS:
   🏷️  Nombre: escuela_db
   🔤 Charset: utf8mb4
   📝 Collation: utf8mb4_0900_ai_ci
   📊 Total de tablas: 7
```

### Tablas Esperadas:
- ✅ `direccion` (será eliminada por las consultas)
- ✅ `students` 
- ✅ `teachers`
- ✅ `subjects`
- ✅ `teams`
- ✅ `subject_teacher`
- ✅ `marks`

## 🎯 ORDEN DE EJECUCIÓN RECOMENDADO

1. **Configurar MySQL y .env**
2. **`npm run test`** - Verificar conexión
3. **`npm run install-db`** - Instalar esquema (si es necesario)
4. **`npm run queries`** - Ejecutar todas las consultas SQL requeridas
5. **`npm start`** - Usar la aplicación interactiva

## 📱 USANDO LA APLICACIÓN INTERACTIVA

Una vez que todo funcione, `npm start` te mostrará:

```
📱 SISTEMA INTERACTIVO DE CONSULTAS SQL
Módulo 5 - Tema 1: Base de Datos Escuela
═══════════════════════════════════════════════════════════
1. 👥 Consultar Estudiantes
2. 👨‍🏫 Consultar Profesores  
3. 📚 Consultar Asignaturas
4. 📊 Consultar Notas
5. 👥 Consultar Equipos
6. 🔧 Operaciones Avanzadas
7. 🧪 Pruebas y Mantenimiento
0. 🚪 Salir
```

## 🎉 ¡ÉXITO!

Si ves el menú anterior, ¡todo está funcionando correctamente! 

Puedes navegar por las diferentes opciones para:
- Ver datos de estudiantes, profesores, asignaturas
- Ejecutar consultas personalizadas
- Ver estadísticas de rendimiento
- Crear nuevos registros
- Y mucho más...

---

💡 **Consejo:** Si tienes problemas, revisa siempre:
1. ¿MySQL está ejecutándose?
2. ¿Las credenciales en `.env` son correctas?
3. ¿La base de datos `escuela_db` existe?
4. ¿Las tablas se crearon correctamente?