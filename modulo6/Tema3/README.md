# Sistema de Agregaciones MongoDB

Este proyecto implementa un sistema completo de agregaciones utilizando MongoDB para gestión de calificaciones estudiantiles.

## Descripción

Sistema desarrollado para el Módulo 6 - Tema 3: Agregaciones, que incluye consultas avanzadas utilizando el framework de agregación de MongoDB con pipelines de procesamiento de datos.

## Tecnologías Utilizadas

- Node.js: Entorno de ejecución
- MongoDB: Base de datos NoSQL
- MongoDB Driver: Driver oficial para Node.js
- Framework de Agregación de MongoDB

## Estructura del Proyecto

```
Tema3/
├── Capturas/             # Capturas de pantalla de las consultas
├── crear-datos.js        # Script para crear datos de prueba
├── database.js           # Conexión a MongoDB
├── reto1.js             # Implementación del Reto 1
├── reto2.js             # Implementación del Reto 2
├── index.js             # Archivo principal
├── package.json         # Configuración del proyecto
├── .env                 # Variables de entorno
├── .gitignore           # Archivos ignorados por Git
└── README.md            # Documentación
```

## Instalación y Configuración

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Configurar MongoDB Atlas**:
   - Editar el archivo `.env` con tu cadena de conexión
   - La configuración por defecto usa la base de datos `marks_db`

3. **Crear datos de prueba**:
   ```bash
   node crear-datos.js
   ```

## Estructura de Datos

### Colección: marks
```javascript
{
    student_first_name: String,    // Nombre del estudiante
    student_last_name: String,     // Apellido del estudiante  
    subject: String,               // Asignatura
    mark: Number,                  // Calificación (0-10)
    date: Date,                    // Fecha de la calificación
    group_name: String,            // Grupo del estudiante
    teachers: [                    // Array de profesores
        {
            teacher_first_name: String,
            teacher_last_name: String
        }
    ]
}
```

### Colección: teachers
```javascript
{
    teacher_first_name: String,    // Nombre del profesor
    teacher_last_name: String      // Apellido del profesor
}
```

## Retos Implementados

### Reto 1: Consultas Básicas de Agregación

```bash
npm run reto1
```

1. **Calcular nota media de una asignatura concreta**
   - Pipeline: `$match` → `$group` → `$avg`

2. **Total de alumnos por asignatura (incluyendo repetidos)**
   - Pipeline: `$group` → `$sum` → `$sort`

3. **Listar nombres y apellidos de todos los alumnos**
   - Pipeline: `$project` → `$concat`

4. **Alumnos por grupo en orden inverso alfabético**
   - Pipeline: `$group` → `$sum` → `$sort` (descendente)

5. **Top 5 asignaturas con nota media mayor que 5**
   - Pipeline: `$group` → `$avg` → `$match` → `$sort` → `$limit`

6. **Número de profesores por asignatura (incluyendo repetidos)**
   - Pipeline: `$unwind` → `$group` → `$sum`

### Reto 2: Consultas Avanzadas de Agregación

```bash
npm run reto2
```

1. **Nota media con condiciones específicas**
   - Condición: nota > 8 OR fecha de año pasado o anterior
   - Pipeline: `$match` (con `$or`) → `$group` → `$avg`

2. **Media de notas del último año por alumno**
   - Pipeline: `$match` (fechas 2025) → `$group` → `$avg`

3. **Media aritmética del último año por alumno**
   - Pipeline: `$match` → `$group` → `$push` → `$avg` → `$size`

4. **Alumnos y asignaturas de profesor específico**
   - Pipeline: `$match` (profesor) → `$group` → `$addToSet` → `$size`

## Operadores de Agregación Utilizados

### Operadores de Etapa
- `$match`: Filtrado de documentos
- `$group`: Agrupación de documentos
- `$project`: Proyección de campos
- `$sort`: Ordenación de resultados
- `$limit`: Limitación de resultados
- `$unwind`: Desenrollado de arrays

### Operadores de Expresión
- `$avg`: Promedio aritmético
- `$sum`: Suma total
- `$concat`: Concatenación de strings
- `$addToSet`: Array de valores únicos
- `$push`: Array de todos los valores
- `$size`: Tamaño de array
- `$round`: Redondeo de números

### Operadores de Comparación
- `$gt`: Mayor que
- `$gte`: Mayor o igual que
- `$lt`: Menor que
- `$or`: Operador OR lógico

## Ejemplos de Uso

### Ejecutar todos los retos:
```bash
npm start
```

### Ejecutar reto específico:
```bash
npm run reto1    # Solo Reto 1
npm run reto2    # Solo Reto 2
```

### Recrear datos de prueba:
```bash
node crear-datos.js
```

## Datos de Prueba

El sistema incluye:
- 4 profesores
- 14 calificaciones
- 4 asignaturas: Matemáticas, Historia, Física, Química
- 3 grupos: A, B, C
- Fechas variadas en 2025 y algunas en 2024

## Variables de Entorno

```
MONGODB_URI=mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/marks_db?retryWrites=true&w=majority
DATABASE_NAME=marks_db
MARKS_COLLECTION=marks
TEACHERS_COLLECTION=teachers
```

## Correspondencia SQL-MongoDB

| SQL | MongoDB Aggregation |
|-----|-------------------|
| WHERE | $match |
| SELECT | $project |
| GROUP BY | $group |
| COUNT() | $sum: 1 |
| AVG() | $avg |
| ORDER BY | $sort |
| LIMIT | $limit |
| HAVING | $match (después de $group) |

## Notas Importantes

- Todas las consultas utilizan el framework de agregación de MongoDB
- Los pipelines procesan datos en etapas secuenciales
- Se incluyen validaciones y manejo de errores
- Los resultados se muestran formateados para mejor legibilidad
- Las fechas están configuradas para el año 2025