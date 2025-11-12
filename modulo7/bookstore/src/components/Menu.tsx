import { Link } from 'react-router-dom';

interface MenuProps {
  vertical?: boolean;
  onClose?: () => void;
}

const Menu = ({ vertical = false, onClose }: MenuProps) => {
  // Variable fake para pruebas
  const user = null;

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
        {!user && (
          <>
            <li>
              <Link 
                to="/login"
                onClick={onClose}
                className="text-white hover:text-gray-200 font-medium transition-colors"
              >
                Login
              </Link>
            </li>
            <li>
              <Link 
                to="/register"
                onClick={onClose}
                className="text-white hover:text-gray-200 font-medium transition-colors"
              >
                Register
              </Link>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <Link 
                to="/profile"
                onClick={onClose}
                className="text-white hover:text-gray-200 font-medium transition-colors"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link 
                to="/books"
                onClick={onClose}
                className="text-white hover:text-gray-200 font-medium transition-colors"
              >
                Books
              </Link>
            </li>
            <li>
              <Link 
                to="/addbook"
                onClick={onClose}
                className="text-white hover:text-gray-200 font-medium transition-colors"
              >
                AddBook
              </Link>
            </li>
            <li>
              <Link 
                to="/editbook"
                onClick={onClose}
                className="text-white hover:text-gray-200 font-medium transition-colors"
              >
                EditBook
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Menu;
