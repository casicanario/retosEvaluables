import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Logo from './Logo';
import Menu from './Menu';
import Sidebar from './Sidebar';

const Header = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <header className="bg-emerald-400 shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Logo />
            <span className="text-white text-2xl font-bold">BookStore</span>
          </div>
          
          {/* Menú desktop - oculto en móvil */}
          <div className="hidden md:flex items-center space-x-4">
            <Menu />
            {user && (
              <div className="flex items-center space-x-3">
                <span className="text-white">Hola, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>

          {/* Botón hamburguesa - visible solo en móvil */}
          <button
            onClick={() => setIsOpenSidebar(!isOpenSidebar)}
            className="md:hidden text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>
      
      <Sidebar isOpen={isOpenSidebar} onClose={() => setIsOpenSidebar(false)} />
    </>
  );
};

export default Header;
