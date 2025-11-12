import BookItem from '../components/BookItem';

const BooksPage = () => {
  const books = [
    {
      id: 1,
      title: 'El Perfume',
      author: 'Patrick Süskind',
      isbn: '978-8432217326',
      image: 'https://images-na.ssl-images-amazon.com/images/I/71QY5JY-ZgL.jpg'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Libros</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookItem
            key={book.id}
            title={book.title}
            author={book.author}
            isbn={book.isbn}
            image={book.image}
          />
        ))}
      </div>
    </div>
  );
};

export default BooksPage;
