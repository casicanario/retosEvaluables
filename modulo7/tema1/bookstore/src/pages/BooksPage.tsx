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
  const books: Book[] = [
    {
      id_book: 1,
      id_user: 1,
      title: 'El Perfume',
      type: 'Novela',
      author: 'Patrick Süskind',
      price: 19.99,
      photo: 'https://via.placeholder.com/200x300/8B7355/FFFFFF?text=El+Perfume'
    },
    {
      id_book: 2,
      id_user: 1,
      title: 'Cien años de soledad',
      type: 'Novela',
      author: 'Gabriel García Márquez',
      price: 22.50,
      photo: 'https://via.placeholder.com/200x300/4A5568/FFFFFF?text=Cien+años'
    },
    {
      id_book: 3,
      id_user: 2,
      title: '1984',
      type: 'Ficción distópica',
      author: 'George Orwell',
      price: 18.99,
      photo: 'https://via.placeholder.com/200x300/2C3E50/FFFFFF?text=1984'
    },
    {
      id_book: 4,
      id_user: 2,
      title: 'El Principito',
      type: 'Infantil',
      author: 'Antoine de Saint-Exupéry',
      price: 12.99,
      photo: 'https://via.placeholder.com/200x300/3498DB/FFFFFF?text=Principito'
    },
    {
      id_book: 5,
      id_user: 1,
      title: 'Don Quijote de la Mancha',
      type: 'Clásico',
      author: 'Miguel de Cervantes',
      price: 24.99,
      photo: 'https://via.placeholder.com/200x300/E67E22/FFFFFF?text=Quijote'
    },
    {
      id_book: 6,
      id_user: 3,
      title: 'Orgullo y Prejuicio',
      type: 'Romance',
      author: 'Jane Austen',
      price: 16.99,
      photo: 'https://via.placeholder.com/200x300/9B59B6/FFFFFF?text=Orgullo'
    }
  ];

  const handleEditBook = (book: Book) => {
    console.log('Editar libro:', book);
    alert(`Editando: ${book.title}`);
  };

  const handleDeleteBook = (id: number) => {
    console.log('Borrar libro con ID:', id);
    alert(`Borrando libro con ID: ${id}`);
  };

  return (
    <div className="flex-1 py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Books Collection
          </h1>
          <p className="text-gray-600 text-lg">Descubre nuestra selección de libros</p>
        </div>
        <BookList 
          books={books} 
          onEdit={handleEditBook}
          onDelete={handleDeleteBook}
        />
      </div>
    </div>
  );
};

export default BooksPage;
