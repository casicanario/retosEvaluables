interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
  rating: number;
}

interface BookItemProps {
  book: Book;
}

const BookItem = ({ book }: BookItemProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <img 
        src={book.image} 
        alt={book.title}
        className="w-full h-80 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{book.author}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-yellow-400 font-semibold">
            <span>⭐</span>
            <span>{book.rating}</span>
          </div>
          <button className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors font-medium">
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
