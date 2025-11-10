import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <nav className="flex gap-6">
      <Link 
        to="/" 
        className="text-gray-700 hover:text-gray-900 transition-colors"
      >
        Home
      </Link>
      <Link 
        to="/libros" 
        className="text-gray-700 hover:text-gray-900 transition-colors"
      >
        Libros
      </Link>
      <Link 
        to="/books" 
        className="text-gray-700 hover:text-gray-900 transition-colors"
      >
        Books
      </Link>
      <Link 
        to="/login" 
        className="text-gray-700 hover:text-gray-900 transition-colors"
      >
        Log In
      </Link>
    </nav>
  );
};

export default Menu;
