-- =============================================
-- CONSULTAS PARA CAPTURA 2: WORKBENCH
-- Proyecto Final Módulo 5 - Sistema de Museo
-- =============================================

-- 1. Seleccionar la base de datos
USE museo_db;

-- 2. Mostrar todas las tablas
SHOW TABLES;

-- 3. Consulta principal: Piezas con información completa
SELECT
    p.codigo_pieza,
    p.nombre AS pieza,
    CONCAT(a.nombre, ' ', a.apellidos) AS autor,
    a.nacionalidad,
    p.año_creacion,
    p.epoca,
    p.material,
    p.ubicacion_actual,
    c.nombre AS coleccion,
    CONCAT('€', FORMAT(p.valor_estimado, 0)) AS valor_estimado
FROM piezas p
LEFT JOIN autores a ON p.autor_id = a.id
LEFT JOIN colecciones c ON p.coleccion_id = c.id
ORDER BY p.valor_estimado DESC;

-- 4. Estadísticas del museo
SELECT 
    'Total Piezas' as concepto,
    COUNT(*) as cantidad
FROM piezas
UNION ALL
SELECT 
    'Piezas Expuestas' as concepto,
    COUNT(*) as cantidad
FROM piezas WHERE ubicacion_actual = 'expuesta'
UNION ALL
SELECT 
    'Piezas en Préstamo' as concepto,
    COUNT(*) as cantidad
FROM piezas WHERE ubicacion_actual = 'prestamo'
UNION ALL
SELECT 
    'Total Autores' as concepto,
    COUNT(*) as cantidad
FROM autores;

-- 5. Préstamos activos
SELECT 
    p.nombre as pieza,
    CONCAT(a.nombre, ' ', a.apellidos) AS autor,
    pr.institucion_prestamo,
    pr.fecha_prestamo,
    pr.fecha_devolucion_prevista,
    pr.estado,
    DATEDIFF(pr.fecha_devolucion_prevista, CURDATE()) as dias_restantes
FROM prestamos pr
JOIN piezas p ON pr.pieza_id = p.id
LEFT JOIN autores a ON p.autor_id = a.id
WHERE pr.estado IN ('activo', 'pendiente')
ORDER BY pr.fecha_devolucion_prevista;