import { Link } from 'react-router-dom';

interface MenuProps {
  vertical?: boolean;
  onClose?: () => void;
}

const Menu = ({ vertical = false, onClose }: MenuProps) => {
  return (
    <nav>
      <ul className={vertical ? "flex flex-col space-y-4" : "flex space-x-6"}>
        <li>
          <Link 
            to="/" 
            onClick={onClose}
            className="text-white hover:text-gray-200 font-medium transition-colors"
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/libros"
            onClick={onClose}
            className="text-white hover:text-gray-200 font-medium transition-colors"
          >
            Libros
          </Link>
        </li>
        <li>
          <Link 
            to="/login"
            onClick={onClose}
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
