# 📋 INSTRUCCIONES PARA CAPTURAS DE PANTALLA
## Proyecto Final Módulo 5 - Sistema de Museo

### 🎯 CAPTURAS REQUERIDAS SEGÚN EL PROYECTO

**IMPORTANTE**: Sigue estas instrucciones EXACTAMENTE para obtener las capturas correctas.

---

## 📊 PARTE 2: CAPTURAS DE WORKBENCH

### 🔧 PREPARACIÓN INICIAL

1. **Instalar dependencias y configurar base de datos:**
   ```powershell
   cd "c:\Codenotch\retosEvaluables\modulo5\proyectoFinalModulo5"
   npm install
   npm run setup
   ```

2. **Abrir MySQL Workbench:**
   - Conectar a tu servidor MySQL local
   - Seleccionar la base de datos `museo_db`

### 📸 CAPTURA 1: Modelo Entidad-Relación
**Archivo:** `capturas/01_modelo_er_workbench.png`

**Pasos:**
1. En Workbench, ir a `Database` → `Reverse Engineer...`
2. Seleccionar la conexión a tu servidor
3. Seleccionar la base de datos `museo_db`
4. Seguir el wizard hasta llegar al diagrama
5. **CAPTURA**: Toma screenshot del diagrama completo mostrando:
   - Todas las tablas (autores, colecciones, expositores_vitrinas, piezas, prestamos, historial_ubicaciones)
   - Las relaciones entre tablas (líneas de conexión)
   - Los campos de cada tabla

### 📸 CAPTURA 2: Consultas SQL en Workbench
**Archivo:** `capturas/02_consultas_workbench.png`

**Pasos:**
1. Abrir una nueva pestaña de consulta en Workbench
2. Ejecutar esta consulta:
   ```sql
   -- Consulta compleja: Piezas con información completa
   SELECT 
       p.codigo_pieza,
       p.nombre,
       CONCAT(a.nombre, ' ', a.apellidos) as autor,
       p.año_creacion,
       c.nombre as coleccion,
       p.ubicacion_actual,
       p.valor_estimado
   FROM piezas p
   LEFT JOIN autores a ON p.autor_id = a.id
   LEFT JOIN colecciones c ON p.coleccion_id = c.id
   ORDER BY p.valor_estimado DESC;
   ```
3. **CAPTURA**: Screenshot mostrando:
   - La consulta SQL
   - Los resultados de la consulta
   - El panel de Workbench

---

## 🌐 PARTE 3: CAPTURAS DE LA API REST

### 🚀 PREPARACIÓN

1. **Iniciar el servidor:**
   ```powershell
   cd "c:\Codenotch\retosEvaluables\modulo5\proyectoFinalModulo5"
   npm start
   ```

2. **Verificar que funciona:**
   - Abrir navegador en http://localhost:3000
   - Deberías ver la documentación de la API

### 📸 CAPTURA 3: Documentación de la API
**Archivo:** `capturas/03_api_documentacion.png`

**Pasos:**
1. Abrir http://localhost:3000 en el navegador
2. **CAPTURA**: Screenshot completo mostrando:
   - La página de documentación
   - Todos los endpoints listados
   - La información del proyecto

### 📸 CAPTURA 4: Endpoint GET /piezas
**Archivo:** `capturas/04_get_piezas.png`

**Pasos:**
1. Abrir http://localhost:3000/piezas en el navegador
2. **CAPTURA**: Screenshot mostrando:
   - La URL en la barra de direcciones
   - El JSON con la lista de todas las piezas
   - El formato de respuesta con success: true

### 📸 CAPTURA 5: Endpoint GET /piezas/:id
**Archivo:** `capturas/05_get_pieza_especifica.png`

**Pasos:**
1. Abrir http://localhost:3000/piezas/1 en el navegador
2. **CAPTURA**: Screenshot mostrando:
   - La URL específica
   - Los detalles completos de la pieza
   - Información del autor y colección

### 📸 CAPTURA 6: Endpoint GET /prestamos
**Archivo:** `capturas/06_get_prestamos.png`

**Pasos:**
1. Abrir http://localhost:3000/prestamos en el navegador
2. **CAPTURA**: Screenshot mostrando:
   - Lista de piezas en préstamo
   - Detalles de instituciones y fechas
   - Estado de los préstamos

### 📸 CAPTURA 7: Endpoint GET /colecciones
**Archivo:** `capturas/07_get_colecciones.png`

**Pasos:**
1. Abrir http://localhost:3000/colecciones en el navegador
2. **CAPTURA**: Screenshot mostrando:
   - Todas las colecciones
   - Estadísticas de piezas por colección
   - Tipos de colección

### 📸 CAPTURA 8: Pruebas con Postman (Opcional pero recomendado)
**Archivo:** `capturas/08_postman_pruebas.png`

**Pasos:**
1. Abrir Postman
2. Crear petición POST a http://localhost:3000/piezas
3. En Body (JSON) enviar:
   ```json
   {
       "codigo_pieza": "DEMO-001",
       "nombre": "Pieza de Demostración",
       "descripcion": "Obra creada para demostrar la API",
       "autor_id": 1,
       "año_creacion": 2024,
       "epoca": "Contemporáneo",
       "material": "Digital",
       "estado_conservacion": "excelente"
   }
   ```
4. **CAPTURA**: Screenshot mostrando:
   - La petición POST
   - El cuerpo JSON
   - La respuesta exitosa

---

## 📁 ORGANIZACIÓN DE CAPTURAS

Guarda todas las capturas en la carpeta `capturas/` con estos nombres exactos:

```
capturas/
├── 01_modelo_er_workbench.png
├── 02_consultas_workbench.png
├── 03_api_documentacion.png
├── 04_get_piezas.png
├── 05_get_pieza_especifica.png
├── 06_get_prestamos.png
├── 07_get_colecciones.png
└── 08_postman_pruebas.png (opcional)
```

---

## ✅ VERIFICACIÓN FINAL

Antes de entregar, verifica que tienes:

### Base de Datos ✅
- [ ] Modelo ER visible en Workbench
- [ ] Todas las tablas creadas correctamente
- [ ] Relaciones funcionando
- [ ] Datos de ejemplo cargados

### API REST ✅
- [ ] Servidor corriendo en puerto 3000
- [ ] Todos los endpoints funcionando
- [ ] Respuestas en formato JSON
- [ ] Manejo de errores

### Capturas ✅
- [ ] Todas las capturas tomadas
- [ ] Nombres de archivo correctos
- [ ] Imágenes claras y legibles
- [ ] Guardadas en carpeta `capturas/`

## 🚨 PUNTOS CRÍTICOS

1. **NO OLVIDES** tomar captura del diagrama ER en Workbench
2. **ASEGÚRATE** de que la API esté corriendo antes de las capturas
3. **VERIFICA** que todas las URLs muestren datos correctos
4. **COMPRUEBA** que los nombres de archivo sean exactos

¡Sigue estas instrucciones paso a paso y tendrás todas las capturas necesarias para el proyecto! 🎯