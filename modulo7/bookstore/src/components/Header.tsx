import { useState } from 'react';
import Logo from './Logo';
import Menu from './Menu';
import Sidebar from './Sidebar';

const Header = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  return (
    <>
      <header className="bg-emerald-400 shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Logo />
            <span className="text-white text-2xl font-bold">BookStore</span>
          </div>
          
          {/* Menú desktop - oculto en móvil */}
          <div className="hidden md:block">
            <Menu />
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
