import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <nav>
      <ul className="flex space-x-6">
        <li>
          <Link 
            to="/" 
            className="text-white hover:text-gray-200 font-medium transition-colors"
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/libros" 
            className="text-white hover:text-gray-200 font-medium transition-colors"
          >
            Libros
          </Link>
        </li>
        <li>
          <Link 
            to="/login" 
            className="text-white hover:text-gray-200 font-medium transition-colors"
          >
            Log In
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
