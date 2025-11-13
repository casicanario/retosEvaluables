-- Actualizar base de datos para añadir campo is_favorite
USE AppBooks;

-- Añadir columna is_favorite a la tabla book
ALTER TABLE book 
ADD COLUMN is_favorite TINYINT(1) DEFAULT 0 AFTER photo;

-- Verificar que se añadió correctamente
DESCRIBE book;
