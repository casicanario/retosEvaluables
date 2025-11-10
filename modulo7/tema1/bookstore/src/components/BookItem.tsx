interface Book {
  id_book: number;
  id_user: number;
  title: string;
  type: string;
  author: string;
  price: number;
  photo: string;
}

interface BookItemProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

const BookItem = ({ book, onEdit, onDelete }: BookItemProps) => {
  const handleEditBook = () => {
    onEdit(book);
  };

  const handleDeleteBook = () => {
    onDelete(book.id_book);
  };

  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-gray-100">
      <div className="relative overflow-hidden">
        <img 
          src={book.photo} 
          alt={book.title}
          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
          {book.type}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-teal-600 transition-colors">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 italic">por {book.author}</p>
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
          <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
            ${book.price}
          </span>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleEditBook}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2.5 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all font-semibold shadow-md hover:shadow-lg transform hover:scale-105 duration-200"
          >
            Editar
          </button>
          <button 
            onClick={handleDeleteBook}
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2.5 rounded-lg hover:from-red-600 hover:to-red-700 transition-all font-semibold shadow-md hover:shadow-lg transform hover:scale-105 duration-200"
          >
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
