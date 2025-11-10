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
    <div className="flex-1 py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Libros
          </h1>
          <p className="text-gray-600 text-lg">Colección especial de Studio Ghibli</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {libros.map((libro) => (
            <div key={libro.id} className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-gray-100">
              <div className="relative overflow-hidden">
                <img 
                  src={libro.imagen} 
                  alt={libro.titulo}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
                  {libro.titulo}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                    ${libro.precio}
                  </span>
                  <button className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-2.5 rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg transform hover:scale-105 duration-200 font-semibold">
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
