# 📸 GUÍA COMPLETA PARA CAPTURAS DE PANTALLA
## Proyecto Final Módulo 5 - Sistema de Museo

### 🚨 IMPORTANTE: Sigue estos pasos EXACTAMENTE para obtener todas las capturas requeridas

---

## 🔧 PASO 1: CONFIGURACIÓN INICIAL

### 1.1 Configurar MySQL
1. **Asegúrate de que MySQL esté corriendo**:
   ```powershell
   # Verificar servicios MySQL
   Get-Service -Name "*mysql*"
   ```

2. **Configurar credenciales en .env**:
   ```powershell
   cd "c:\Codenotch\retosEvaluables\modulo5\proyectoFinalModulo5"
   notepad .env
   ```
   
   **Edita el archivo .env con tus credenciales:**
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=tu_password_mysql
   DB_NAME=museo_db
   PORT=3000
   ```

### 1.2 Configurar la base de datos
```powershell
npm run setup
```

### 1.3 Iniciar la API
```powershell
npm start
```

---

## 📊 PASO 2: CAPTURAS DE WORKBENCH (PARTE 2)

### 📸 CAPTURA 1: Modelo Entidad-Relación
**Archivo: `capturas/01_modelo_er_workbench.png`**

**Pasos detallados:**
1. Abrir **MySQL Workbench**
2. Conectar a tu servidor MySQL
3. Ir a **Database** → **Reverse Engineer...**
4. Seleccionar tu conexión MySQL
5. **Next** → **Next**
6. Seleccionar la base de datos **`museo_db`**
7. **Next** → **Next** → **Next**
8. En la pantalla del diagrama:
   - Asegúrate de que todas las tablas estén visibles
   - Organiza las tablas para que se vean las relaciones
   - **TOMAR CAPTURA** del diagrama completo

**Debe mostrar:**
- ✅ Tabla `autores`
- ✅ Tabla `colecciones`
- ✅ Tabla `expositores_vitrinas`
- ✅ Tabla `piezas` (central)
- ✅ Tabla `prestamos`
- ✅ Tabla `historial_ubicaciones`
- ✅ Líneas de relación entre tablas

### 📸 CAPTURA 2: Consultas SQL en Workbench
**Archivo: `capturas/02_consultas_workbench.png`**

**Pasos:**
1. En Workbench, abrir nueva pestaña de consulta
2. Copiar y ejecutar esta consulta:
   ```sql
   USE museo_db;
   
   SELECT 
       p.codigo_pieza,
       p.nombre AS pieza,
       CONCAT(a.nombre, ' ', a.apellidos) AS autor,
       a.nacionalidad,
       p.año_creacion,
       p.epoca,
       p.ubicacion_actual,
       p.valor_estimado
   FROM piezas p
   LEFT JOIN autores a ON p.autor_id = a.id
   ORDER BY p.valor_estimado DESC;
   ```
3. **TOMAR CAPTURA** mostrando:
   - La consulta SQL completa
   - Los resultados de la consulta
   - Panel de Workbench con la base de datos `museo_db`

---

## 🌐 PASO 3: CAPTURAS DE LA API REST (PARTE 3)

**REQUISITO:** El servidor debe estar corriendo en http://localhost:3000

### 📸 CAPTURA 3: Documentación de la API
**Archivo: `capturas/03_api_documentacion.png`**

1. Abrir navegador en: **http://localhost:3000**
2. **TOMAR CAPTURA** de la página completa mostrando:
   - Título del proyecto
   - Lista de todos los endpoints
   - Información de la base de datos
   - Status "Funcionando correctamente ✅"

### 📸 CAPTURA 4: Endpoint GET /piezas
**Archivo: `capturas/04_get_piezas.png`**

1. Abrir: **http://localhost:3000/piezas**
2. **TOMAR CAPTURA** mostrando:
   - URL completa en la barra de direcciones
   - JSON con "success": true
   - Array "data" con las piezas
   - Información de autores y colecciones

### 📸 CAPTURA 5: Endpoint GET /piezas/:id
**Archivo: `capturas/05_get_pieza_especifica.png`**

1. Abrir: **http://localhost:3000/piezas/1**
2. **TOMAR CAPTURA** mostrando:
   - URL específica con ID
   - Detalles completos de una pieza
   - Información del autor
   - Datos de la colección

### 📸 CAPTURA 6: Endpoint GET /prestamos
**Archivo: `capturas/06_get_prestamos.png`**

1. Abrir: **http://localhost:3000/prestamos**
2. **TOMAR CAPTURA** mostrando:
   - Lista de piezas en préstamo
   - Información de instituciones
   - Fechas de préstamo y devolución
   - Datos de responsables

### 📸 CAPTURA 7: Endpoint GET /colecciones
**Archivo: `capturas/07_get_colecciones.png`**

1. Abrir: **http://localhost:3000/colecciones**
2. **TOMAR CAPTURA** mostrando:
   - Lista de todas las colecciones
   - Tipos de colección (permanente, itinerante, almacenada)
   - Estadísticas de piezas por colección
   - Valores promedio

### 📸 CAPTURA 8: Filtro por tipo de colección
**Archivo: `capturas/08_colecciones_filtradas.png`**

1. Abrir: **http://localhost:3000/colecciones?tipo=permanente**
2. **TOMAR CAPTURA** mostrando:
   - URL con parámetro de filtro
   - Solo colecciones permanentes
   - Campo "filtro": "permanente"

---

## 🛠️ PASO 4: SOLUCIÓN DE PROBLEMAS

### Si MySQL no conecta:
```powershell
# Verificar MySQL corriendo
Get-Service -Name "*mysql*"

# Si no está corriendo, iniciarlo
Start-Service -Name "MySQL80" # (o el nombre de tu servicio)
```

### Si el puerto 3000 está ocupado:
```powershell
# Cambiar puerto en .env
# PORT=3001
```

### Si no aparecen datos:
```powershell
# Ejecutar el setup nuevamente
npm run setup
```

---

## 📁 VERIFICACIÓN FINAL

**Ubicación de capturas:** `c:\Codenotch\retosEvaluables\modulo5\proyectoFinalModulo5\capturas\`

**Archivos requeridos:**
```
capturas/
├── 01_modelo_er_workbench.png     ✅
├── 02_consultas_workbench.png     ✅
├── 03_api_documentacion.png       ✅
├── 04_get_piezas.png             ✅
├── 05_get_pieza_especifica.png   ✅
├── 06_get_prestamos.png          ✅
├── 07_get_colecciones.png        ✅
└── 08_colecciones_filtradas.png  ✅
```

---

## 🎯 CHECKLIST FINAL

### Antes de entregar, verifica:
- [ ] MySQL corriendo y conectando
- [ ] Base de datos `museo_db` creada con datos
- [ ] API corriendo en http://localhost:3000
- [ ] Todos los endpoints devuelven datos
- [ ] 8 capturas tomadas con nombres correctos
- [ ] Capturas claras y legibles
- [ ] Workbench mostrando modelo ER

---

## 🚨 ¡IMPORTANTE!

1. **Toma las capturas en el ORDEN indicado**
2. **Usa los nombres de archivo EXACTOS**
3. **Verifica que todas las URLs funcionen antes de capturar**
4. **Asegúrate de que el JSON sea legible en las capturas**

¡Sigue esta guía paso a paso y tendrás todas las capturas perfectas para el proyecto! 🎯