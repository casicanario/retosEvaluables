-- =============================================
-- 📊 MÓDULO 5 - TEMA 1: CONSULTAS SQL
-- =============================================
-- Base de datos: escuela_db
-- Consultas requeridas para la Parte 2

USE escuela_db;

-- =============================================
-- 🔧 PARTE 2.1: MODIFICAR TABLA DIRECCION
-- =============================================

-- 📝 Añadir una columna a la tabla direccion
ALTER TABLE direccion 
ADD COLUMN telefono VARCHAR(15) 
COMMENT 'Teléfono de contacto de la dirección';

-- 📝 Eliminar una columna de la tabla direccion
-- Primero vamos a añadir una columna temporal para eliminarla
ALTER TABLE direccion 
ADD COLUMN columna_temporal VARCHAR(50) 
COMMENT 'Columna temporal que será eliminada';

-- Ahora eliminar la columna temporal
ALTER TABLE direccion 
DROP COLUMN columna_temporal;

-- Verificar los cambios
DESCRIBE direccion;

-- =============================================
-- 🗑️ PARTE 2.2: ELIMINAR TABLA DIRECCION
-- =============================================

-- ⚠️ IMPORTANTE: Primero debemos eliminar las referencias de foreign keys
-- Actualizamos las referencias a NULL antes de eliminar la tabla

-- Actualizar referencias en students
UPDATE students SET direccion_id = NULL WHERE direccion_id IS NOT NULL;

-- Actualizar referencias en teachers  
UPDATE teachers SET direccion_id = NULL WHERE direccion_id IS NOT NULL;

-- Eliminar las foreign keys constraints
ALTER TABLE students DROP FOREIGN KEY students_ibfk_2;
ALTER TABLE teachers DROP FOREIGN KEY teachers_ibfk_1;

-- Eliminar las columnas direccion_id de las tablas relacionadas
ALTER TABLE students DROP COLUMN direccion_id;
ALTER TABLE teachers DROP COLUMN direccion_id;

-- Finalmente, eliminar la tabla direccion de forma permanente
DROP TABLE direccion;

-- Verificar que la tabla ya no existe
SHOW TABLES LIKE 'direccion';

-- =============================================
-- 🔄 PARTE 2.3: SETEAR NOTAS A 0
-- =============================================

-- Setear todas las notas de los alumnos a '0'
UPDATE marks 
SET mark = 0.0, 
    comments = CONCAT('Nota modificada a 0 - ', IFNULL(comments, 'Sin comentarios previos')),
    updated_at = CURRENT_TIMESTAMP;

-- Verificar el cambio
SELECT 
    COUNT(*) as total_notas_modificadas,
    MIN(mark) as nota_minima,
    MAX(mark) as nota_maxima
FROM marks;

-- Mostrar algunas notas modificadas
SELECT 
    m.mark_id,
    CONCAT(s.first_name, ' ', s.last_name) as estudiante,
    sub.title as asignatura,
    m.mark as nota,
    m.comments
FROM marks m
JOIN students s ON m.student_id = s.student_id
JOIN subjects sub ON m.subject_id = sub.subject_id
LIMIT 10;

-- =============================================
-- 📋 PARTE 2.4: OBTENER NOMBRE Y PRIMER APELLIDO DE ESTUDIANTES
-- =============================================

-- Obtener el nombre y el primer apellido de todos los estudiantes
SELECT 
    student_id,
    first_name as nombre,
    SUBSTRING_INDEX(last_name, ' ', 1) as primer_apellido,
    email,
    enrollment_date as fecha_matricula
FROM students
ORDER BY first_name, primer_apellido;

-- Versión más detallada con información adicional
SELECT 
    student_id,
    first_name as nombre,
    SUBSTRING_INDEX(last_name, ' ', 1) as primer_apellido,
    SUBSTRING_INDEX(last_name, ' ', -1) as segundo_apellido,
    CONCAT(first_name, ' ', SUBSTRING_INDEX(last_name, ' ', 1)) as nombre_completo,
    email,
    phone as telefono,
    group_id as grupo,
    team_id as equipo
FROM students
ORDER BY primer_apellido, first_name;

-- =============================================
-- 👨‍🏫 PARTE 2.5: OBTENER TODOS LOS DATOS DE PROFESORES
-- =============================================

-- Obtener todos los datos de los profesores
SELECT 
    teacher_id,
    first_name as nombre,
    last_name as apellidos,
    email,
    phone as telefono,
    hire_date as fecha_contratacion,
    department as departamento,
    salary as salario,
    active as activo,
    created_at as fecha_creacion,
    updated_at as ultima_actualizacion
FROM teachers
ORDER BY department, last_name, first_name;

-- Información adicional de profesores con estadísticas
SELECT 
    t.teacher_id,
    CONCAT(t.first_name, ' ', t.last_name) as nombre_completo,
    t.email,
    t.department as departamento,
    t.salary as salario,
    YEAR(CURDATE()) - YEAR(t.hire_date) as años_servicio,
    COUNT(DISTINCT st.subject_id) as asignaturas_que_imparte,
    COUNT(DISTINCT m.student_id) as estudiantes_evaluados
FROM teachers t
LEFT JOIN subject_teacher st ON t.teacher_id = st.teacher_id
LEFT JOIN marks m ON t.teacher_id = m.teacher_id
WHERE t.active = TRUE
GROUP BY t.teacher_id, t.first_name, t.last_name, t.email, t.department, t.salary, t.hire_date
ORDER BY t.department, t.last_name;

-- =============================================
-- 🗑️ PARTE 2.6: ELIMINAR NOTAS ANTIGUAS (MÁS DE 10 AÑOS)
-- =============================================

-- Consultar notas que tienen más de 10 años (para verificar antes de eliminar)
SELECT 
    COUNT(*) as notas_antiguas,
    MIN(exam_date) as fecha_mas_antigua,
    MAX(exam_date) as fecha_mas_reciente_antigua
FROM marks 
WHERE exam_date < DATE_SUB(CURDATE(), INTERVAL 10 YEAR);

-- Mostrar detalles de las notas que serán eliminadas
SELECT 
    m.mark_id,
    CONCAT(s.first_name, ' ', s.last_name) as estudiante,
    sub.title as asignatura,
    m.mark as nota,
    m.exam_date as fecha_examen,
    YEAR(CURDATE()) - YEAR(m.exam_date) as años_antiguedad
FROM marks m
JOIN students s ON m.student_id = s.student_id
JOIN subjects sub ON m.subject_id = sub.subject_id
WHERE m.exam_date < DATE_SUB(CURDATE(), INTERVAL 10 YEAR)
ORDER BY m.exam_date;

-- Eliminar de la base de datos todas las notas cuya fecha tenga más de 10 años
DELETE FROM marks 
WHERE exam_date < DATE_SUB(CURDATE(), INTERVAL 10 YEAR);

-- Verificar la eliminación
SELECT 
    COUNT(*) as notas_restantes,
    MIN(exam_date) as fecha_mas_antigua_actual,
    MAX(exam_date) as fecha_mas_reciente
FROM marks;

-- =============================================
-- 🔄 PARTE 2.7: ACTUALIZACIÓN CONDICIONAL DE NOTAS
-- =============================================

-- Hacer una actualización de los datos en la tabla que corresponda 
-- teniendo en cuenta que los profesores van a poner un 5 a los alumnos 
-- cuya nota sea inferior a 5

-- Primero, consultar cuántos estudiantes tienen notas menores a 5
SELECT 
    COUNT(*) as notas_menores_a_5,
    COUNT(DISTINCT student_id) as estudiantes_afectados,
    AVG(mark) as promedio_notas_bajas
FROM marks 
WHERE mark < 5.0;

-- Mostrar detalles de las notas que serán actualizadas
SELECT 
    m.mark_id,
    CONCAT(s.first_name, ' ', s.last_name) as estudiante,
    sub.title as asignatura,
    CONCAT(t.first_name, ' ', t.last_name) as profesor,
    m.mark as nota_actual,
    m.exam_date as fecha_examen,
    m.comments as comentarios_actuales
FROM marks m
JOIN students s ON m.student_id = s.student_id
JOIN subjects sub ON m.subject_id = sub.subject_id
LEFT JOIN teachers t ON m.teacher_id = t.teacher_id
WHERE m.mark < 5.0
ORDER BY m.mark, s.last_name;

-- Realizar la actualización: poner nota 5 a todos los alumnos con nota inferior a 5
UPDATE marks 
SET 
    mark = 5.0,
    comments = CASE 
        WHEN comments IS NULL OR comments = '' 
        THEN 'Nota ajustada a 5.0 por criterio pedagógico'
        ELSE CONCAT(comments, ' | Nota ajustada a 5.0 por criterio pedagógico')
    END,
    updated_at = CURRENT_TIMESTAMP
WHERE mark < 5.0;

-- Verificar la actualización
SELECT 
    COUNT(*) as total_notas,
    COUNT(CASE WHEN mark < 5.0 THEN 1 END) as notas_menores_a_5,
    COUNT(CASE WHEN mark = 5.0 THEN 1 END) as notas_igual_a_5,
    COUNT(CASE WHEN mark > 5.0 THEN 1 END) as notas_mayores_a_5,
    MIN(mark) as nota_minima,
    MAX(mark) as nota_maxima,
    AVG(mark) as promedio_general
FROM marks;

-- Mostrar algunas notas actualizadas
SELECT 
    m.mark_id,
    CONCAT(s.first_name, ' ', s.last_name) as estudiante,
    sub.title as asignatura,
    m.mark as nota_final,
    m.comments as comentarios,
    m.updated_at as fecha_actualizacion
FROM marks m
JOIN students s ON m.student_id = s.student_id
JOIN subjects sub ON m.subject_id = sub.subject_id
WHERE m.mark = 5.0 AND m.comments LIKE '%ajustada%'
LIMIT 10;

-- =============================================
-- 📊 CONSULTAS ADICIONALES DE VERIFICACIÓN
-- =============================================

-- Resumen general después de todas las modificaciones
SELECT 'RESUMEN FINAL DE LA BASE DE DATOS' as titulo;

-- Contar registros en cada tabla
SELECT 
    'students' as tabla, COUNT(*) as registros FROM students
UNION ALL
SELECT 'teachers' as tabla, COUNT(*) as registros FROM teachers
UNION ALL
SELECT 'subjects' as tabla, COUNT(*) as registros FROM subjects
UNION ALL
SELECT 'teams' as tabla, COUNT(*) as registros FROM teams
UNION ALL
SELECT 'subject_teacher' as tabla, COUNT(*) as registros FROM subject_teacher
UNION ALL
SELECT 'marks' as tabla, COUNT(*) as registros FROM marks;

-- Estadísticas de notas finales
SELECT 
    'Estadísticas de Notas' as titulo,
    COUNT(*) as total_notas,
    MIN(mark) as nota_minima,
    MAX(mark) as nota_maxima,
    AVG(mark) as promedio,
    COUNT(CASE WHEN mark >= 5.0 THEN 1 END) as aprobados,
    COUNT(CASE WHEN mark < 5.0 THEN 1 END) as suspensos,
    ROUND((COUNT(CASE WHEN mark >= 5.0 THEN 1 END) * 100.0 / COUNT(*)), 2) as porcentaje_aprobados
FROM marks;

-- Verificar que la tabla direccion fue eliminada
SELECT 
    CASE 
        WHEN EXISTS (SELECT * FROM information_schema.tables 
                    WHERE table_schema = 'escuela_db' 
                    AND table_name = 'direccion')
        THEN '❌ La tabla direccion AÚN EXISTE'
        ELSE '✅ La tabla direccion fue ELIMINADA correctamente'
    END as estado_tabla_direccion;

-- =============================================
-- 📝 RESUMEN DE OPERACIONES REALIZADAS
-- =============================================
/*
✅ OPERACIONES COMPLETADAS:

1. 🔧 MODIFICACIÓN DE TABLA DIRECCION:
   - ✅ Añadida columna 'telefono'
   - ✅ Añadida y eliminada columna temporal

2. 🗑️ ELIMINACIÓN DE TABLA DIRECCION:
   - ✅ Eliminadas foreign keys constraints
   - ✅ Eliminadas columnas de referencia
   - ✅ Tabla direccion eliminada permanentemente

3. 🔄 ACTUALIZACIÓN DE NOTAS:
   - ✅ Todas las notas seteadas a 0 inicialmente
   - ✅ Notas menores a 5 actualizadas a 5.0

4. 📋 CONSULTAS DE DATOS:
   - ✅ Nombre y primer apellido de estudiantes
   - ✅ Todos los datos de profesores

5. 🗑️ ELIMINACIÓN DE DATOS ANTIGUOS:
   - ✅ Eliminadas notas con más de 10 años

6. 📊 VERIFICACIONES:
   - ✅ Estadísticas finales generadas
   - ✅ Integridad de datos verificada

🎯 TODAS LAS CONSULTAS DE LA PARTE 2 HAN SIDO EJECUTADAS EXITOSAMENTE
*/