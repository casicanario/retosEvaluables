-- ===============================================
-- CONSULTAS SQL PARA WORKBENCH
-- Proyecto Final Módulo 5 - Sistema de Museo
-- ===============================================

USE museo_db;

-- ===============================================
-- CONSULTAS BÁSICAS
-- ===============================================

-- 1. Listar todas las piezas con información del autor
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

-- 2. Piezas por colección con estadísticas
SELECT 
    c.nombre AS coleccion,
    c.tipo_coleccion,
    COUNT(p.id) AS total_piezas,
    SUM(CASE WHEN p.ubicacion_actual = 'expuesta' THEN 1 ELSE 0 END) AS expuestas,
    SUM(CASE WHEN p.ubicacion_actual = 'almacenada' THEN 1 ELSE 0 END) AS almacenadas,
    SUM(CASE WHEN p.ubicacion_actual = 'prestamo' THEN 1 ELSE 0 END) AS en_prestamo,
    AVG(p.valor_estimado) AS valor_promedio
FROM colecciones c
LEFT JOIN piezas p ON c.id = p.coleccion_id
GROUP BY c.id, c.nombre, c.tipo_coleccion
ORDER BY total_piezas DESC;

-- 3. Préstamos activos con información detallada
SELECT 
    p.codigo_pieza,
    p.nombre AS pieza,
    CONCAT(a.nombre, ' ', a.apellidos) AS autor,
    pr.institucion_prestamo,
    pr.responsable_nombre,
    pr.fecha_prestamo,
    pr.fecha_devolucion_prevista,
    DATEDIFF(pr.fecha_devolucion_prevista, CURDATE()) AS dias_restantes,
    pr.seguro_valor,
    CASE 
        WHEN DATEDIFF(pr.fecha_devolucion_prevista, CURDATE()) < 0 THEN 'VENCIDO'
        WHEN DATEDIFF(pr.fecha_devolucion_prevista, CURDATE()) <= 30 THEN 'PRÓXIMO A VENCER'
        ELSE 'VIGENTE'
    END AS estado_prestamo
FROM prestamos pr
JOIN piezas p ON pr.pieza_id = p.id
LEFT JOIN autores a ON p.autor_id = a.id
WHERE pr.estado = 'activo'
ORDER BY pr.fecha_devolucion_prevista ASC;

-- ===============================================
-- CONSULTAS AVANZADAS
-- ===============================================

-- 4. Autores más valiosos (por valor total de sus obras)
SELECT 
    CONCAT(a.nombre, ' ', a.apellidos) AS autor,
    a.nacionalidad,
    a.estilo_artistico,
    COUNT(p.id) AS total_obras,
    SUM(p.valor_estimado) AS valor_total,
    AVG(p.valor_estimado) AS valor_promedio,
    MIN(p.año_creacion) AS obra_mas_antigua,
    MAX(p.año_creacion) AS obra_mas_reciente
FROM autores a
JOIN piezas p ON a.id = p.autor_id
WHERE p.valor_estimado IS NOT NULL
GROUP BY a.id
ORDER BY valor_total DESC;

-- 5. Historial de movimientos de piezas
SELECT 
    p.codigo_pieza,
    p.nombre AS pieza,
    h.ubicacion_anterior,
    h.ubicacion_nueva,
    h.fecha_cambio,
    h.motivo,
    h.responsable,
    DATEDIFF(CURDATE(), h.fecha_cambio) AS dias_desde_cambio
FROM historial_ubicaciones h
JOIN piezas p ON h.pieza_id = p.id
ORDER BY h.fecha_cambio DESC
LIMIT 20;

-- 6. Ocupación de expositores y vitrinas
SELECT 
    ev.codigo,
    ev.tipo,
    ev.ubicacion,
    ev.sala,
    ev.estado,
    COUNT(p.id) AS piezas_asignadas,
    ev.capacidad_piezas,
    CASE 
        WHEN COUNT(p.id) = 0 THEN 'DISPONIBLE'
        WHEN COUNT(p.id) < ev.capacidad_piezas THEN 'PARCIALMENTE OCUPADO'
        WHEN COUNT(p.id) = ev.capacidad_piezas THEN 'COMPLETO'
        ELSE 'SOBRECARGADO'
    END AS estado_ocupacion
FROM expositores_vitrinas ev
LEFT JOIN piezas p ON ev.id = p.expositor_vitrina_id AND p.ubicacion_actual = 'expuesta'
GROUP BY ev.id
ORDER BY ev.sala, ev.codigo;

-- ===============================================
-- CONSULTAS DE CONTROL Y AUDITORÍA
-- ===============================================

-- 7. Piezas sin autor asignado
SELECT 
    p.codigo_pieza,
    p.nombre,
    p.epoca,
    p.procedencia,
    p.fecha_adquisicion
FROM piezas p
WHERE p.autor_id IS NULL
ORDER BY p.fecha_adquisicion DESC;

-- 8. Préstamos vencidos que requieren atención
SELECT 
    p.codigo_pieza,
    p.nombre AS pieza,
    pr.institucion_prestamo,
    pr.responsable_nombre,
    pr.responsable_email,
    pr.fecha_devolucion_prevista,
    DATEDIFF(CURDATE(), pr.fecha_devolucion_prevista) AS dias_vencido,
    pr.seguro_valor
FROM prestamos pr
JOIN piezas p ON pr.pieza_id = p.id
WHERE pr.estado = 'activo' 
AND pr.fecha_devolucion_prevista < CURDATE()
ORDER BY dias_vencido DESC;

-- 9. Valor total del museo por ubicación
SELECT 
    ubicacion_actual,
    COUNT(*) AS cantidad_piezas,
    SUM(valor_estimado) AS valor_total,
    AVG(valor_estimado) AS valor_promedio
FROM piezas
WHERE valor_estimado IS NOT NULL
GROUP BY ubicacion_actual
ORDER BY valor_total DESC;

-- 10. Piezas que requieren mantenimiento o restauración
SELECT 
    p.codigo_pieza,
    p.nombre,
    CONCAT(a.nombre, ' ', a.apellidos) AS autor,
    p.estado_conservacion,
    p.año_creacion,
    YEAR(CURDATE()) - p.año_creacion AS antiguedad_años,
    p.material,
    p.observaciones
FROM piezas p
LEFT JOIN autores a ON p.autor_id = a.id
WHERE p.estado_conservacion IN ('regular', 'malo', 'restauracion')
   OR p.ubicacion_actual = 'restauracion'
ORDER BY 
    CASE p.estado_conservacion
        WHEN 'malo' THEN 1
        WHEN 'restauracion' THEN 2
        WHEN 'regular' THEN 3
        ELSE 4
    END,
    antiguedad_años DESC;

-- ===============================================
-- VISTAS ÚTILES (ya creadas en el script principal)
-- ===============================================

-- Consultar la vista de piezas completas
SELECT * FROM vista_piezas_completas
ORDER BY valor_estimado DESC
LIMIT 10;

-- Consultar la vista de préstamos activos
SELECT * FROM vista_prestamos_activos
ORDER BY dias_restantes ASC;