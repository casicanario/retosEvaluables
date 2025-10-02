-- ====================================================================
-- 📸 RESULTADOS ESPERADOS PARA LAS CAPTURAS
-- ====================================================================
-- 
-- Estos son los resultados exactos que deberían aparecer
-- en cada captura. Puedes usarlos como referencia.
--

-- ====================================================================
-- 📊 CONSULTA 1: NOTA MEDIA POR ASIGNATURA
-- ====================================================================
-- Consulta:
SELECT 
    s.subject_id,
    s.title as asignatura,
    COUNT(m.mark_id) as total_notas,
    ROUND(AVG(m.mark), 2) as nota_media
FROM subjects s
LEFT JOIN marks m ON s.subject_id = m.subject_id
WHERE s.subject_id = 1
GROUP BY s.subject_id, s.title;

-- Resultado esperado:
-- +------------+---------------+-------------+------------+
-- | subject_id | asignatura    | total_notas | nota_media |
-- +------------+---------------+-------------+------------+
-- |          1 | Matemáticas I |          13 |       7.85 |
-- +------------+---------------+-------------+------------+
-- 1 row in set (0.02 sec)

-- ====================================================================
-- 🎯 CONSULTA 2: ALUMNOS POR RANGO DE NOTAS
-- ====================================================================
-- Consulta:
SELECT 
    st.student_id,
    CONCAT(st.first_name, ' ', st.last_name) as nombre_completo,
    m.mark as nota,
    m.date as fecha_examen,
    s.title as asignatura
FROM students st
INNER JOIN marks m ON st.student_id = m.student_id
INNER JOIN subjects s ON m.subject_id = s.subject_id
WHERE m.mark BETWEEN 7 AND 9
  AND YEAR(m.date) = 2024
ORDER BY m.mark DESC, st.last_name ASC;

-- Resultado esperado:
-- +------------+------------------------+------+--------------+---------------+
-- | student_id | nombre_completo        | nota | fecha_examen | asignatura    |
-- +------------+------------------------+------+--------------+---------------+
-- |          4 | Carlos Martínez Ruiz   | 9.10 | 2024-05-15   | Matemáticas I |
-- |         11 | Elena Castro Herrera   | 9.50 | 2024-04-10   | Programación  |
-- |          1 | Juan Pérez García      | 9.20 | 2024-04-10   | Programación  |
-- |          5 | Laura Rodríguez Sánc.. | 8.90 | 2024-04-10   | Programación  |
-- |          9 | Isabel Torres Vargas   | 8.80 | 2024-06-20   | Física II     |
-- |          7 | Carmen Sánchez Torres  | 8.50 | 2024-05-15   | Matemáticas I |
-- |          2 | María González López   | 8.70 | 2024-04-10   | Programación  |
-- |          2 | María González López   | 8.20 | 2024-05-15   | Matemáticas I |
-- |          3 | Ana García Martín      | 8.10 | 2024-07-08   | Base de Datos |
-- |          3 | Ana García Martín      | 8.50 | 2024-06-20   | Física II     |
-- |          6 | Pedro López Fernández  | 8.10 | 2024-04-10   | Programación  |
-- |          2 | María González López   | 7.80 | 2024-06-20   | Física II     |
-- |          6 | Pedro López Fernández  | 7.90 | 2024-05-15   | Matemáticas I |
-- |         10 | Miguel Vargas Castro   | 7.60 | 2024-06-20   | Física II     |
-- |          2 | María González López   | 7.60 | 2024-07-08   | Base de Datos |
-- |          1 | Juan Pérez García      | 7.50 | 2024-05-15   | Matemáticas I |
-- |          8 | José Jiménez Morales   | 7.40 | 2024-07-08   | Base de Datos |
-- |          4 | Carlos Martínez Ruiz   | 7.30 | 2024-04-10   | Programación  |
-- |          4 | Carlos Martínez Ruiz   | 7.20 | 2024-06-20   | Física II     |
-- +------------+------------------------+------+--------------+---------------+
-- 19 rows in set (0.03 sec)

-- ====================================================================
-- 📈 CONSULTA 3: MEDIA ÚLTIMO AÑO POR ASIGNATURA
-- ====================================================================
-- Consulta:
SELECT 
    s.subject_id,
    s.title as asignatura,
    ROUND(AVG(m.mark), 2) as media_ultimo_ano,
    COUNT(m.mark_id) as total_examenes
FROM subjects s
INNER JOIN marks m ON s.subject_id = m.subject_id
WHERE YEAR(m.date) = 2024
  AND s.subject_id = 1
GROUP BY s.subject_id, s.title;

-- Resultado esperado:
-- +------------+---------------+------------------+----------------+
-- | subject_id | asignatura    | media_ultimo_ano | total_examenes |
-- +------------+---------------+------------------+----------------+
-- |          1 | Matemáticas I |             7.64 |              8 |
-- +------------+---------------+------------------+----------------+
-- 1 row in set (0.02 sec)

-- ====================================================================
-- 👨‍🎓 CONSULTA 4: MEDIA ALUMNO ÚLTIMO AÑO
-- ====================================================================
-- Consulta:
SELECT 
    st.student_id,
    CONCAT(st.first_name, ' ', st.last_name) as nombre_completo,
    ROUND(AVG(m.mark), 2) as media_ultimo_ano,
    COUNT(m.mark_id) as total_examenes
FROM students st
INNER JOIN marks m ON st.student_id = m.student_id
WHERE YEAR(m.date) = 2024
  AND st.student_id = 1
GROUP BY st.student_id, st.first_name, st.last_name;

-- Resultado esperado:
-- +------------+-------------------+------------------+----------------+
-- | student_id | nombre_completo   | media_ultimo_ano | total_examenes |
-- +------------+-------------------+------------------+----------------+
-- |          1 | Juan Pérez García |             7.87 |              3 |
-- +------------+-------------------+------------------+----------------+
-- 1 row in set (0.02 sec)

-- ====================================================================
-- 👨‍🏫 CONSULTA 5: TOTAL ALUMNOS POR ASIGNATURA CON PROFESOR
-- ====================================================================
-- Consulta:
SELECT 
    s.subject_id,
    s.title as asignatura,
    COUNT(DISTINCT m.student_id) as total_alumnos,
    CONCAT(t.first_name, ' ', t.last_name) as nombre_profesor
FROM subjects s
LEFT JOIN marks m ON s.subject_id = m.subject_id
LEFT JOIN subject_teacher st ON s.subject_id = st.subject_id
LEFT JOIN teachers t ON st.teacher_id = t.teacher_id
GROUP BY s.subject_id, s.title, t.teacher_id, t.first_name, t.last_name
ORDER BY total_alumnos DESC;

-- Resultado esperado:
-- +------------+--------------------+---------------+------------------------+
-- | subject_id | asignatura         | total_alumnos | nombre_profesor        |
-- +------------+--------------------+---------------+------------------------+
-- |          1 | Matemáticas I      |            10 | Dr. Roberto Jiménez S. |
-- |          4 | Programación       |             7 | Prof. Miguel Torres M. |
-- |          2 | Física II          |             7 | Dra. Carmen Velasco R. |
-- |          5 | Base de Datos      |             5 | Prof. Miguel Torres M. |
-- |          3 | Química Orgánica   |             4 | Dra. Carmen Velasco R. |
-- |          6 | Estadística        |             4 | Dra. Elena Martín C.   |
-- |          8 | Redes              |             3 | Dra. Patricia Sánch. V.|
-- |          7 | Inglés Técnico     |             3 | Prof. Luis Fernández L.|
-- +------------+--------------------+---------------+------------------------+
-- 8 rows in set (0.04 sec)

-- ====================================================================
-- 🎯 INSTRUCCIONES PARA LAS CAPTURAS
-- ====================================================================
--
-- 1. Capa cada consulta individualmente
-- 2. Asegúrate de que se vea:
--    - La consulta SQL completa
--    - Los resultados en formato tabla
--    - El tiempo de ejecución
--    - El número de filas
--
-- 3. Nombres de archivos:
--    - consulta_1_nota_media.png
--    - consulta_2_rango_notas.png
--    - consulta_3_media_ultimo_ano.png
--    - consulta_4_media_alumno.png
--    - consulta_5_total_alumnos.png
--
-- ====================================================================