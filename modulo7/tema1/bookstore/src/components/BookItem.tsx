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
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img 
          src={book.photo} 
          alt={book.title}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-2">
        <h3 className="text-xs font-semibold text-gray-800 mb-1 truncate">{book.title}</h3>
        <p className="text-xs text-gray-500 mb-2 truncate">{book.author}</p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-gray-800">{book.price}€</span>
        </div>
        <div className="flex gap-1">
          <button 
            onClick={handleEditBook}
            className="flex-1 bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition-colors"
          >
            Editar
          </button>
          <button 
            onClick={handleDeleteBook}
            className="flex-1 bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition-colors"
          >
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
