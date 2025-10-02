-- ===================================================
-- 🚀 CREACIÓN AUTOMÁTICA BASE DE DATOS ESCUELA_DB
-- ===================================================
-- 
-- Script para crear rápidamente la base de datos
-- y poblarla con datos de ejemplo para las capturas
--
-- Autor: Estudiante Codenotch
-- Fecha: Octubre 2025
-- ===================================================

-- Crear base de datos
DROP DATABASE IF EXISTS escuela_db;
CREATE DATABASE escuela_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE escuela_db;

-- ===============================
-- 📚 TABLA ASIGNATURAS
-- ===============================
CREATE TABLE subjects (
    subject_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    course VARCHAR(10),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===============================
-- 👨‍🎓 TABLA ESTUDIANTES  
-- ===============================
CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    enrollment_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===============================
-- 👨‍🏫 TABLA PROFESORES
-- ===============================
CREATE TABLE teachers (
    teacher_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    hire_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===============================
-- 📊 TABLA NOTAS
-- ===============================
CREATE TABLE marks (
    mark_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    subject_id INT,
    mark DECIMAL(4,2),
    date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)
);

-- ===============================
-- 🔗 TABLA ASIGNATURA-PROFESOR
-- ===============================
CREATE TABLE subject_teacher (
    subject_id INT,
    teacher_id INT,
    assigned_date DATE DEFAULT (CURRENT_DATE),
    PRIMARY KEY (subject_id, teacher_id),
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id),
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id)
);

-- ===================================================
-- 📊 INSERTAR DATOS DE EJEMPLO
-- ===================================================

-- Insertar asignaturas
INSERT INTO subjects (title, course, description) VALUES
('Matemáticas I', '1º', 'Álgebra y Cálculo básico'),
('Física II', '2º', 'Mecánica y Termodinámica'),
('Química Orgánica', '3º', 'Compuestos orgánicos avanzados'),
('Programación', '1º', 'Fundamentos de programación'),
('Base de Datos', '2º', 'Diseño y administración de BD'),
('Estadística', '2º', 'Análisis estadístico y probabilidad'),
('Inglés Técnico', '1º', 'Inglés para ingeniería'),
('Redes de Computadoras', '3º', 'Protocolos y arquitecturas de red');

-- Insertar estudiantes
INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES
('Juan', 'Pérez García', 'juan.perez@email.com', '2023-09-01'),
('María', 'González López', 'maria.gonzalez@email.com', '2023-09-01'),
('Ana', 'García Martín', 'ana.garcia@email.com', '2024-01-15'),
('Carlos', 'Martínez Ruiz', 'carlos.martinez@email.com', '2023-09-01'),
('Laura', 'Rodríguez Sánchez', 'laura.rodriguez@email.com', '2024-01-15'),
('Pedro', 'López Fernández', 'pedro.lopez@email.com', '2023-09-01'),
('Carmen', 'Sánchez Torres', 'carmen.sanchez@email.com', '2024-01-15'),
('José', 'Jiménez Morales', 'jose.jimenez@email.com', '2023-09-01'),
('Isabel', 'Torres Vargas', 'isabel.torres@email.com', '2024-01-15'),
('Miguel', 'Vargas Castro', 'miguel.vargas@email.com', '2023-09-01'),
('Elena', 'Castro Herrera', 'elena.castro@email.com', '2024-01-15'),
('Roberto', 'Herrera Delgado', 'roberto.herrera@email.com', '2023-09-01'),
('Lucía', 'Delgado Romero', 'lucia.delgado@email.com', '2024-01-15'),
('Fernando', 'Romero Guerrero', 'fernando.romero@email.com', '2023-09-01'),
('Pilar', 'Guerrero Medina', 'pilar.guerrero@email.com', '2024-01-15');

-- Insertar profesores
INSERT INTO teachers (first_name, last_name, email, hire_date) VALUES
('Dr. Roberto', 'Jiménez Silva', 'roberto.jimenez@universidad.edu', '2020-01-15'),
('Dra. Carmen', 'Velasco Ruiz', 'carmen.velasco@universidad.edu', '2019-08-20'),
('Prof. Miguel', 'Torres Morales', 'miguel.torres@universidad.edu', '2021-02-10'),
('Dra. Elena', 'Martín Castro', 'elena.martin@universidad.edu', '2018-09-05'),
('Prof. Luis', 'Fernández López', 'luis.fernandez@universidad.edu', '2022-03-12'),
('Dra. Patricia', 'Sánchez Vargas', 'patricia.sanchez@universidad.edu', '2020-07-18');

-- Asignar profesores a asignaturas
INSERT INTO subject_teacher (subject_id, teacher_id, assigned_date) VALUES
(1, 1, '2023-08-01'), -- Matemáticas I - Dr. Roberto
(2, 2, '2023-08-01'), -- Física II - Dra. Carmen
(3, 2, '2023-08-01'), -- Química - Dra. Carmen
(4, 3, '2023-08-01'), -- Programación - Prof. Miguel
(5, 3, '2023-08-01'), -- Base de Datos - Prof. Miguel
(6, 4, '2023-08-01'), -- Estadística - Dra. Elena
(7, 5, '2023-08-01'), -- Inglés - Prof. Luis
(8, 6, '2023-08-01'); -- Redes - Dra. Patricia

-- ===================================================
-- 📊 INSERTAR NOTAS (INCLUYE DATOS DE 2024 Y 2025)
-- ===================================================

-- Notas de 2024 (año pasado)
INSERT INTO marks (student_id, subject_id, mark, date) VALUES
-- Matemáticas I - 2024
(1, 1, 7.5, '2024-05-15'),
(2, 1, 8.2, '2024-05-15'),
(3, 1, 6.8, '2024-05-15'),
(4, 1, 9.1, '2024-05-15'),
(5, 1, 5.7, '2024-05-15'),
(6, 1, 7.9, '2024-05-15'),
(7, 1, 8.5, '2024-05-15'),
(8, 1, 6.3, '2024-05-15'),

-- Física II - 2024
(1, 2, 6.9, '2024-06-20'),
(2, 2, 7.8, '2024-06-20'),
(3, 2, 8.5, '2024-06-20'),
(4, 2, 7.2, '2024-06-20'),
(5, 2, 6.1, '2024-06-20'),
(9, 2, 8.8, '2024-06-20'),
(10, 2, 7.6, '2024-06-20'),

-- Programación - 2024
(1, 4, 9.2, '2024-04-10'),
(2, 4, 8.7, '2024-04-10'),
(4, 4, 7.3, '2024-04-10'),
(5, 4, 8.9, '2024-04-10'),
(6, 4, 8.1, '2024-04-10'),
(11, 4, 9.5, '2024-04-10'),
(12, 4, 8.3, '2024-04-10'),

-- Base de Datos - 2024
(2, 5, 7.6, '2024-07-08'),
(3, 5, 8.1, '2024-07-08'),
(4, 5, 6.5, '2024-07-08'),
(7, 5, 9.0, '2024-07-08'),
(8, 5, 7.4, '2024-07-08'),

-- Notas de 2025 (año actual)
-- Matemáticas I - 2025
(1, 1, 8.0, '2025-03-15'),
(2, 1, 8.5, '2025-03-15'),
(3, 1, 7.2, '2025-03-15'),
(9, 1, 9.3, '2025-03-15'),
(10, 1, 6.8, '2025-03-15'),

-- Física II - 2025
(2, 2, 8.2, '2025-04-18'),
(3, 2, 9.1, '2025-04-18'),
(4, 2, 7.7, '2025-04-18'),
(11, 2, 8.9, '2025-04-18'),

-- Química Orgánica - 2025
(3, 3, 7.8, '2025-05-22'),
(4, 3, 8.4, '2025-05-22'),
(7, 3, 9.2, '2025-05-22'),
(12, 3, 7.1, '2025-05-22'),

-- Estadística - 2025
(5, 6, 8.6, '2025-02-28'),
(6, 6, 7.9, '2025-02-28'),
(13, 6, 9.4, '2025-02-28'),
(14, 6, 8.1, '2025-02-28'),

-- Inglés Técnico - 2025
(8, 7, 7.3, '2025-01-25'),
(9, 7, 8.7, '2025-01-25'),
(15, 7, 9.0, '2025-01-25'),

-- Redes - 2025
(10, 8, 8.8, '2025-06-12'),
(11, 8, 7.5, '2025-06-12'),
(12, 8, 9.1, '2025-06-12');

-- ===================================================
-- ✅ VERIFICACIÓN DE DATOS
-- ===================================================

SELECT '📊 RESUMEN DE DATOS INSERTADOS:' as RESULTADO;
SELECT 
    (SELECT COUNT(*) FROM subjects) as Total_Asignaturas,
    (SELECT COUNT(*) FROM students) as Total_Estudiantes,
    (SELECT COUNT(*) FROM teachers) as Total_Profesores,
    (SELECT COUNT(*) FROM marks) as Total_Notas,
    (SELECT COUNT(*) FROM subject_teacher) as Total_Asignaciones;

SELECT '🎯 DATOS LISTOS PARA LAS CONSULTAS!' as ESTADO;