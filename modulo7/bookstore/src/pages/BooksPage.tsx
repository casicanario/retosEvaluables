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
}

const BooksPage = () => {
  const { user } = useUser();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

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
      <h1 className="text-3xl font-bold mb-6">Libros</h1>
      {books.length === 0 ? (
        <p className="text-center text-gray-600">No tienes libros todavía. ¡Añade uno!</p>
      ) : (
        <BookList books={books} onBookDeleted={fetchBooks} />
      )}
    </div>
  );
};

export default BooksPage;
