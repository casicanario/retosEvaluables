# Actualizaciones necesarias en el Backend para Favoritos

## 1. Actualizar Base de Datos MySQL

Ejecuta este SQL en tu base de datos `AppBooks`:

```sql
ALTER TABLE book 
ADD COLUMN is_favorite TINYINT(1) DEFAULT 0 AFTER photo;
```

## 2. Actualizar bookRoutes.js

Añade esta nueva ruta en `apiBooks/routes/bookRoutes.js`:

```javascript
// PUT /api/books/:id_book/favorite - Marcar/desmarcar como favorito
router.put('/:id_book/favorite', async (req, res) => {
  try {
    const { id_book } = req.params;
    const { id_user, is_favorite } = req.body;

    // Verificar que el libro pertenece al usuario
    const [book] = await connection.query(
      'SELECT * FROM book WHERE id_book = ? AND id_user = ?',
      [id_book, id_user]
    );

    if (book.length === 0) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }

    // Actualizar is_favorite
    await connection.query(
      'UPDATE book SET is_favorite = ? WHERE id_book = ?',
      [is_favorite ? 1 : 0, id_book]
    );

    res.json({ message: 'Favorito actualizado', is_favorite });
  } catch (error) {
    console.error('Error al actualizar favorito:', error);
    res.status(500).json({ error: 'Error al actualizar favorito' });
  }
});
```

## 3. Reiniciar el servidor backend

Después de hacer los cambios, reinicia el servidor:
```bash
cd C:\Codenotch\retosEvaluables\ProyectoFinalDesarrolloWeb\apiBooks
npm start
```
