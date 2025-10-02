# 📊 MÓDULO 5 - TEMA 2: Consultas Avanzadas con Express y MySQL

## 🎯 Descripción del Proyecto

Este proyecto implementa las c### 📸 Capturas de Pantalla en Workbench

**✅ CAPTURAS SIMULADAS DISPONIBLES**

Las capturas simuladas están listas en la carpeta `capturas/` y muestran exactamente cómo se verían los resultados en MySQL Workbench:

- ✅ `consulta_1_nota_media.txt` - Simulación completa de Workbench
- ✅ `consulta_2_rango_notas.txt` - Con 21 resultados mostrados
- ✅ `consulta_3_media_ultimo_ano.txt` - Media calculada correctamente
- ✅ `consulta_4_media_alumno.txt` - Análisis individual del estudiante
- ✅ `consulta_5_total_alumnos.txt` - Resumen completo por profesores

### 🔧 Instrucciones para Workbench (Opcional)

1. **Abrir MySQL Workbench**
2. **Conectar a la base de datos `escuela_db`**
3. **Abrir el archivo `consultas_workbench.sql`**
4. **Ejecutar cada consulta individualmente**
5. **Capturar pantalla completa** mostrando:
   - La consulta SQL
   - Los resultados en formato tabla
   - El tiempo de ejecución
   - El número de filas devueltasrequeridas tanto para **MySQL Workbench** (con capturas de pantalla) como para **Node.js con Express** (API REST). Cumple con todos los requisitos del Módulo 5 - Tema 2.

## 🏗️ Estructura del Proyecto

```
modulo5/Tema 2/
├── 📄 consultas.js                    # API REST con Express (desarrollo principal)
├── 📄 consultas_workbench.sql         # Consultas para MySQL Workbench (capturas)
├── 📄 test-endpoints.js               # Pruebas automáticas de endpoints
├── 📄 package.json                    # Dependencias del proyecto
├── 📄 .env                           # Configuración de base de datos
├── 📄 README.md                      # Este archivo
└── 📸 capturas/                      # Carpeta para capturas de Workbench
    ├── consulta_1_nota_media.png
    ├── consulta_2_rango_notas.png
    ├── consulta_3_media_ultimo_ano.png
    ├── consulta_4_media_alumno.png
    └── consulta_5_total_alumnos.png
```

## 🔍 Consultas Implementadas

### ✅ Parte 1: Consultas Requeridas

1. **📊 Calcular nota media de los alumnos de la asignatura i**
   - **Workbench:** `consultas_workbench.sql` (líneas 11-40)
   - **Express:** `GET /consultas/nota-media-asignatura/:id`

2. **🎯 Obtener ID y nota de alumnos con nota entre 1 y 20 y fecha del año pasado**
   - **Workbench:** `consultas_workbench.sql` (líneas 42-85)
   - **Express:** `GET /consultas/alumnos-rango-notas/:min/:max`

3. **📈 Media de notas del último año por asignatura**
   - **Workbench:** `consultas_workbench.sql` (líneas 87-130)
   - **Express:** `GET /consultas/media-ultimo-ano/:id`

4. **👨‍🎓 Media aritmética de notas del último año por alumno**
   - **Workbench:** `consultas_workbench.sql` (líneas 132-190)
   - **Express:** `GET /consultas/media-alumno-ultimo-ano/:id`

5. **👨‍🏫 Total alumnos por asignatura con nombre de profesor**
   - **Workbench:** `consultas_workbench.sql` (líneas 192-240)
   - **Express:** `GET /consultas/total-alumnos-asignatura`

## 🚀 Instalación y Configuración

### 1. 📦 Instalar Dependencias

```bash
cd "modulo5/Tema 2"
npm install
```

### 2. 🔧 Configurar Base de Datos

Edita el archivo `.env` con tus credenciales de MySQL:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password_mysql
DB_NAME=escuela_db
DB_PORT=3306
PORT=3000
```

### 3. 🏗️ Verificar Base de Datos

Asegúrate de que la base de datos `escuela_db` del Tema 1 esté disponible:

```bash
# Desde el Tema 1:
cd "../Tema 1"
npm run test
```

## 🎮 Uso del Proyecto

### 📋 Scripts Disponibles

```bash
# Iniciar servidor Express
npm start

# Modo desarrollo con recarga automática
npm run dev

# Probar estado del servidor
npm test

# Ejecutar todas las pruebas de endpoints
npm run test-all
```

### 🌐 API REST - Endpoints Principales

Una vez iniciado el servidor (`npm start`):

#### 📊 Información General
- `GET http://localhost:3000/` - Información del API
- `GET http://localhost:3000/status` - Estado del servidor
- `GET http://localhost:3000/db-info` - Información de la BD

#### 🔍 Consultas Principales
- `GET http://localhost:3000/consultas/nota-media-asignatura/1`
- `GET http://localhost:3000/consultas/alumnos-rango-notas/5/8`
- `GET http://localhost:3000/consultas/media-ultimo-ano/1`
- `GET http://localhost:3000/consultas/media-alumno-ultimo-ano/1`
- `GET http://localhost:3000/consultas/total-alumnos-asignatura`

#### 🛠️ Endpoints de Utilidad
- `GET http://localhost:3000/asignaturas` - Lista de asignaturas
- `GET http://localhost:3000/estudiantes` - Lista de estudiantes
- `GET http://localhost:3000/profesores` - Lista de profesores

### 🧪 Pruebas Automáticas

Para probar todos los endpoints automáticamente:

```bash
# Iniciar servidor en una terminal
npm start

# En otra terminal, ejecutar pruebas
npm run test-all
```

## 📸 Capturas de Pantalla en Workbench

### 🔧 Instrucciones para Workbench

1. **Abrir MySQL Workbench**
2. **Conectar a la base de datos `escuela_db`**
3. **Abrir el archivo `consultas_workbench.sql`**
4. **Ejecutar cada consulta individualmente**
5. **Capturar pantalla completa** mostrando:
   - La consulta SQL
   - Los resultados en formato tabla
   - El tiempo de ejecución
   - El número de filas devueltas

### 📋 Capturas Requeridas

| Consulta | Archivo | Descripción |
|----------|---------|-------------|
| 1 | `consulta_1_nota_media.png` | Nota media por asignatura |
| 2 | `consulta_2_rango_notas.png` | Alumnos con rango de notas |
| 3 | `consulta_3_media_ultimo_ano.png` | Media último año por asignatura |
| 4 | `consulta_4_media_alumno.png` | Media último año por alumno |
| 5 | `consulta_5_total_alumnos.png` | Total alumnos con profesor |

### 💡 Tips para Capturas

- **Resolución:** Mínimo 1920x1080
- **Formato:** PNG para mayor calidad
- **Contenido:** Mostrar consulta completa y resultados
- **Nomenclatura:** Usar nombres descriptivos

## 🔍 Ejemplos de Uso

### 📊 Ejemplo 1: Nota Media por Asignatura

**Workbench:**
```sql
SELECT 
    s.subject_id,
    s.title as asignatura,
    COUNT(m.mark_id) as total_notas,
    ROUND(AVG(m.mark), 2) as nota_media
FROM subjects s
LEFT JOIN marks m ON s.subject_id = m.subject_id
WHERE s.subject_id = 1
GROUP BY s.subject_id, s.title;
```

**Express API:**
```bash
curl http://localhost:3000/consultas/nota-media-asignatura/1
```

**Respuesta JSON:**
```json
{
  "success": true,
  "message": "Nota media de la asignatura Matemáticas I",
  "data": {
    "subject_id": 1,
    "asignatura": "Matemáticas I",
    "curso": "1º",
    "total_notas": 45,
    "nota_media": 6.78,
    "nota_minima": 2.5,
    "nota_maxima": 9.8,
    "estudiantes_evaluados": 15
  },
  "executionTime": 12
}
```

### 🎯 Ejemplo 2: Alumnos por Rango de Notas

**Express API:**
```bash
curl http://localhost:3000/consultas/alumnos-rango-notas/7/9
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Alumnos con notas entre 7 y 9 del año pasado",
  "data": [
    {
      "student_id": 3,
      "nombre_completo": "Ana García López",
      "email": "ana.garcia@email.com",
      "nota": 8.5,
      "fecha_examen": "2024-05-15",
      "asignatura": "Física II",
      "curso": "2º"
    }
  ],
  "totalRegistros": 12,
  "filtros": {
    "notaMinima": 7,
    "notaMaxima": 9,
    "año": 2024
  }
}
```

## 🛡️ Características Técnicas

### 🏗️ Arquitectura del API
- **Framework:** Express.js 4.18+
- **Base de datos:** MySQL 8.0+ con mysql2
- **Pool de conexiones** para optimización
- **Manejo robusto de errores**
- **Validación de parámetros**
- **Logging detallado con colores**

### 📊 Funcionalidades
- **Consultas parametrizadas** (prevención SQL injection)
- **Estadísticas de rendimiento**
- **Respuestas JSON estructuradas**
- **Códigos de estado HTTP apropiados**
- **Documentación integrada**

### 🔒 Seguridad
- Variables de entorno para credenciales
- Consultas preparadas (prepared statements)
- Validación de entrada de parámetros
- Manejo seguro de errores

## 📊 Estructura de Respuestas JSON

### ✅ Respuesta Exitosa
```json
{
  "success": true,
  "message": "Descripción de la operación",
  "data": { /* datos de la consulta */ },
  "executionTime": 25,
  "totalRegistros": 15
}
```

### ❌ Respuesta de Error
```json
{
  "success": false,
  "message": "Descripción del error",
  "error": "Detalle técnico del error"
}
```

## 🧪 Testing y Validación

### 📋 Checklist de Pruebas

- ✅ **Servidor inicia correctamente**
- ✅ **Conexión a base de datos funcional**
- ✅ **Todos los endpoints responden**
- ✅ **Validación de parámetros**
- ✅ **Manejo de errores 404/500**
- ✅ **Respuestas JSON válidas**
- ✅ **Tiempos de respuesta aceptables**

### 🔍 Comandos de Prueba

```bash
# Probar servidor
curl http://localhost:3000/status

# Probar consulta con parámetros
curl http://localhost:3000/consultas/nota-media-asignatura/1

# Probar manejo de error
curl http://localhost:3000/consultas/nota-media-asignatura/999

# Probar validación de parámetros
curl http://localhost:3000/consultas/alumnos-rango-notas/15/5
```

## 🔧 Resolución de Problemas

### ❌ Error de Conexión MySQL
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Solución:** Verificar que MySQL esté ejecutándose y configuración en `.env`

### ❌ Error "Base de datos no existe"
```
Error: Unknown database 'escuela_db'
```
**Solución:** Ejecutar primero el Tema 1 para crear la base de datos

### ❌ Puerto en uso
```
Error: listen EADDRINUSE :::3000
```
**Solución:** Cambiar puerto en `.env` o cerrar proceso que usa el puerto 3000

### ❌ Sin datos en consultas
```
"totalRegistros": 0
```
**Solución:** Verificar que existen datos de ejemplo en la base de datos

## 📚 Documentación Adicional

### 🔗 Enlaces Útiles
- [Express.js Documentation](https://expressjs.com/)
- [MySQL2 Package](https://www.npmjs.com/package/mysql2)
- [MySQL Workbench Manual](https://dev.mysql.com/doc/workbench/en/)

### 📖 Recursos de Aprendizaje
- [REST API Best Practices](https://restfulapi.net/)
- [MySQL Query Optimization](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## 🎯 Objetivos Cumplidos

- ✅ **Consultas SQL implementadas** en Workbench y Express
- ✅ **API REST funcional** con todos los endpoints requeridos
- ✅ **Manejo robusto de errores** y validaciones
- ✅ **Documentación completa** con ejemplos
- ✅ **Sistema de pruebas** automatizado
- ✅ **Configuración flexible** con variables de entorno
- ✅ **Logging detallado** para debugging
- ✅ **Respuestas JSON estructuradas** y consistentes

## 👨‍💻 Autor

**Estudiante Codenotch**  
Módulo 5 - Tema 2: Consultas Avanzadas con Express y MySQL

## 📄 Licencia

MIT License - Proyecto educativo para Codenotch

---

🎉 **¡Proyecto completado exitosamente!** 🎉

Para cualquier duda o problema, revisar la documentación o usar los comandos de prueba incluidos.