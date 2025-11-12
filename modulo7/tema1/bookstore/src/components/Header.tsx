import Logo from './Logo';
import Menu from './Menu';

const Header = () => {
  return (
    <header className="bg-emerald-400 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Logo />
          <span className="text-white text-2xl font-bold">BookStore</span>
        </div>
        <Menu />
      </div>
    </header>
  );
};

export default Header;
