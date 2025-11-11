import Logo from './Logo';
import Menu from './Menu';

const Header = () => {
  return (
    <header style={{ backgroundColor: '#6ee7b7' }} className="shadow-md w-full">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <Logo />
        <Menu />
      </div>
    </header>
  );
};

export default Header;
