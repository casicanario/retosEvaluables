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

const Libros = () => {
  const books: Book[] = [
    {
      id_book: 1,
      id_user: 1,
      title: 'El Perfume',
      type: 'Novela',
      author: 'Patrick Süskind',
      price: 19.99,
      photo: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop'
    },
    {
      id_book: 2,
      id_user: 1,
      title: 'Cien años de soledad',
      type: 'Novela',
      author: 'Gabriel García Márquez',
      price: 22.50,
      photo: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop'
    },
    {
      id_book: 3,
      id_user: 2,
      title: '1984',
      type: 'Ficción distópica',
      author: 'George Orwell',
      price: 18.99,
      photo: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop'
    },
    {
      id_book: 4,
      id_user: 2,
      title: 'El Principito',
      type: 'Infantil',
      author: 'Antoine de Saint-Exupéry',
      price: 12.99,
      photo: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop'
    },
    {
      id_book: 5,
      id_user: 1,
      title: 'Don Quijote de la Mancha',
      type: 'Clásico',
      author: 'Miguel de Cervantes',
      price: 24.99,
      photo: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop'
    },
    {
      id_book: 6,
      id_user: 3,
      title: 'Orgullo y Prejuicio',
      type: 'Romance',
      author: 'Jane Austen',
      price: 16.99,
      photo: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400&h=600&fit=crop'
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
    <div className="flex-1 py-8 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">Libros</h1>
        <BookList 
          books={books} 
          onEdit={handleEditBook}
          onDelete={handleDeleteBook}
        />
      </div>
    </div>
  );
};

export default Libros;
