interface BookItemProps {
  id: number;
  title: string;
  author: string;
  isbn: string;
  image: string;
  isFavorite: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onToggleFavorite: () => void;
}

const BookItem = ({ id, title, author, isbn, image, isFavorite, onEdit, onDelete, onToggleFavorite }: BookItemProps) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-md relative">
      <button
        onClick={onToggleFavorite}
        className="absolute top-2 right-2 text-3xl transition-transform hover:scale-110 z-10"
        title={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
      <img 
        src={image} 
        alt={title} 
        className="w-full h-[300px] object-cover rounded mb-3"
      />
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600 mb-2">{author}</p>
      <p className="text-xs text-gray-400 flex items-center gap-1">
        <span>📚</span>
        <span>ISBN: {isbn}</span>
      </p>
      <div className="flex gap-2 mt-3">
        <button 
          onClick={() => onEdit(id)}
          className="flex-1 py-2 px-4 bg-blue-500 text-white rounded font-medium hover:bg-blue-600 transition-colors"
        >
          Editar
        </button>
        <button 
          onClick={() => onDelete(id)}
          className="flex-1 py-2 px-4 bg-red-500 text-white rounded font-medium hover:bg-red-600 transition-colors"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default BookItem;
