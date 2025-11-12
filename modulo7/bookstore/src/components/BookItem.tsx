interface BookItemProps {
  title: string;
  author: string;
  isbn: string;
  image: string;
}

const BookItem = ({ title, author, isbn, image }: BookItemProps) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-md">
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
        <button className="flex-1 py-2 px-4 bg-blue-500 text-white rounded font-medium hover:bg-blue-600 transition-colors">
          Ver más
        </button>
        <button className="flex-1 py-2 px-4 bg-red-500 text-white rounded font-medium hover:bg-red-600 transition-colors">
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default BookItem;
