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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={book.photo} 
        alt={book.title}
        className="w-full h-80 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-1">{book.author}</p>
        <p className="text-xs text-gray-500 mb-3">{book.type}</p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-xl font-bold text-teal-600">${book.price}</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleEditBook}
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors font-medium"
          >
            Editar
          </button>
          <button 
            onClick={handleDeleteBook}
            className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors font-medium"
          >
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
