const Menu = () => {
  return (
    <nav>
      <ul className="flex space-x-6">
        <li>
          <a 
            href="#home" 
            className="text-white hover:text-gray-200 font-medium transition-colors"
          >
            Home
          </a>
        </li>
        <li>
          <a 
            href="#libros" 
            className="text-white hover:text-gray-200 font-medium transition-colors"
          >
            Libros
          </a>
        </li>
        <li>
          <a 
            href="#login" 
            className="text-white hover:text-gray-200 font-medium transition-colors"
          >
            Log In
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
