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

const BookList = () => {
  const books: Book[] = [
    {
      id_book: 1,
      id_user: 1,
      title: 'El Perfume',
      type: 'Novela',
      author: 'Patrick Süskind',
      price: 18.50,
      photo: 'https://images-na.ssl-images-amazon.com/images/I/71QY5JY-ZgL.jpg'
    },
    {
      id_book: 2,
      id_user: 1,
      title: 'Cien años de soledad',
      type: 'Novela',
      author: 'Gabriel García Márquez',
      price: 22.00,
      photo: 'https://images-na.ssl-images-amazon.com/images/I/91TvVQS7loL.jpg'
    },
    {
      id_book: 3,
      id_user: 2,
      title: '1984',
      type: 'Distopía',
      author: 'George Orwell',
      price: 15.90,
      photo: 'https://images-na.ssl-images-amazon.com/images/I/71rpa1-kyvL.jpg'
    },
    {
      id_book: 4,
      id_user: 2,
      title: 'El principito',
      type: 'Fábula',
      author: 'Antoine de Saint-Exupéry',
      price: 12.50,
      photo: 'https://images-na.ssl-images-amazon.com/images/I/71OZY035FKL.jpg'
    },
    {
      id_book: 5,
      id_user: 3,
      title: 'Don Quijote de la Mancha',
      type: 'Novela',
      author: 'Miguel de Cervantes',
      price: 25.00,
      photo: 'https://images-na.ssl-images-amazon.com/images/I/91up+-E0B2L.jpg'
    },
    {
      id_book: 6,
      id_user: 3,
      title: 'Harry Potter y la piedra filosofal',
      type: 'Fantasía',
      author: 'J.K. Rowling',
      price: 19.95,
      photo: 'https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg'
    }
  ];

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
