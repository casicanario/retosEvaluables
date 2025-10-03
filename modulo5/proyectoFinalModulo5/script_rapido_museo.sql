-- SCRIPT RÁPIDO PARA CREAR BASE DE DATOS DEL MUSEO
-- Copia y pega esto completo en MySQL Workbench

CREATE DATABASE IF NOT EXISTS museo_db;
USE museo_db;

-- Tabla autores
CREATE TABLE autores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    nacionalidad VARCHAR(50),
    fecha_nacimiento DATE,
    fecha_muerte DATE,
    estilo_artistico VARCHAR(100)
);

-- Tabla colecciones
CREATE TABLE colecciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    tipo_coleccion ENUM('permanente', 'itinerante', 'almacenada') NOT NULL,
    fecha_inicio DATE,
    ubicacion VARCHAR(200)
);

-- Tabla expositores_vitrinas
CREATE TABLE expositores_vitrinas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    tipo ENUM('expositor', 'vitrina', 'pedestal', 'pared') NOT NULL,
    ubicacion VARCHAR(200) NOT NULL,
    sala VARCHAR(50)
);

-- Tabla piezas (principal)
CREATE TABLE piezas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo_pieza VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    autor_id INT,
    año_creacion YEAR,
    epoca VARCHAR(100),
    material VARCHAR(200),
    estado_conservacion ENUM('excelente', 'bueno', 'regular', 'malo') DEFAULT 'bueno',
    valor_estimado DECIMAL(12,2),
    ubicacion_actual ENUM('expuesta', 'almacenada', 'prestamo', 'restauracion') DEFAULT 'almacenada',
    coleccion_id INT,
    expositor_vitrina_id INT,
    FOREIGN KEY (autor_id) REFERENCES autores(id),
    FOREIGN KEY (coleccion_id) REFERENCES colecciones(id),
    FOREIGN KEY (expositor_vitrina_id) REFERENCES expositores_vitrinas(id)
);

-- Tabla prestamos
CREATE TABLE prestamos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pieza_id INT NOT NULL,
    institucion_prestamo VARCHAR(200) NOT NULL,
    responsable_nombre VARCHAR(100),
    fecha_prestamo DATE NOT NULL,
    fecha_devolucion_prevista DATE NOT NULL,
    estado ENUM('pendiente', 'activo', 'devuelto') DEFAULT 'pendiente',
    FOREIGN KEY (pieza_id) REFERENCES piezas(id)
);

-- Tabla historial_ubicaciones
CREATE TABLE historial_ubicaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pieza_id INT NOT NULL,
    ubicacion_anterior ENUM('expuesta', 'almacenada', 'prestamo', 'restauracion'),
    ubicacion_nueva ENUM('expuesta', 'almacenada', 'prestamo', 'restauracion'),
    fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    motivo VARCHAR(200),
    FOREIGN KEY (pieza_id) REFERENCES piezas(id)
);

-- DATOS DE EJEMPLO
INSERT INTO autores (nombre, apellidos, nacionalidad, fecha_nacimiento, fecha_muerte, estilo_artistico) VALUES
('Pablo', 'Picasso', 'España', '1881-10-25', '1973-04-08', 'Cubismo'),
('Vincent', 'van Gogh', 'Países Bajos', '1853-03-30', '1890-07-29', 'Postimpresionismo'),
('Leonardo', 'da Vinci', 'Italia', '1452-04-15', '1519-05-02', 'Renacimiento');

INSERT INTO colecciones (nombre, descripcion, tipo_coleccion, fecha_inicio, ubicacion) VALUES
('Arte Moderno Europeo', 'Colección permanente de arte europeo', 'permanente', '2020-01-01', 'Planta 1'),
('Impresionistas', 'Obras impresionistas', 'itinerante', '2024-06-01', 'Planta 2'),
('Renacimiento', 'Obras renacentistas', 'permanente', '2019-03-15', 'Planta 3');

INSERT INTO expositores_vitrinas (codigo, tipo, ubicacion, sala) VALUES
('EXP-001', 'expositor', 'Planta 1 - Norte', 'Sala 1'),
('VIT-001', 'vitrina', 'Planta 1 - Centro', 'Sala 1'),
('EXP-002', 'expositor', 'Planta 3 - Sur', 'Sala 6');

INSERT INTO piezas (codigo_pieza, nombre, descripcion, autor_id, año_creacion, epoca, material, estado_conservacion, valor_estimado, ubicacion_actual, coleccion_id, expositor_vitrina_id) VALUES
('PIC-001', 'Las Señoritas de Avignon', 'Obra maestra del cubismo', 1, 1907, 'Siglo XX', 'Óleo sobre lienzo', 'excelente', 150000000.00, 'expuesta', 1, 1),
('VAN-001', 'La Noche Estrellada', 'Famosa obra postimpresionista', 2, 1889, 'Siglo XIX', 'Óleo sobre lienzo', 'bueno', 100000000.00, 'expuesta', 2, 2),
('LEO-001', 'La Gioconda (Copia)', 'Copia de la obra maestra', 3, 1503, 'Renacimiento', 'Óleo sobre tabla', 'excelente', 50000000.00, 'expuesta', 3, 3);

INSERT INTO prestamos (pieza_id, institucion_prestamo, responsable_nombre, fecha_prestamo, fecha_devolucion_prevista, estado) VALUES
(2, 'Museo de Madrid', 'Dr. Carmen Martínez', '2024-08-01', '2024-12-15', 'activo');

INSERT INTO historial_ubicaciones (pieza_id, ubicacion_anterior, ubicacion_nueva, motivo) VALUES
(1, 'almacenada', 'expuesta', 'Nueva exposición'),
(2, 'almacenada', 'expuesta', 'Exposición temporal');

-- Verificar que todo se creó correctamente
SELECT 'Base de datos museo_db creada correctamente!' as resultado;
SHOW TABLES;