const Libros = () => {
  const libros = [
    {
      id: 1,
      titulo: 'Mi vecino Totoro',
      imagen: 'https://via.placeholder.com/200x300/4A5568/FFFFFF?text=Totoro',
      precio: 19.99
    },
    {
      id: 2,
      titulo: 'El Castillo Ambulante',
      imagen: 'https://via.placeholder.com/200x300/4A5568/FFFFFF?text=Castillo',
      precio: 22.99
    },
    {
      id: 3,
      titulo: 'El viaje de Chihiro',
      imagen: 'https://via.placeholder.com/200x300/4A5568/FFFFFF?text=Chihiro',
      precio: 24.99
    },
    {
      id: 4,
      titulo: 'Nicky la aprendiz de bruja',
      imagen: 'https://via.placeholder.com/200x300/4A5568/FFFFFF?text=Nicky',
      precio: 18.99
    }
  ];

  return (
    <div className="flex-1 py-8 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">Libros</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {libros.map((libro) => (
            <div key={libro.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src={libro.imagen} 
                alt={libro.titulo}
                className="w-full h-80 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">{libro.titulo}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-teal-600 font-bold">${libro.precio}</span>
                  <button className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors">
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Libros;
