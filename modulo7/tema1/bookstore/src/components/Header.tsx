import Logo from './Logo';
import Menu from './Menu';

const Header = () => {
  return (
    <header className="bg-emerald-400 shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Logo />
        <Menu />
      </div>
    </header>
  );
};

export default Header;
