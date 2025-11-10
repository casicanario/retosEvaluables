import BookItem from '../components/BookItem';

const BooksPage = () => {
  const books = [
    {
      id: 1,
      title: 'El Perfume',
      author: 'Patrick Süskind',
      image: 'https://via.placeholder.com/200x300/8B7355/FFFFFF?text=El+Perfume',
      rating: 4.5
    }
  ];

  return (
    <div className="flex-1 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-teal-600 mb-8 text-center">Books</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookItem key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
