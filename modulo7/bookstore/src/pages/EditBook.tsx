const EditBook = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-cyan-600 mb-2">Editar Libro</h1>
        <p className="text-center text-gray-600 mb-6">El Perfume</p>
        
        <form className="space-y-4">
          <div>
            <label htmlFor="titulo" className="block text-gray-700 font-medium mb-2">
              Título:
            </label>
            <input
              type="text"
              id="titulo"
              placeholder="El Perfume"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="autor" className="block text-gray-700 font-medium mb-2">
              Autor:
            </label>
            <input
              type="text"
              id="autor"
              placeholder="Patrick Süskind"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="tipo" className="block text-gray-700 font-medium mb-2">
              Tipo de libro:
            </label>
            <input
              type="text"
              id="tipo"
              placeholder="Novela"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="foto" className="block text-gray-700 font-medium mb-2">
              Foto:
            </label>
            <input
              type="text"
              id="foto"
              placeholder="https://pictures.abebooks..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="precio" className="block text-gray-700 font-medium mb-2">
              Precio:
            </label>
            <input
              type="text"
              id="precio"
              placeholder="19.9"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-100"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-400 text-white font-medium py-2 px-4 rounded-lg hover:bg-emerald-500 transition-colors"
          >
            Actualizar Libro
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
