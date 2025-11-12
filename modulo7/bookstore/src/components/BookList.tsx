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
}

interface BookListProps {
  books: Book[];
  onBookDeleted: () => void;
}

const BookList = ({ books, onBookDeleted }: BookListProps) => {
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
          onEdit={handleEditBook}
          onDelete={handleDeleteBook}
        />
      ))}
    </div>
  );
};

export default BookList;
