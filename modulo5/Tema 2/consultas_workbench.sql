-- =============================================
-- 📊 MÓDULO 5 - TEMA 2: CONSULTAS PARA WORKBENCH
-- =============================================
-- Consultas para ejecutar directamente en MySQL Workbench
-- (Para hacer capturas de pantalla)

USE escuela_db;

-- =============================================
-- 🔍 1. CALCULAR NOTA MEDIA DE LOS ALUMNOS DE LA ASIGNATURA i
-- =============================================

-- Consulta básica para asignatura ID = 1
SELECT 
    s.subject_id,
    s.title as asignatura,
    s.course as curso,
    COUNT(m.mark_id) as total_notas,
    ROUND(AVG(m.mark), 2) as nota_media,
    MIN(m.mark) as nota_minima,
    MAX(m.mark) as nota_maxima,
    COUNT(DISTINCT m.student_id) as estudiantes_evaluados
FROM subjects s
LEFT JOIN marks m ON s.subject_id = m.subject_id
WHERE s.subject_id = 1
GROUP BY s.subject_id, s.title, s.course;

-- Consulta para asignatura ID = 2
SELECT 
    s.subject_id,
    s.title as asignatura,
    s.course as curso,
    COUNT(m.mark_id) as total_notas,
    ROUND(AVG(m.mark), 2) as nota_media,
    MIN(m.mark) as nota_minima,
    MAX(m.mark) as nota_maxima,
    COUNT(DISTINCT m.student_id) as estudiantes_evaluados
FROM subjects s
LEFT JOIN marks m ON s.subject_id = m.subject_id
WHERE s.subject_id = 2
GROUP BY s.subject_id, s.title, s.course;

-- Consulta general para todas las asignaturas
SELECT 
    s.subject_id,
    s.title as asignatura,
    s.course as curso,
    COUNT(m.mark_id) as total_notas,
    ROUND(AVG(m.mark), 2) as nota_media,
    MIN(m.mark) as nota_minima,
    MAX(m.mark) as nota_maxima,
    COUNT(DISTINCT m.student_id) as estudiantes_evaluados
FROM subjects s
LEFT JOIN marks m ON s.subject_id = m.subject_id
GROUP BY s.subject_id, s.title, s.course
ORDER BY nota_media DESC;

-- =============================================
-- 🔍 2. OBTENER ID Y NOTA DE ALUMNOS CON NOTA ENTRE 1 Y 20 Y FECHA DEL AÑO PASADO
-- =============================================

-- Alumnos con notas entre 5 y 8 del año pasado
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) as nombre_completo,
    s.email,
    m.mark as nota,
    m.exam_date as fecha_examen,
    sub.title as asignatura,
    sub.course as curso,
    YEAR(m.exam_date) as año_examen
FROM students s
JOIN marks m ON s.student_id = m.student_id
JOIN subjects sub ON m.subject_id = sub.subject_id
WHERE m.mark BETWEEN 5 AND 8
  AND YEAR(m.exam_date) = YEAR(CURDATE()) - 1
ORDER BY m.mark DESC, s.last_name, s.first_name;

-- Alumnos con notas entre 0 y 10 del año pasado (todos)
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) as nombre_completo,
    s.email,
    m.mark as nota,
    m.exam_date as fecha_examen,
    sub.title as asignatura,
    sub.course as curso,
    YEAR(m.exam_date) as año_examen
FROM students s
JOIN marks m ON s.student_id = m.student_id
JOIN subjects sub ON m.subject_id = sub.subject_id
WHERE m.mark BETWEEN 0 AND 10
  AND YEAR(m.exam_date) = YEAR(CURDATE()) - 1
ORDER BY m.mark DESC, s.last_name, s.first_name;

-- Estadísticas por rangos de notas del año pasado
SELECT 
    CASE 
        WHEN m.mark >= 9 THEN 'Excelente (9-10)'
        WHEN m.mark >= 7 THEN 'Notable (7-8.9)'
        WHEN m.mark >= 5 THEN 'Aprobado (5-6.9)'
        ELSE 'Suspenso (0-4.9)'
    END as rango_nota,
    COUNT(*) as total_estudiantes,
    ROUND(AVG(m.mark), 2) as nota_media_rango,
    COUNT(DISTINCT s.student_id) as estudiantes_unicos
FROM students s
JOIN marks m ON s.student_id = m.student_id
WHERE YEAR(m.exam_date) = YEAR(CURDATE()) - 1
GROUP BY rango_nota
ORDER BY nota_media_rango DESC;

-- =============================================
-- 🔍 3. OBTENER MEDIA DE LAS NOTAS QUE SE HAN DADO EN EL ÚLTIMO AÑO POR ASIGNATURA
-- =============================================

-- Media del último año para asignatura ID = 1
SELECT 
    s.subject_id,
    s.title as asignatura,
    s.course as curso,
    s.credits as creditos,
    COUNT(m.mark_id) as total_notas_ultimo_ano,
    ROUND(AVG(m.mark), 2) as media_ultimo_ano,
    MIN(m.mark) as nota_minima,
    MAX(m.mark) as nota_maxima,
    COUNT(DISTINCT m.student_id) as estudiantes_evaluados,
    MIN(m.exam_date) as primera_fecha,
    MAX(m.exam_date) as ultima_fecha,
    COUNT(CASE WHEN m.mark >= 5 THEN 1 END) as aprobados,
    COUNT(CASE WHEN m.mark < 5 THEN 1 END) as suspensos,
    ROUND((COUNT(CASE WHEN m.mark >= 5 THEN 1 END) * 100.0 / COUNT(m.mark_id)), 2) as porcentaje_aprobados
FROM subjects s
LEFT JOIN marks m ON s.subject_id = m.subject_id 
    AND m.exam_date >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)
WHERE s.subject_id = 1
GROUP BY s.subject_id, s.title, s.course, s.credits;

-- Media del último año para todas las asignaturas
SELECT 
    s.subject_id,
    s.title as asignatura,
    s.course as curso,
    s.credits as creditos,
    COUNT(m.mark_id) as total_notas_ultimo_ano,
    ROUND(AVG(m.mark), 2) as media_ultimo_ano,
    MIN(m.mark) as nota_minima,
    MAX(m.mark) as nota_maxima,
    COUNT(DISTINCT m.student_id) as estudiantes_evaluados,
    COUNT(CASE WHEN m.mark >= 5 THEN 1 END) as aprobados,
    COUNT(CASE WHEN m.mark < 5 THEN 1 END) as suspensos,
    ROUND((COUNT(CASE WHEN m.mark >= 5 THEN 1 END) * 100.0 / COUNT(m.mark_id)), 2) as porcentaje_aprobados
FROM subjects s
LEFT JOIN marks m ON s.subject_id = m.subject_id 
    AND m.exam_date >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)
GROUP BY s.subject_id, s.title, s.course, s.credits
HAVING total_notas_ultimo_ano > 0
ORDER BY media_ultimo_ano DESC;

-- =============================================
-- 🔍 4. OBTENER MEDIA ARITMÉTICA DE LAS NOTAS QUE SE HAN DADO EN EL ÚLTIMO AÑO POR ALUMNO
-- =============================================

-- Media del último año para estudiante ID = 1
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) as nombre_completo,
    s.email,
    s.phone,
    t.name as equipo,
    COUNT(m.mark_id) as total_notas_ultimo_ano,
    ROUND(AVG(m.mark), 2) as media_aritmetica,
    MIN(m.mark) as nota_minima,
    MAX(m.mark) as nota_maxima,
    COUNT(DISTINCT m.subject_id) as asignaturas_cursadas,
    MIN(m.exam_date) as primera_evaluacion,
    MAX(m.exam_date) as ultima_evaluacion,
    COUNT(CASE WHEN m.mark >= 5 THEN 1 END) as examenes_aprobados,
    COUNT(CASE WHEN m.mark < 5 THEN 1 END) as examenes_suspensos,
    ROUND((COUNT(CASE WHEN m.mark >= 5 THEN 1 END) * 100.0 / COUNT(m.mark_id)), 2) as porcentaje_aprobados
FROM students s
LEFT JOIN teams t ON s.team_id = t.team_id
LEFT JOIN marks m ON s.student_id = m.student_id 
    AND m.exam_date >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)
WHERE s.student_id = 1
GROUP BY s.student_id, s.first_name, s.last_name, s.email, s.phone, t.name;

-- Detalle por asignatura para estudiante ID = 1
SELECT 
    sub.title as asignatura,
    sub.course as curso,
    COUNT(m.mark_id) as evaluaciones,
    ROUND(AVG(m.mark), 2) as media_asignatura,
    MIN(m.mark) as nota_minima,
    MAX(m.mark) as nota_maxima
FROM marks m
JOIN subjects sub ON m.subject_id = sub.subject_id
WHERE m.student_id = 1
  AND m.exam_date >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)
GROUP BY sub.subject_id, sub.title, sub.course
ORDER BY media_asignatura DESC;

-- Media del último año para todos los estudiantes (top 10)
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) as nombre_completo,
    s.email,
    t.name as equipo,
    COUNT(m.mark_id) as total_notas_ultimo_ano,
    ROUND(AVG(m.mark), 2) as media_aritmetica,
    COUNT(DISTINCT m.subject_id) as asignaturas_cursadas,
    COUNT(CASE WHEN m.mark >= 5 THEN 1 END) as examenes_aprobados,
    ROUND((COUNT(CASE WHEN m.mark >= 5 THEN 1 END) * 100.0 / COUNT(m.mark_id)), 2) as porcentaje_aprobados
FROM students s
LEFT JOIN teams t ON s.team_id = t.team_id
LEFT JOIN marks m ON s.student_id = m.student_id 
    AND m.exam_date >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)
GROUP BY s.student_id, s.first_name, s.last_name, s.email, t.name
HAVING total_notas_ultimo_ano > 0
ORDER BY media_aritmetica DESC
LIMIT 10;

-- =============================================
-- 🔍 5. OBTENER NÚMERO TOTAL DE ALUMNOS POR ASIGNATURA, NOMBRE DE ASIGNATURA Y NOMBRE Y APELLIDOS DEL PROFESOR QUE LA IMPARTE
-- =============================================

-- Consulta principal: Total alumnos por asignatura con profesor
SELECT 
    sub.subject_id,
    sub.title as nombre_asignatura,
    sub.course as curso,
    sub.credits as creditos,
    CONCAT(t.first_name, ' ', t.last_name) as profesor_nombre_apellidos,
    t.department as departamento_profesor,
    t.email as email_profesor,
    COUNT(DISTINCT m.student_id) as total_alumnos,
    COUNT(m.mark_id) as total_evaluaciones,
    ROUND(AVG(m.mark), 2) as nota_media_asignatura,
    MIN(m.exam_date) as primera_evaluacion,
    MAX(m.exam_date) as ultima_evaluacion,
    COUNT(CASE WHEN m.mark >= 5 THEN 1 END) as evaluaciones_aprobadas,
    COUNT(CASE WHEN m.mark < 5 THEN 1 END) as evaluaciones_suspensas
FROM subjects sub
JOIN subject_teacher st ON sub.subject_id = st.subject_id
JOIN teachers t ON st.teacher_id = t.teacher_id
LEFT JOIN marks m ON sub.subject_id = m.subject_id
WHERE t.active = TRUE
GROUP BY sub.subject_id, sub.title, sub.course, sub.credits, 
         t.teacher_id, t.first_name, t.last_name, t.department, t.email
ORDER BY total_alumnos DESC, sub.course, sub.title;

-- Resumen estadístico por profesor
SELECT 
    CONCAT(t.first_name, ' ', t.last_name) as profesor_nombre_apellidos,
    t.department as departamento,
    COUNT(DISTINCT sub.subject_id) as asignaturas_impartidas,
    COUNT(DISTINCT m.student_id) as total_alumnos_unicos,
    COUNT(m.mark_id) as total_evaluaciones,
    ROUND(AVG(m.mark), 2) as nota_media_general,
    GROUP_CONCAT(DISTINCT sub.title ORDER BY sub.title SEPARATOR ', ') as asignaturas
FROM teachers t
JOIN subject_teacher st ON t.teacher_id = st.teacher_id
JOIN subjects sub ON st.subject_id = sub.subject_id
LEFT JOIN marks m ON sub.subject_id = m.subject_id
WHERE t.active = TRUE
GROUP BY t.teacher_id, t.first_name, t.last_name, t.department
ORDER BY total_alumnos_unicos DESC, asignaturas_impartidas DESC;

-- Top 5 asignaturas con más alumnos
SELECT 
    sub.title as asignatura,
    sub.course as curso,
    CONCAT(t.first_name, ' ', t.last_name) as profesor,
    COUNT(DISTINCT m.student_id) as total_alumnos,
    ROUND(AVG(m.mark), 2) as nota_media
FROM subjects sub
JOIN subject_teacher st ON sub.subject_id = st.subject_id
JOIN teachers t ON st.teacher_id = t.teacher_id
LEFT JOIN marks m ON sub.subject_id = m.subject_id
WHERE t.active = TRUE
GROUP BY sub.subject_id, sub.title, sub.course, t.first_name, t.last_name
ORDER BY total_alumnos DESC
LIMIT 5;

-- =============================================
-- 📊 CONSULTAS ADICIONALES DE ANÁLISIS
-- =============================================

-- Estadísticas generales del sistema
SELECT 
    'Estadísticas Generales' as categoria,
    (SELECT COUNT(*) FROM students) as total_estudiantes,
    (SELECT COUNT(*) FROM teachers WHERE active = TRUE) as total_profesores_activos,
    (SELECT COUNT(*) FROM subjects) as total_asignaturas,
    (SELECT COUNT(*) FROM marks) as total_evaluaciones,
    (SELECT COUNT(*) FROM teams) as total_equipos,
    (SELECT ROUND(AVG(mark), 2) FROM marks) as nota_media_global;

-- Distribución de notas por rangos
SELECT 
    CASE 
        WHEN mark >= 9 THEN 'Excelente (9-10)'
        WHEN mark >= 7 THEN 'Notable (7-8.9)'
        WHEN mark >= 5 THEN 'Aprobado (5-6.9)'
        ELSE 'Suspenso (0-4.9)'
    END as rango_nota,
    COUNT(*) as total_evaluaciones,
    ROUND((COUNT(*) * 100.0 / (SELECT COUNT(*) FROM marks)), 2) as porcentaje,
    ROUND(AVG(mark), 2) as nota_media_rango
FROM marks
GROUP BY rango_nota
ORDER BY nota_media_rango DESC;

-- Rendimiento por curso académico
SELECT 
    s.course as curso,
    COUNT(DISTINCT s.subject_id) as asignaturas_curso,
    COUNT(DISTINCT m.student_id) as estudiantes_evaluados,
    COUNT(m.mark_id) as total_evaluaciones,
    ROUND(AVG(m.mark), 2) as nota_media_curso,
    COUNT(CASE WHEN m.mark >= 5 THEN 1 END) as evaluaciones_aprobadas,
    ROUND((COUNT(CASE WHEN m.mark >= 5 THEN 1 END) * 100.0 / COUNT(m.mark_id)), 2) as porcentaje_aprobados
FROM subjects s
LEFT JOIN marks m ON s.subject_id = m.subject_id
GROUP BY s.course
ORDER BY s.course;

-- =============================================
-- 💡 NOTAS IMPORTANTES PARA WORKBENCH:
-- =============================================
/*
📸 CAPTURAS DE PANTALLA REQUERIDAS:

1. Ejecutar cada consulta principal individualmente
2. Capturar pantalla completa mostrando:
   - La consulta SQL
   - Los resultados en formato tabla
   - El tiempo de ejecución
   - El número de filas devueltas

3. Consultas principales a capturar:
   ✅ Nota media por asignatura (varias asignaturas)
   ✅ Alumnos con rango de notas y año pasado
   ✅ Media último año por asignatura  
   ✅ Media último año por alumno
   ✅ Total alumnos por asignatura con profesor

4. Asegurarse de que las consultas devuelvan datos:
   - Si no hay datos del año pasado, modificar fechas en sample data
   - Verificar que existen las relaciones profesor-asignatura
   - Comprobar que hay notas registradas

5. Formato de captura sugerido:
   - Nombre archivo: "consulta_X_descripcion.png"
   - Resolución: Al menos 1920x1080
   - Mostrar consulta completa y resultados
*/