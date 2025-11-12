import BookList from '../components/BookList';

const BooksPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Libros</h1>
      <BookList />
    </div>
  );
};

export default BooksPage;
