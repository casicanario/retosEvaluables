const Register = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-cyan-600 mb-2">Registrarse</h1>
        <p className="text-center text-gray-600 mb-6">¡Regístrate para guardar tus libros!</p>
        
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              placeholder="Iván"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="apellidos" className="block text-gray-700 font-medium mb-2">
              Apellidos:
            </label>
            <input
              type="text"
              id="apellidos"
              placeholder="Pérez"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="email@email.com"
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
              placeholder="https://photo.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              placeholder="1234"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="repeatPassword" className="block text-gray-700 font-medium mb-2">
              Repetir contraseña:
            </label>
            <input
              type="password"
              id="repeatPassword"
              placeholder="1234"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-100"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-400 text-white font-medium py-2 px-4 rounded-lg hover:bg-emerald-500 transition-colors"
          >
            Regístrate
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
