import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <nav className="flex gap-6">
      <Link 
        to="/" 
        className="text-gray-700 font-medium hover:text-gray-900 transition-colors px-2"
      >
        Perfil
      </Link>
      <Link 
        to="/libros" 
        className="text-gray-700 font-medium hover:text-gray-900 transition-colors px-2"
      >
        Libros
      </Link>
      <Link 
        to="/books" 
        className="text-gray-700 font-medium hover:text-gray-900 transition-colors px-2"
      >
        About Libro
      </Link>
      <Link 
        to="/login" 
        className="text-gray-700 font-medium hover:text-gray-900 transition-colors px-2"
      >
        Editar Libro
      </Link>
      <Link 
        to="/login" 
        className="text-gray-700 font-medium hover:text-gray-900 transition-colors px-2"
      >
        Log Out
      </Link>
    </nav>
  );
};

export default Menu;
