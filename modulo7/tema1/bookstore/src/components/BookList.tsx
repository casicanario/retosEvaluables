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
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

const BookList = ({ books, onEdit, onDelete }: BookListProps) => {
  return (
    <div className="grid grid-cols-5 gap-4">
      {books.map((book) => (
        <BookItem 
          key={book.id_book} 
          book={book} 
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default BookList;
