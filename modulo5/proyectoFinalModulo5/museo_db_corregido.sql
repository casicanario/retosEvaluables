-- ===============================================
-- PROYECTO FINAL MÓDULO 5: SISTEMA MUSEO (CORREGIDO)
-- Base de Datos para gestión de piezas de museo
-- ===============================================

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS museo_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE museo_db;

-- ===============================================
-- TABLA: autores
-- ===============================================
CREATE TABLE IF NOT EXISTS autores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    direccion TEXT,
    telefono VARCHAR(20),
    nacionalidad VARCHAR(50),
    fecha_nacimiento DATE,
    fecha_muerte DATE,
    biografia TEXT,
    estilo_artistico VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ===============================================
-- TABLA: colecciones
-- ===============================================
CREATE TABLE IF NOT EXISTS colecciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    tipo_coleccion ENUM('permanente', 'itinerante', 'almacenada') NOT NULL,
    fecha_inicio DATE,
    fecha_fin DATE,
    ubicacion VARCHAR(200),
    responsable_id INT,
    activa BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ===============================================
-- TABLA: expositores_vitrinas
-- ===============================================
CREATE TABLE IF NOT EXISTS expositores_vitrinas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    tipo ENUM('expositor', 'vitrina', 'pedestal', 'pared') NOT NULL,
    ubicacion VARCHAR(200) NOT NULL,
    sala VARCHAR(50),
    descripcion TEXT,
    capacidad_piezas INT DEFAULT 1,
    dimensiones VARCHAR(100),
    climatizacion BOOLEAN DEFAULT FALSE,
    seguridad_especial BOOLEAN DEFAULT FALSE,
    estado ENUM('disponible', 'ocupado', 'mantenimiento') DEFAULT 'disponible',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ===============================================
-- TABLA: piezas (TABLA PRINCIPAL)
-- ===============================================
CREATE TABLE IF NOT EXISTS piezas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo_pieza VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    autor_id INT,
    año_creacion INT,  -- Cambiado de YEAR a INT para soportar años como 1503
    epoca VARCHAR(100),
    material VARCHAR(200),
    tecnica VARCHAR(100),
    dimensiones VARCHAR(100),
    peso DECIMAL(8,2),
    estado_conservacion ENUM('excelente', 'bueno', 'regular', 'malo', 'restauracion') DEFAULT 'bueno',
    valor_estimado DECIMAL(12,2),
    fecha_adquisicion DATE,
    procedencia TEXT,
    ubicacion_actual ENUM('expuesta', 'almacenada', 'prestamo', 'restauracion') DEFAULT 'almacenada',
    coleccion_id INT,
    expositor_vitrina_id INT,
    numero_inventario VARCHAR(100) UNIQUE,
    observaciones TEXT,
    imagen_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Claves foráneas
    FOREIGN KEY (autor_id) REFERENCES autores(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (coleccion_id) REFERENCES colecciones(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (expositor_vitrina_id) REFERENCES expositores_vitrinas(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- ===============================================
-- TABLA: prestamos
-- ===============================================
CREATE TABLE IF NOT EXISTS prestamos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pieza_id INT NOT NULL,
    institucion_prestamo VARCHAR(200) NOT NULL,
    responsable_nombre VARCHAR(100),
    responsable_email VARCHAR(150),
    responsable_telefono VARCHAR(20),
    fecha_prestamo DATE NOT NULL,
    fecha_devolucion_prevista DATE NOT NULL,
    fecha_devolucion_real DATE,
    estado ENUM('pendiente', 'activo', 'devuelto', 'vencido') DEFAULT 'pendiente',
    condiciones_prestamo TEXT,
    seguro_valor DECIMAL(12,2),
    notas TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Claves foráneas
    FOREIGN KEY (pieza_id) REFERENCES piezas(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- ===============================================
-- TABLA: historial_ubicaciones
-- ===============================================
CREATE TABLE IF NOT EXISTS historial_ubicaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pieza_id INT NOT NULL,
    ubicacion_anterior ENUM('expuesta', 'almacenada', 'prestamo', 'restauracion'),
    ubicacion_nueva ENUM('expuesta', 'almacenada', 'prestamo', 'restauracion'),
    expositor_anterior_id INT,
    expositor_nuevo_id INT,
    fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    motivo VARCHAR(200),
    responsable VARCHAR(100),
    observaciones TEXT,
    
    -- Claves foráneas
    FOREIGN KEY (pieza_id) REFERENCES piezas(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (expositor_anterior_id) REFERENCES expositores_vitrinas(id) ON DELETE SET NULL,
    FOREIGN KEY (expositor_nuevo_id) REFERENCES expositores_vitrinas(id) ON DELETE SET NULL
);

-- ===============================================
-- DATOS DE EJEMPLO
-- ===============================================

-- Insertar autores
INSERT INTO autores (nombre, apellidos, nacionalidad, fecha_nacimiento, fecha_muerte, biografia, estilo_artistico) VALUES
('Pablo', 'Picasso', 'España', '1881-10-25', '1973-04-08', 'Pintor y escultor español, creador del cubismo', 'Cubismo'),
('Vincent', 'van Gogh', 'Países Bajos', '1853-03-30', '1890-07-29', 'Pintor postimpresionista neerlandés', 'Postimpresionismo'),
('Leonardo', 'da Vinci', 'Italia', '1452-04-15', '1519-05-02', 'Artista renacentista italiano, inventor y científico', 'Renacimiento'),
('Claude', 'Monet', 'Francia', '1840-11-14', '1926-12-05', 'Pintor francés, fundador del impresionismo', 'Impresionismo'),
('Francisco', 'Goya', 'España', '1746-03-30', '1828-04-16', 'Pintor y grabador español', 'Romanticismo'),
('Salvador', 'Dalí', 'España', '1904-05-11', '1989-01-23', 'Pintor surrealista español', 'Surrealismo');

-- Insertar colecciones
INSERT INTO colecciones (nombre, descripcion, tipo_coleccion, fecha_inicio, ubicacion, activa) VALUES
('Arte Moderno Europeo', 'Colección permanente de arte europeo de los siglos XIX y XX', 'permanente', '2020-01-01', 'Planta 1 - Salas 1-5', TRUE),
('Impresionistas Franceses', 'Exposición temporal de obras impresionistas', 'itinerante', '2024-06-01', 'Planta 2 - Sala Temporal', TRUE),
('Maestros del Renacimiento', 'Obras selectas del período renacentista', 'permanente', '2019-03-15', 'Planta 3 - Salas 6-8', TRUE),
('Arte Contemporáneo', 'Colección de arte del siglo XXI', 'almacenada', '2023-01-01', 'Almacén Principal', FALSE),
('Surrealismo Español', 'Exposición dedicada al movimiento surrealista español', 'itinerante', '2024-09-01', 'Planta 1 - Sala Especial', TRUE);

-- Insertar expositores y vitrinas
INSERT INTO expositores_vitrinas (codigo, tipo, ubicacion, sala, descripcion, capacidad_piezas, climatizacion, seguridad_especial, estado) VALUES
('EXP-001', 'expositor', 'Planta 1 - Pared Norte', 'Sala 1', 'Expositor principal para obras grandes', 1, TRUE, TRUE, 'disponible'),
('VIT-001', 'vitrina', 'Planta 1 - Centro', 'Sala 1', 'Vitrina climatizada para piezas delicadas', 3, TRUE, TRUE, 'ocupado'),
('PED-001', 'pedestal', 'Planta 2 - Esquina SE', 'Sala Temporal', 'Pedestal para esculturas medianas', 1, FALSE, TRUE, 'disponible'),
('EXP-002', 'expositor', 'Planta 3 - Pared Sur', 'Sala 6', 'Expositor para cuadros renacentistas', 1, TRUE, TRUE, 'ocupado'),
('VIT-002', 'vitrina', 'Planta 1 - Lateral Este', 'Sala Especial', 'Vitrina especial para arte contemporáneo', 2, TRUE, TRUE, 'mantenimiento'),
('PED-002', 'pedestal', 'Planta 1 - Centro', 'Sala 2', 'Pedestal giratorio para esculturas', 1, FALSE, TRUE, 'disponible');

-- Insertar piezas (CORREGIDO - año_creacion como INT)
INSERT INTO piezas (codigo_pieza, nombre, descripcion, autor_id, año_creacion, epoca, material, tecnica, dimensiones, estado_conservacion, valor_estimado, fecha_adquisicion, procedencia, ubicacion_actual, coleccion_id, expositor_vitrina_id, numero_inventario) VALUES
('PIC-001', 'Las Señoritas de Avignon', 'Obra maestra del cubismo primitivo', 1, 1907, 'Siglo XX', 'Óleo sobre lienzo', 'Pintura al óleo', '243.9 × 233.7 cm', 'excelente', 150000000.00, '2020-03-15', 'Donación privada', 'expuesta', 1, 1, 'INV-2020-001'),
('VAN-001', 'La Noche Estrellada', 'Famosa obra postimpresionista', 2, 1889, 'Siglo XIX', 'Óleo sobre lienzo', 'Pintura al óleo', '73.7 × 92.1 cm', 'bueno', 100000000.00, '2019-06-20', 'Adquisición en subasta', 'expuesta', 2, 2, 'INV-2019-015'),
('LEO-001', 'La Gioconda (Copia)', 'Copia autorizada de la obra maestra', 3, 1503, 'Renacimiento', 'Óleo sobre tabla', 'Pintura al óleo', '77 × 53 cm', 'excelente', 50000000.00, '2018-01-10', 'Intercambio museístico', 'expuesta', 3, 4, 'INV-2018-003'),
('MON-001', 'Nenúfares', 'Serie de pinturas impresionistas', 4, 1919, 'Siglo XX', 'Óleo sobre lienzo', 'Pintura al óleo', '200 × 300 cm', 'bueno', 75000000.00, '2021-09-05', 'Legado testamentario', 'almacenada', 2, NULL, 'INV-2021-025'),
('GOY-001', 'El Tres de Mayo', 'Obra histórica sobre la guerra', 5, 1814, 'Siglo XIX', 'Óleo sobre lienzo', 'Pintura al óleo', '268 × 347 cm', 'regular', 80000000.00, '2017-11-30', 'Donación estatal', 'restauracion', 1, NULL, 'INV-2017-008'),
('DAL-001', 'La Persistencia de la Memoria', 'Icónica obra surrealista', 6, 1931, 'Siglo XX', 'Óleo sobre lienzo', 'Pintura al óleo', '24 × 33 cm', 'excelente', 120000000.00, '2023-02-14', 'Adquisición directa', 'expuesta', 5, 2, 'INV-2023-001');

-- Insertar préstamos
INSERT INTO prestamos (pieza_id, institucion_prestamo, responsable_nombre, responsable_email, fecha_prestamo, fecha_devolucion_prevista, estado, seguro_valor) VALUES
(4, 'Museo de Arte Moderno de Madrid', 'Dr. Carmen Martínez', 'c.martinez@mamm.es', '2024-08-01', '2024-12-15', 'activo', 75000000.00),
(5, 'Centro de Restauración Nacional', 'Ana García Restoradora', 'a.garcia@crn.es', '2024-01-15', '2024-11-30', 'activo', 80000000.00);

-- Insertar historial
INSERT INTO historial_ubicaciones (pieza_id, ubicacion_anterior, ubicacion_nueva, expositor_nuevo_id, fecha_cambio, motivo, responsable) VALUES
(1, 'almacenada', 'expuesta', 1, '2020-03-20', 'Inauguración nueva colección', 'Dr. López'),
(2, 'almacenada', 'expuesta', 2, '2024-06-01', 'Inicio exposición temporal', 'Dra. Sánchez'),
(3, 'prestamo', 'expuesta', 4, '2018-02-01', 'Fin de préstamo', 'Dr. Rodríguez');

-- Verificar creación
SELECT 'Base de datos museo_db creada correctamente!' as resultado;
SELECT COUNT(*) as total_tablas FROM information_schema.tables WHERE table_schema = 'museo_db';
SELECT table_name as tablas FROM information_schema.tables WHERE table_schema = 'museo_db' ORDER BY table_name;

COMMIT;