import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useUser } from '../contexts/UserContext';
import BookItem from './BookItem';

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

interface BookListProps {
  books: Book[];
  onBookDeleted: () => void;
  onFavoriteToggled: () => void;
}

const BookList = ({ books, onBookDeleted, onFavoriteToggled }: BookListProps) => {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleEditBook = (id: number) => {
    navigate(`/editbook/${id}`);
  };

  const handleDeleteBook = async (id: number) => {
    if (!user) {
      toast.error('No hay usuario autenticado');
      return;
    }

    if (!window.confirm('¿Estás seguro de que quieres eliminar este libro?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/api/books/${id}`, {
        data: { id_user: user.id_user }
      });

      toast.success('Libro eliminado exitosamente');
      onBookDeleted();
    } catch (error: any) {
      toast.error('Error al eliminar el libro');
      console.error('Error deleting book:', error);
    }
  };

  const handleToggleFavorite = async (id: number, currentFavorite: number) => {
    if (!user) {
      toast.error('No hay usuario autenticado');
      return;
    }

    try {
      await axios.put(`http://localhost:3000/api/books/${id}/favorite`, {
        id_user: user.id_user,
        is_favorite: currentFavorite === 1 ? 0 : 1
      });

      toast.success(currentFavorite === 1 ? 'Eliminado de favoritos' : 'Añadido a favoritos');
      onFavoriteToggled();
    } catch (error: any) {
      toast.error('Error al actualizar favorito');
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <BookItem
          key={book.id_book}
          id={book.id_book}
          title={book.title}
          author={book.author}
          isbn={`${book.id_book}-${book.type}`}
          image={book.photo}
          isFavorite={book.is_favorite === 1}
          onEdit={handleEditBook}
          onDelete={handleDeleteBook}
          onToggleFavorite={() => handleToggleFavorite(book.id_book, book.is_favorite || 0)}
        />
      ))}
    </div>
  );
};

export default BookList;
