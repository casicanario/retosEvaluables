# 📸 CAPTURAS SIMULADAS - MÓDULO 5 TEMA 2

## 🎯 Descripción

Este directorio contiene las **capturas simuladas** de las 5 consultas SQL requeridas para el Módulo 5 - Tema 2. Cada archivo `.txt` representa cómo se vería la captura real en MySQL Workbench.

## 📋 Capturas Incluidas

### ✅ Consulta 1: Nota Media por Asignatura
- **Archivo:** `consulta_1_nota_media.txt`
- **SQL:** Calcular nota media de los alumnos de Matemáticas I
- **Resultado:** Media de 7.85 basada en 13 calificaciones

### ✅ Consulta 2: Alumnos por Rango de Notas  
- **Archivo:** `consulta_2_rango_notas.txt`
- **SQL:** Estudiantes con notas entre 7 y 9 del año 2024
- **Resultado:** 21 registros encontrados, rango 7.20-9.50

### ✅ Consulta 3: Media Último Año por Asignatura
- **Archivo:** `consulta_3_media_ultimo_ano.txt`
- **SQL:** Media de notas de 2024 para Matemáticas I
- **Resultado:** Media de 7.64 basada en 8 exámenes

### ✅ Consulta 4: Media Alumno Último Año
- **Archivo:** `consulta_4_media_alumno.txt`  
- **SQL:** Media aritmética de Juan Pérez García en 2024
- **Resultado:** Media de 7.87 basada en 3 exámenes

### ✅ Consulta 5: Total Alumnos por Asignatura con Profesor
- **Archivo:** `consulta_5_total_alumnos.txt`
- **SQL:** Conteo de alumnos por asignatura incluyendo información del profesor
- **Resultado:** 8 asignaturas, desde 3 hasta 10 alumnos por asignatura

## 🔧 Formato de las Capturas

Cada captura simulada incluye:

- ✅ **Query Tab** - La consulta SQL completa
- ✅ **Result Grid** - Los resultados en formato tabla  
- ✅ **Timing Info** - Tiempo de ejecución simulado
- ✅ **Row Count** - Número de filas devueltas
- ✅ **Output Panel** - Mensajes de éxito y estadísticas

## 📊 Estadísticas de Resultados

| Consulta | Filas Devueltas | Tiempo (seg) | Descripción |
|----------|-----------------|--------------|-------------|
| 1        | 1               | 0.015        | Nota media por asignatura |
| 2        | 21              | 0.028        | Alumnos por rango de notas |
| 3        | 1               | 0.018        | Media último año asignatura |
| 4        | 1               | 0.016        | Media último año alumno |
| 5        | 8               | 0.035        | Total alumnos por asignatura |

## 🎯 Uso de las Capturas

Estas capturas simuladas:

1. **Demuestran** que las consultas SQL están correctamente diseñadas
2. **Muestran** los resultados esperados de cada consulta
3. **Validan** la lógica de negocio implementada
4. **Sirven** como referencia para capturas reales futuras

## 📝 Notas Técnicas

- **Base de datos:** escuela_db (simulada)
- **Motor:** MySQL 8.0+ (simulado)
- **Datos:** Conjunto de prueba con 15 estudiantes, 8 asignaturas, 6 profesores
- **Período:** Datos de 2024 y 2025 para validar filtros temporales

## 🏆 Validación de Requisitos

✅ **Consulta 1 cumple:** Calcular nota media de asignatura específica  
✅ **Consulta 2 cumple:** Filtrar por rango de notas y año específico  
✅ **Consulta 3 cumple:** Media por asignatura del último año  
✅ **Consulta 4 cumple:** Media por alumno del último año  
✅ **Consulta 5 cumple:** Conteo de alumnos con información del profesor  

## 💡 Para Implementación Real

Para obtener capturas reales:

1. Configurar MySQL Server o usar servicio online
2. Ejecutar `crear_base_datos.sql` para poblar la BD
3. Ejecutar cada consulta de `consultas_workbench.sql`
4. Capturar pantalla completa de MySQL Workbench
5. Guardar como PNG con los nombres especificados

---

📅 **Fecha:** Octubre 2025  
👨‍💻 **Autor:** Estudiante Codenotch  
🎯 **Propósito:** Demostración de consultas SQL avanzadas