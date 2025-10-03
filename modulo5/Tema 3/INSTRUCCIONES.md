# 📋 INSTRUCCIONES DE SETUP - MODULO 5 TEMA 3

## ⚡ Inicio Rápido

### 1. Verificar MySQL
Asegúrate de que MySQL esté instalado y corriendo:
```powershell
# Verificar si MySQL está corriendo
Get-Service -Name "*mysql*"

# O intentar conectar
mysql -u root -p
```

### 2. Configurar Variables de Entorno
```powershell
# El archivo .env ya está creado con valores por defecto
# Edítalo si necesitas cambiar la configuración de MySQL:
notepad .env
```

### 3. Configurar Base de Datos
```powershell
# Esto creará la base de datos, tablas y datos de ejemplo
npm run setup
```

### 4. Iniciar el Servidor
```powershell
# Modo producción
npm start

# O modo development (con auto-reload)
npm run dev
```

### 5. Probar la API
```powershell
# Ejecutar todas las pruebas automatizadas
npm test
```

## 🌐 Verificación Manual

Una vez que el servidor esté corriendo, abre tu navegador en:
- http://localhost:3000 - Documentación de la API

### Pruebas rápidas con curl (PowerShell):

```powershell
# Obtener todos los alumnos
curl http://localhost:3000/alumnos

# Obtener alumno por ID
curl http://localhost:3000/alumnos/1

# Obtener media de notas
curl "http://localhost:3000/media?id=1"

# Obtener asignaturas del alumno
curl "http://localhost:3000/apuntadas?nombre=Juan%20Pérez"
```

## 🚨 Solución de Problemas

### Error: "Can't connect to MySQL"
1. Verifica que MySQL esté corriendo
2. Revisa las credenciales en el archivo `.env`
3. Asegúrate de que el usuario tenga permisos para crear bases de datos

### Error: "EADDRINUSE" (Puerto en uso)
1. Cambia el puerto en `.env`: `PORT=3001`
2. O mata el proceso que esté usando el puerto 3000

### Error: "Module not found"
```powershell
# Reinstalar dependencias
npm install
```

## 📊 Estado de la Base de Datos

Después del setup, tendrás:
- ✅ 5 alumnos de ejemplo
- ✅ 6 asignaturas
- ✅ 17 notas asignadas
- ✅ Todas las relaciones configuradas

## 🎯 Endpoints Listos

Todos los endpoints del reto están implementados y funcionando:

**Parte 1: Alumnos**
- ✅ GET /alumnos/:id
- ✅ GET /alumnos/:nombre  
- ✅ GET /alumnos
- ✅ POST /alumnos
- ✅ PUT /alumnos/:id
- ✅ DELETE /alumnos/:id

**Parte 2: Asignaturas y Notas**
- ✅ GET /media?id=5
- ✅ GET /media?nombre=Juan
- ✅ GET /apuntadas?id=5  
- ✅ GET /apuntadas?nombre=Juan

¡La API está completamente funcional y lista para usar! 🚀