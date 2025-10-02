-- =============================================
-- 📊 MÓDULO 5 - TEMA 1: ESQUEMA DE BASE DE DATOS
-- =============================================
-- Creación del escenario de trabajo para sistema educativo
-- Base de datos: escuela_db
-- Motor: MySQL 8.0+

-- Crear base de datos
DROP DATABASE IF EXISTS escuela_db;
CREATE DATABASE escuela_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE escuela_db;

-- =============================================
-- 📋 TABLA: direccion
-- =============================================
-- Nota: Según las instrucciones, esta tabla será modificada y eliminada posteriormente
CREATE TABLE direccion (
    direccion_id INT AUTO_INCREMENT PRIMARY KEY,
    calle VARCHAR(100) NOT NULL,
    ciudad VARCHAR(50) NOT NULL,
    codigo_postal VARCHAR(10) NOT NULL,
    pais VARCHAR(50) NOT NULL DEFAULT 'España',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =============================================
-- 👥 TABLA: teams (equipos)
-- =============================================
CREATE TABLE teams (
    team_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =============================================
-- 👨‍🎓 TABLA: students (estudiantes)
-- =============================================
CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(15),
    birth_date DATE,
    enrollment_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    group_id INT,
    team_id INT,
    direccion_id INT,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Índices para mejor rendimiento
    INDEX idx_student_names (first_name, last_name),
    INDEX idx_student_email (email),
    INDEX idx_student_group (group_id),
    
    -- Relaciones
    FOREIGN KEY (team_id) REFERENCES teams(team_id) ON DELETE SET NULL,
    FOREIGN KEY (direccion_id) REFERENCES direccion(direccion_id) ON DELETE SET NULL
);

-- =============================================
-- 👨‍🏫 TABLA: teachers (profesores)
-- =============================================
CREATE TABLE teachers (
    teacher_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    hire_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    department VARCHAR(50),
    salary DECIMAL(10,2),
    direccion_id INT,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Índices
    INDEX idx_teacher_names (first_name, last_name),
    INDEX idx_teacher_email (email),
    INDEX idx_teacher_department (department),
    
    -- Relaciones
    FOREIGN KEY (direccion_id) REFERENCES direccion(direccion_id) ON DELETE SET NULL
);

-- =============================================
-- 📚 TABLA: subjects (asignaturas)
-- =============================================
CREATE TABLE subjects (
    subject_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    credits INT DEFAULT 3,
    semester ENUM('1', '2', 'both') DEFAULT 'both',
    level ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Índices
    INDEX idx_subject_title (title),
    INDEX idx_subject_level (level)
);

-- =============================================
-- 🔗 TABLA: subject_teacher (relación many-to-many)
-- =============================================
CREATE TABLE subject_teacher (
    subject_id INT NOT NULL,
    teacher_id INT NOT NULL,
    group_id INT,
    academic_year YEAR DEFAULT (YEAR(CURDATE())),
    assigned_date DATE DEFAULT (CURRENT_DATE),
    
    -- Clave primaria compuesta
    PRIMARY KEY (subject_id, teacher_id, group_id),
    
    -- Índices
    INDEX idx_st_subject (subject_id),
    INDEX idx_st_teacher (teacher_id),
    INDEX idx_st_group (group_id),
    INDEX idx_st_year (academic_year),
    
    -- Relaciones
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id) ON DELETE CASCADE
);

-- =============================================
-- 📊 TABLA: marks (notas)
-- =============================================
CREATE TABLE marks (
    mark_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    subject_id INT NOT NULL,
    teacher_id INT,
    mark DECIMAL(4,2) NOT NULL CHECK (mark >= 0 AND mark <= 10),
    exam_type ENUM('parcial', 'final', 'proyecto', 'practica', 'continua') DEFAULT 'parcial',
    exam_date DATE NOT NULL,
    comments TEXT,
    academic_year YEAR DEFAULT (YEAR(CURDATE())),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Índices para consultas optimizadas
    INDEX idx_mark_student (student_id),
    INDEX idx_mark_subject (subject_id),
    INDEX idx_mark_teacher (teacher_id),
    INDEX idx_mark_date (exam_date),
    INDEX idx_mark_year (academic_year),
    INDEX idx_mark_value (mark),
    
    -- Índice compuesto para consultas frecuentes
    INDEX idx_student_subject_year (student_id, subject_id, academic_year),
    
    -- Relaciones
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id) ON DELETE SET NULL
);

-- =============================================
-- 📊 INSERTAR DATOS DE EJEMPLO
-- =============================================

-- Insertar direcciones
INSERT INTO direccion (calle, ciudad, codigo_postal, pais) VALUES
('Calle Mayor 123', 'Madrid', '28001', 'España'),
('Avenida Libertad 45', 'Barcelona', '08001', 'España'),
('Plaza España 12', 'Valencia', '46001', 'España'),
('Calle Paz 67', 'Sevilla', '41001', 'España'),
('Gran Vía 89', 'Bilbao', '48001', 'España'),
('Calle Luna 34', 'Zaragoza', '50001', 'España'),
('Avenida Sol 78', 'Málaga', '29001', 'España'),
('Plaza Mayor 56', 'Salamanca', '37001', 'España'),
('Calle Flores 90', 'Granada', '18001', 'España'),
('Paseo Central 23', 'Córdoba', '14001', 'España');

-- Insertar equipos
INSERT INTO teams (name, description) VALUES
('Águilas', 'Equipo de estudiantes destacados en ciencias'),
('Leones', 'Equipo especializado en matemáticas y física'),
('Tigres', 'Equipo enfocado en tecnología e informática'),
('Delfines', 'Equipo de estudiantes de humanidades'),
('Halcones', 'Equipo multidisciplinario de excelencia');

-- Insertar profesores
INSERT INTO teachers (first_name, last_name, email, phone, department, salary, direccion_id) VALUES
('María', 'García López', 'maria.garcia@escuela.edu', '600123456', 'Matemáticas', 3500.00, 1),
('Juan', 'Martínez Ruiz', 'juan.martinez@escuela.edu', '600234567', 'Física', 3400.00, 2),
('Ana', 'Rodríguez Silva', 'ana.rodriguez@escuela.edu', '600345678', 'Química', 3300.00, 3),
('Carlos', 'López Fernández', 'carlos.lopez@escuela.edu', '600456789', 'Historia', 3200.00, 4),
('Laura', 'Sánchez Torres', 'laura.sanchez@escuela.edu', '600567890', 'Inglés', 3100.00, 5),
('Miguel', 'Díaz Morales', 'miguel.diaz@escuela.edu', '600678901', 'Informática', 3600.00, 6),
('Elena', 'Jiménez Castro', 'elena.jimenez@escuela.edu', '600789012', 'Biología', 3250.00, 7),
('David', 'Ruiz Vargas', 'david.ruiz@escuela.edu', '600890123', 'Literatura', 3150.00, 8);

-- Insertar asignaturas
INSERT INTO subjects (title, description, credits, level) VALUES
('Matemáticas I', 'Fundamentos de álgebra y geometría', 6, 'beginner'),
('Física General', 'Principios básicos de mecánica y termodinámica', 6, 'intermediate'),
('Química Orgánica', 'Estudio de compuestos del carbono', 4, 'advanced'),
('Historia Universal', 'Desde la antigüedad hasta el siglo XXI', 4, 'beginner'),
('Inglés Avanzado', 'Conversación y escritura académica', 3, 'advanced'),
('Programación I', 'Fundamentos de programación con Python', 5, 'beginner'),
('Biología Molecular', 'Procesos celulares y genética', 5, 'advanced'),
('Literatura Española', 'Desde el Siglo de Oro hasta la actualidad', 4, 'intermediate'),
('Matemáticas II', 'Cálculo diferencial e integral', 6, 'intermediate'),
('Bases de Datos', 'Diseño y gestión de bases de datos relacionales', 4, 'intermediate');

-- Insertar estudiantes
INSERT INTO students (first_name, last_name, email, phone, birth_date, group_id, team_id, direccion_id) VALUES
('Pedro', 'González Martín', 'pedro.gonzalez@estudiante.edu', '700123456', '2003-05-15', 1, 1, 1),
('Sofía', 'Hernández López', 'sofia.hernandez@estudiante.edu', '700234567', '2003-08-22', 1, 2, 2),
('Diego', 'Muñoz García', 'diego.munoz@estudiante.edu', '700345678', '2003-12-10', 2, 1, 3),
('Carmen', 'Torres Ruiz', 'carmen.torres@estudiante.edu', '700456789', '2004-03-18', 2, 3, 4),
('Alejandro', 'Morales Silva', 'alejandro.morales@estudiante.edu', '700567890', '2003-07-09', 1, 2, 5),
('Natalia', 'Castro Jiménez', 'natalia.castro@estudiante.edu', '700678901', '2003-11-25', 3, 4, 6),
('Roberto', 'Vargas Díaz', 'roberto.vargas@estudiante.edu', '700789012', '2004-01-14', 3, 3, 7),
('Isabel', 'Ramos Pérez', 'isabel.ramos@estudiante.edu', '700890123', '2003-09-30', 2, 5, 8),
('Javier', 'Ortiz Herrera', 'javier.ortiz@estudiante.edu', '700901234', '2004-04-06', 1, 1, 9),
('Lucía', 'Medina Santos', 'lucia.medina@estudiante.edu', '700012345', '2003-10-12', 3, 4, 10),
('Raúl', 'Iglesias Vega', 'raul.iglesias@estudiante.edu', '700112233', '2003-06-28', 2, 2, 1),
('Beatriz', 'Gil Román', 'beatriz.gil@estudiante.edu', '700223344', '2004-02-17', 1, 5, 2);

-- Insertar relaciones subject_teacher
INSERT INTO subject_teacher (subject_id, teacher_id, group_id) VALUES
(1, 1, 1), (1, 1, 2), (1, 1, 3),  -- María enseña Matemáticas I a todos los grupos
(2, 2, 1), (2, 2, 2),             -- Juan enseña Física a grupos 1 y 2
(3, 3, 2), (3, 3, 3),             -- Ana enseña Química a grupos 2 y 3
(4, 4, 1), (4, 4, 3),             -- Carlos enseña Historia a grupos 1 y 3
(5, 5, 2), (5, 5, 3),             -- Laura enseña Inglés a grupos 2 y 3
(6, 6, 1), (6, 6, 2), (6, 6, 3),  -- Miguel enseña Programación a todos
(7, 7, 3),                        -- Elena enseña Biología a grupo 3
(8, 8, 1), (8, 8, 2),             -- David enseña Literatura a grupos 1 y 2
(9, 1, 2), (9, 1, 3),             -- María también enseña Matemáticas II
(10, 6, 2), (10, 6, 3);           -- Miguel también enseña Bases de Datos

-- Insertar notas (marks) - Datos variados con diferentes fechas y años
INSERT INTO marks (student_id, subject_id, teacher_id, mark, exam_type, exam_date, comments, academic_year) VALUES
-- Estudiante 1 (Pedro González)
(1, 1, 1, 8.5, 'parcial', '2024-10-15', 'Excelente comprensión de álgebra', 2024),
(1, 2, 2, 7.2, 'parcial', '2024-11-20', 'Necesita reforzar mecánica', 2024),
(1, 6, 6, 9.1, 'proyecto', '2024-12-10', 'Proyecto de Python muy creativo', 2024),
(1, 1, 1, 8.8, 'final', '2025-01-25', 'Mejoró notablemente', 2025),

-- Estudiante 2 (Sofía Hernández)
(2, 1, 1, 9.3, 'parcial', '2024-10-15', 'Sobresaliente en geometría', 2024),
(2, 5, 5, 8.7, 'parcial', '2024-11-12', 'Muy buena pronunciación', 2024),
(2, 6, 6, 8.9, 'proyecto', '2024-12-10', 'Código muy limpio y documentado', 2024),

-- Estudiante 3 (Diego Muñoz)
(3, 3, 3, 6.8, 'parcial', '2024-10-22', 'Debe practicar más las reacciones', 2024),
(3, 2, 2, 7.5, 'parcial', '2024-11-20', 'Buen progreso en física', 2024),
(3, 6, 6, 8.2, 'proyecto', '2024-12-10', 'Buen trabajo en equipo', 2024),

-- Estudiante 4 (Carmen Torres)
(4, 3, 3, 8.1, 'parcial', '2024-10-22', 'Muy aplicada en laboratorio', 2024),
(4, 4, 4, 9.0, 'parcial', '2024-11-18', 'Excelente análisis histórico', 2024),
(4, 5, 5, 7.8, 'parcial', '2024-11-12', 'Progresa bien en speaking', 2024),

-- Estudiante 5 (Alejandro Morales)
(5, 1, 1, 7.9, 'parcial', '2024-10-15', 'Constante en su rendimiento', 2024),
(5, 2, 2, 8.3, 'parcial', '2024-11-20', 'Destaca en termodinámica', 2024),
(5, 6, 6, 9.5, 'proyecto', '2024-12-10', 'Proyecto excepcional', 2024),

-- Estudiante 6 (Natalia Castro)
(6, 7, 7, 8.6, 'parcial', '2024-10-25', 'Muy interesada en genética', 2024),
(6, 5, 5, 9.2, 'parcial', '2024-11-12', 'Nivel avanzado excelente', 2024),
(6, 6, 6, 8.4, 'proyecto', '2024-12-10', 'Creatividad en la solución', 2024),

-- Estudiante 7 (Roberto Vargas)
(7, 3, 3, 7.3, 'parcial', '2024-10-22', 'Mejorando en química orgánica', 2024),
(7, 7, 7, 8.8, 'parcial', '2024-10-25', 'Destaca en biología molecular', 2024),
(7, 6, 6, 7.6, 'proyecto', '2024-12-10', 'Proyecto funcional', 2024),

-- Estudiante 8 (Isabel Ramos)
(8, 4, 4, 8.9, 'parcial', '2024-11-18', 'Análisis crítico excepcional', 2024),
(8, 8, 8, 9.4, 'parcial', '2024-11-15', 'Sobresaliente en literatura', 2024),
(8, 2, 2, 7.1, 'parcial', '2024-11-20', 'Necesita más práctica', 2024),

-- Estudiante 9 (Javier Ortiz)
(9, 1, 1, 6.9, 'parcial', '2024-10-15', 'Progreso lento pero constante', 2024),
(9, 6, 6, 8.7, 'proyecto', '2024-12-10', 'Gran mejora en programming', 2024),
(9, 8, 8, 8.2, 'parcial', '2024-11-15', 'Buen análisis literario', 2024),

-- Estudiante 10 (Lucía Medina)
(10, 7, 7, 9.1, 'parcial', '2024-10-25', 'Excelente en biología', 2024),
(10, 5, 5, 8.5, 'parcial', '2024-11-12', 'Muy buena en inglés avanzado', 2024),
(10, 6, 6, 8.8, 'proyecto', '2024-12-10', 'Código elegante y eficiente', 2024),

-- Notas más antiguas (para testing de consultas por fecha)
(1, 1, 1, 7.5, 'final', '2014-06-15', 'Nota histórica de hace más de 10 años', 2014),
(2, 1, 1, 8.0, 'final', '2013-06-20', 'Nota muy antigua', 2013),
(3, 2, 2, 6.5, 'final', '2012-06-18', 'Nota de archivo', 2012),

-- Notas con valor 0 (para testing)
(11, 1, 1, 0.0, 'parcial', '2024-10-15', 'No se presentó al examen', 2024),
(12, 2, 2, 0.0, 'parcial', '2024-11-20', 'Examen en blanco', 2024);

-- =============================================
-- 📊 VERIFICACIÓN DE DATOS INSERTADOS
-- =============================================

-- Mostrar resumen de registros insertados
SELECT 
    'direccion' as tabla, COUNT(*) as registros FROM direccion
UNION ALL
SELECT 'teams' as tabla, COUNT(*) as registros FROM teams
UNION ALL
SELECT 'teachers' as tabla, COUNT(*) as registros FROM teachers
UNION ALL
SELECT 'subjects' as tabla, COUNT(*) as registros FROM subjects
UNION ALL
SELECT 'students' as tabla, COUNT(*) as registros FROM students
UNION ALL
SELECT 'subject_teacher' as tabla, COUNT(*) as registros FROM subject_teacher
UNION ALL
SELECT 'marks' as tabla, COUNT(*) as registros FROM marks;

-- =============================================
-- 📝 NOTAS IMPORTANTES
-- =============================================
/*
🎯 CARACTERÍSTICAS DEL ESQUEMA:

1. ✅ Tabla 'direccion' creada (será modificada y eliminada posteriormente)
2. ✅ Relaciones definidas con FOREIGN KEYS
3. ✅ Índices optimizados para consultas frecuentes
4. ✅ Datos de ejemplo con variedad de fechas, estudiantes y profesores
5. ✅ Constrains de validación (notas entre 0-10)
6. ✅ Campos de auditoría (created_at, updated_at)

📊 DATOS INSERTADOS:
- 10 direcciones
- 5 equipos
- 8 profesores
- 10 asignaturas
- 12 estudiantes
- 10 relaciones subject_teacher
- ~35 notas con variedad de fechas y tipos

⚠️ PRÓXIMO PASO:
Este esquema será usado para realizar las consultas SQL especificadas en la Parte 2.
*/