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
}

const BookList = ({ books }: BookListProps) => {
  const handleEditBook = (id: number) => {
    console.log('Editar libro:', id);
  };

  const handleDeleteBook = (id: number) => {
    console.log('Eliminar libro:', id);
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
