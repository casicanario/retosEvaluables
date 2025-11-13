
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

// ========================================
// NO OLVIDES REINICIAR EL SERVIDOR BACKEND DESPUÉS
// ========================================
