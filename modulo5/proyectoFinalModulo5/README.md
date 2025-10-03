# 🏛️ PROYECTO FINAL MÓDULO 5 - SISTEMA DE GESTIÓN DE MUSEO

## 📋 Descripción del Proyecto

Sistema completo de base de datos para almacenar las piezas de un museo, implementando:

- **Base de datos MySQL** con diseño normalizado
- **API REST completa** con Node.js y Express
- **Gestión integral** de piezas, autores, colecciones y préstamos
- **Interfaz de consultas** para Workbench
- **Documentación completa** y pruebas automatizadas

## 🎯 Funcionalidades Implementadas

### 🗄️ Base de Datos (Parte 1)
- ✅ **Autores**: Información completa de artistas con datos personales y profesionales
- ✅ **Colecciones**: Gestión de colecciones permanentes, itinerantes y almacenadas
- ✅ **Expositores/Vitrinas**: Control de ubicaciones y espacios de exposición
- ✅ **Piezas**: Catálogo principal con información detallada
- ✅ **Préstamos**: Gestión completa de préstamos con fechas y responsables
- ✅ **Historial**: Trazabilidad completa de movimientos de piezas

### 🔍 Modelo Workbench (Parte 2)
- ✅ **Diseño Normalizado**: Modelo entidad-relación completo
- ✅ **Relaciones**: Claves foráneas y constraints de integridad
- ✅ **Índices**: Optimización para consultas frecuentes
- ✅ **Vistas**: Consultas predefinidas para reportes
- ✅ **Identificadores Únicos**: Cada pieza y autor con ID único

### 🌐 API REST (Parte 3)
- ✅ **Estructura Modular**: Organización clara en carpeta `apirest/`
- ✅ **Endpoints Completos**: Todos los CRUD necesarios
- ✅ **Consultas Avanzadas**: Filtros y búsquedas especializadas
- ✅ **Manejo de Errores**: Respuestas consistentes y informativas
- ✅ **Documentación**: API autodocumentada

## 📊 Estructura de la Base de Datos

### Tablas Principales

#### 👨‍🎨 `autores`
```sql
- id (PRIMARY KEY)
- nombre, apellidos
- email, direccion, telefono
- nacionalidad
- fecha_nacimiento, fecha_muerte
- biografia, estilo_artistico
```

#### 🏛️ `colecciones`
```sql
- id (PRIMARY KEY)
- nombre (UNIQUE)
- descripcion
- tipo_coleccion (permanente/itinerante/almacenada)
- fecha_inicio, fecha_fin
- ubicacion, responsable_id
```

#### 🖼️ `piezas` (Tabla Central)
```sql
- id (PRIMARY KEY)
- codigo_pieza (UNIQUE)
- nombre, descripcion
- autor_id (FK → autores)
- año_creacion, epoca
- material, tecnica, dimensiones
- estado_conservacion, valor_estimado
- ubicacion_actual, coleccion_id (FK)
- expositor_vitrina_id (FK)
```

#### 🏢 `prestamos`
```sql
- id (PRIMARY KEY)
- pieza_id (FK → piezas)
- institucion_prestamo
- responsable_nombre, email, telefono
- fechas de préstamo y devolución
- estado, condiciones, seguro_valor
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v14 o superior)
- MySQL Server (v8.0 o superior)
- MySQL Workbench (para el modelado)
- npm

### Instalación Rápida

1. **Clonar y acceder al proyecto:**
   ```powershell
   cd "c:\Codenotch\retosEvaluables\modulo5\proyectoFinalModulo5"
   ```

2. **Instalar dependencias:**
   ```powershell
   npm install
   ```

3. **Configurar variables de entorno:**
   ```powershell
   # El archivo .env ya está configurado con valores por defecto
   # Edítalo si necesitas cambiar credenciales de MySQL
   ```

4. **Configurar base de datos:**
   ```powershell
   npm run setup
   ```
   
   Este comando:
   - Crea la base de datos `museo_db`
   - Ejecuta el script SQL completo
   - Carga datos de ejemplo (6 autores, 5 colecciones, 6 piezas)

5. **Iniciar la API:**
   ```powershell
   npm start
   ```

6. **Probar el sistema:**
   ```powershell
   npm test
   ```

## 🌐 Endpoints de la API

### 🖼️ Gestión de Piezas
- `GET /piezas` - Listar todas las piezas del museo
- `GET /piezas/:id` - Obtener detalles de una pieza específica  
- `POST /piezas` - Crear una nueva pieza en la colección
- `PUT /piezas/:id` - Actualizar los detalles de una pieza
- `DELETE /piezas/:id` - Eliminar una pieza del sistema

### 🏢 Gestión de Préstamos
- `GET /prestamos` - Obtener listado de piezas en préstamo con detalles del dueño y fechas

### 🏛️ Gestión de Colecciones  
- `GET /colecciones` - Listar todas las colecciones y sus piezas
- `GET /colecciones?tipo=permanente` - Filtrar por tipo de colección

### 📊 Consultas Adicionales
- `GET /autores` - Listar todos los autores
- `GET /estadisticas` - Estadísticas generales del museo

## 📸 Capturas de Pantalla Requeridas

📁 **Ubicación**: `capturas/`

### Para Workbench:
1. `01_modelo_er_workbench.png` - Diagrama entidad-relación completo
2. `02_consultas_workbench.png` - Consultas SQL ejecutadas

### Para API REST:
3. `03_api_documentacion.png` - Página principal de la API
4. `04_get_piezas.png` - Endpoint GET /piezas
5. `05_get_pieza_especifica.png` - Endpoint GET /piezas/:id  
6. `06_get_prestamos.png` - Endpoint GET /prestamos
7. `07_get_colecciones.png` - Endpoint GET /colecciones

📋 **Ver instrucciones detalladas**: `capturas/INSTRUCCIONES_CAPTURAS.md`

## 🧪 Datos de Ejemplo

El sistema incluye datos realistas de ejemplo:

### Autores
- Pablo Picasso, Vincent van Gogh, Leonardo da Vinci
- Claude Monet, Francisco Goya, Salvador Dalí

### Piezas Destacadas
- Las Señoritas de Avignon (Picasso)
- La Noche Estrellada (van Gogh)  
- La Gioconda - Copia (da Vinci)
- Nenúfares (Monet)
- El Tres de Mayo (Goya)
- La Persistencia de la Memoria (Dalí)

### Colecciones
- Arte Moderno Europeo (permanente)
- Impresionistas Franceses (itinerante)
- Maestros del Renacimiento (permanente)
- Surrealismo Español (itinerante)

## 📁 Estructura del Proyecto

```
proyectoFinalModulo5/
├── 01_crear_base_datos.sql    # Script completo de base de datos
├── setup-database.js          # Configurador automático
├── test-endpoints.js          # Pruebas automatizadas
├── package.json               # Dependencias y scripts
├── .env                       # Variables de entorno
├── .env.example              # Plantilla de configuración
├── README.md                 # Este archivo
├── apirest/                  # API REST modular
│   └── app.js               # Servidor principal
└── capturas/                # Capturas de pantalla
    ├── INSTRUCCIONES_CAPTURAS.md
    └── [archivos .png]
```

## 🔧 Scripts Disponibles

- `npm start` - Inicia la API en producción
- `npm run dev` - Inicia con nodemon (desarrollo)
- `npm run setup` - Configura la base de datos
- `npm test` - Ejecuta pruebas automatizadas
- `npm run workbench` - Abre MySQL CLI

## 🎯 Características Destacadas

### ✨ Funcionalidades Avanzadas
- **Trazabilidad completa** de ubicaciones de piezas
- **Gestión de préstamos** con fechas y responsables
- **Estados de conservación** y valoración económica
- **Filtros por tipo** de colección
- **Estadísticas en tiempo real**

### 🔒 Integridad de Datos
- Claves foráneas con CASCADE y SET NULL
- Campos únicos para códigos e inventarios
- Validaciones en base de datos y API
- Constraints de fechas y estados

### 📈 Optimización
- Índices en campos de búsqueda frecuente
- Vistas predefinidas para consultas complejas
- Consultas eficientes con JOINs optimizados

## 🌐 Acceso y Uso

### Navegador Web
- **Documentación**: http://localhost:3000
- **Todas las piezas**: http://localhost:3000/piezas
- **Préstamos**: http://localhost:3000/prestamos
- **Estadísticas**: http://localhost:3000/estadisticas

### Postman/Herramientas API
Importa la colección o usa las URLs directamente para:
- Crear nuevas piezas (POST)
- Actualizar información (PUT)
- Eliminar registros (DELETE)

## ⚠️ Notas Importantes

1. **MySQL**: Debe estar corriendo antes de iniciar
2. **Puerto 3000**: Asegúrate de que esté libre
3. **Capturas**: Sigue las instrucciones exactas del archivo `INSTRUCCIONES_CAPTURAS.md`
4. **Workbench**: Necesario para generar el diagrama ER

## 🎓 Cumplimiento del Proyecto

✅ **Parte 1 - Diseño BD**: Base de datos completa con todas las entidades
✅ **Parte 2 - Workbench**: Modelo ER y consultas implementadas  
✅ **Parte 3 - API REST**: Estructura modular con todos los endpoints
✅ **Parte 4 - Entrega**: Proyecto en rama específica con documentación

---

## 🏛️ ¡Sistema de Museo Completamente Funcional!

Este proyecto implementa un sistema profesional de gestión museística con todas las funcionalidades requeridas, listo para ser utilizado en un entorno real. 

**🚀 Para comenzar**: `npm run setup && npm start`