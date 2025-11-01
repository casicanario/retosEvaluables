# MÓDULO 5 - TEMA 1: MySQL con Node.js

## Descripción del Proyecto

Este proyecto implementa todas las consultas SQL requeridas para el Módulo 5 - Tema 1, que incluye la creación de un esquema de base de datos MySQL y la ejecución de diversas operaciones SQL desde una aplicación Node.js.

## � Estructura del Proyecto

```
modulo5/Tema 1/
├──  01_crear_esquema.sql          # Script para crear la base de datos y tablas
├──  02_consultas_sql.sql          # Todas las consultas SQL requeridas
├──  package.json                  # Dependencias del proyecto
├──  database.js                   # Configuración y conexión MySQL
├──  app.js                        # Aplicación interactiva principal
├──  test-connection.js            # Pruebas de conexión
├──  execute-queries.js            # Ejecución automática de consultas
├──  .env.example                  # Ejemplo de configuración
└──  README.md                     # Este archivo
```

##  Esquema de Base de Datos

La base de datos `escuela_db` contiene las siguientes tablas:

###  Tablas Principales:
- **`direccion`** - Direcciones (eliminada durante las consultas)
- **`teams`** - Equipos de estudiantes
- **`students`** - Información de estudiantes
- **`teachers`** - Información de profesores
- **`subjects`** - Asignaturas
- **`subject_teacher`** - Relación profesores-asignaturas
- **`marks`** - Notas de los estudiantes

###  Características:
- Relaciones con **Foreign Keys**
- Índices para optimización
- Datos de ejemplo realistas
- Fechas variadas para pruebas temporales

##  Instalación y Configuración

### 1.  Instalar Dependencias

```bash
npm install
```

### 2.  Configuración de Base de Datos

1. Copia el archivo de configuración:
```bash
copy .env.example .env
```

2. Edita el archivo `.env` con tus credenciales de MySQL:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password_mysql
DB_NAME=escuela_db
DB_PORT=3306
```

### 3. � Crear la Base de Datos

Ejecuta el script en MySQL Workbench o línea de comandos:
```bash
mysql -u root -p < 01_crear_esquema.sql
```

##  Uso de la Aplicación

###  Scripts Disponibles:

```bash
# Probar conexión a la base de datos
npm run test

# Ejecutar todas las consultas SQL automáticamente
npm run queries

# Iniciar aplicación interactiva
npm start

# Modo desarrollo con recarga automática
npm run dev
```

###  Aplicación Interactiva

La aplicación principal (`npm start`) ofrece un menú interactivo con:

1. ** Consultar Estudiantes**
   - Ver todos los estudiantes
   - Buscar por nombre
   - Estudiantes por equipo
   - Estadísticas

2. ** Consultar Profesores**
   - Ver todos los profesores
   - Profesores por departamento
   - Profesores mejor pagados
   - Asignaturas por profesor

3. ** Consultar Asignaturas**
   - Ver todas las asignaturas
   - Asignaturas por curso
   - Asignaturas con profesores
   - Estadísticas

4. ** Consultar Notas**
   - Ver todas las notas
   - Notas por estudiante
   - Notas por asignatura
   - Estadísticas de rendimiento

5. ** Consultar Equipos**
   - Ver todos los equipos
   - Miembros por equipo
   - Equipos más grandes
   - Crear nuevo equipo

6. ** Operaciones Avanzadas**
   - Consultas personalizadas
   - Info de la base de datos
   - Backup de datos
   - Estadísticas generales

7. ** Pruebas y Mantenimiento**
   - Probar conexión
   - Verificar integridad
   - Limpiar datos obsoletos
   - Reindexar tablas

## � Consultas SQL Implementadas

###  Parte 1: Creación del Esquema
-  Base de datos `escuela_db`
-  7 tablas con relaciones
-  Índices y optimizaciones
-  Datos de ejemplo (50+ registros por tabla)

###  Parte 2: Consultas Requeridas

1. ** Modificar tabla direccion:**
   -  Añadir columna `telefono`
   -  Eliminar columna temporal

2. ** Eliminar tabla direccion:**
   -  Actualizar referencias FK
   -  Eliminar constraints
   -  Eliminar tabla permanentemente

3. **� Actualizar notas:**
   -  Setear todas las notas a 0
   -  Actualizar notas < 5 a 5.0

4. ** Consultas de información:**
   -  Nombre y apellido de estudiantes
   -  Todos los datos de profesores

5. ** Eliminar datos antiguos:**
   -  Eliminar notas > 10 años

6. ** Verificaciones finales:**
   -  Estadísticas generales
   -  Integridad de datos

##  Funcionalidades Técnicas

### � Arquitectura:
- **Pool de conexiones** MySQL para mejor rendimiento
- **Manejo de errores** robusto
- **Transacciones** para operaciones críticas
- **Logging** detallado con colores
- **Validaciones** de entrada

###  Características:
- **Consultas parametrizadas** (SQL injection protection)
- **Estadísticas de rendimiento** 
- **Interfaz interactiva** con menús
- **Backup automático** de logs
- **Verificación de integridad**

###  Seguridad:
- Variables de entorno para credenciales
- Consultas preparadas
- Validación de entrada
- Manejo elegante de errores

##  Capturas de Pantalla

###  Menú Principal
```
 SISTEMA INTERACTIVO DE CONSULTAS SQL
Módulo 5 - Tema 1: Base de Datos Escuela
═══════════════════════════════════════════════════════════
1.  Consultar Estudiantes
2.  Consultar Profesores  
3.  Consultar Asignaturas
4.  Consultar Notas
5.  Consultar Equipos
6.  Operaciones Avanzadas
7.  Pruebas y Mantenimiento
0. � Salir
```

###  Ejemplo de Resultados
```
 RESULTADOS:
────────────────────────────────────────────────────────────
┌─────────┬─────────────────────┬─────────────────────────────┬──────────────┐
│ (index) │   nombre_completo   │           email             │    equipo    │
├─────────┼─────────────────────┼─────────────────────────────┼──────────────┤
│    0    │   'Ana García'      │   'ana.garcia@email.com'    │  'Equipo A'  │
│    1    │   'Carlos López'    │   'carlos.lopez@email.com'  │  'Equipo B'  │
└─────────┴─────────────────────┴─────────────────────────────┴──────────────┘

� Total de registros: 25
⏱  Tiempo de ejecución: 45ms
```

##  Pruebas

### � Test de Conexión
```bash
npm run test
```

Verifica:
-  Conexión a MySQL
-  Existencia de tablas
-  Integridad de datos
-  Estadísticas generales

###  Ejecución Automática
```bash
npm run queries
```

Ejecuta todas las consultas SQL requeridas automáticamente y genera un log detallado.

##  Logs y Monitoreo

La aplicación genera logs detallados:
- `execution-log.json` - Log de ejecución de consultas
- Estadísticas de tiempo de ejecución
- Conteo de registros afectados
- Mensajes de error detallados

##  Resolución de Problemas

### ❌ Error de Conexión
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Solución:** Verificar que MySQL esté ejecutándose

### ❌ Error de Autenticación
```
Error: ER_ACCESS_DENIED_ERROR
```
**Solución:** Verificar credenciales en `.env`

### ❌ Base de Datos No Existe
```
Error: Unknown database 'escuela_db'
```
**Solución:** Ejecutar `01_crear_esquema.sql` primero

### ❌ Tabla No Existe
```
Error: Table 'escuela_db.direccion' doesn't exist
```
**Solución:** Normal después de ejecutar las consultas (la tabla se elimina)

##  Objetivos Cumplidos

-  **Creación completa del esquema** con 7 tablas relacionadas
-  **Todas las consultas SQL** requeridas implementadas
-  **Aplicación Node.js** interactiva funcional
-  **Sistema de consultas** robusto y escalable
-  **Documentación completa** con ejemplos
-  **Manejo de errores** y validaciones
-  **Interfaz de usuario** intuitiva
-  **Logs y monitoreo** detallados

##  Tecnologías Utilizadas

- **Node.js** v16+
- **MySQL2** - Driver MySQL para Node.js
- **Express.js** - Framework web (futuras expansiones)
- **Colors** - Colorizado de consola
- **Dotenv** - Manejo de variables de entorno
- **Readline** - Interfaz interactiva

##  Autor

**Estudiante Codenotch**  
Módulo 5 - Tema 1: MySQL con Node.js

##  Licencia

MIT License - Proyecto educativo para Codenotch

---

 **¡Proyecto completado exitosamente!** 

Para cualquier duda o problema, revisar la documentación o contactar al instructor.
