import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useUser } from '../contexts/UserContext';
import BookList from '../components/BookList';

interface Book {
  id_book: number;
  id_user: number;
  title: string;
  type: string;
  author: string;
  price: number;
  photo: string;
  is_favorite?: number;
}

const BooksPage = () => {
  const { user } = useUser();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const fetchBooks = useCallback(async () => {
    try {
      if (!user) {
        toast.error('No hay usuario autenticado');
        setLoading(false);
        return;
      }

      const response = await axios.get(`http://localhost:3000/api/books?id_user=${user.id_user}`);
      
      setBooks(response.data);
      setLoading(false);
    } catch (error: any) {
      toast.error('Error al cargar los libros');
      console.error('Error fetching books:', error);
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Libros</h1>
        <p className="text-center text-gray-600">Cargando libros...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Libros</h1>
        <button
          onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            showOnlyFavorites
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
        >
          {showOnlyFavorites ? '❤️ Mostrar todos' : '🤍 Solo favoritos'}
        </button>
      </div>
      {books.length === 0 ? (
        <p className="text-center text-gray-600">No tienes libros todavía. ¡Añade uno!</p>
      ) : (
        <BookList 
          books={showOnlyFavorites ? books.filter(book => book.is_favorite === 1) : books} 
          onBookDeleted={fetchBooks}
          onFavoriteToggled={fetchBooks}
        />
      )}
    </div>
  );
};

export default BooksPage;
