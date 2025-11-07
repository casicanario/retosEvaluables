import Logo from './Logo';
import Menu from './Menu';

const Header = () => {
  return (
    <header className="bg-emerald-400 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />
        <Menu />
      </div>
    </header>
  );
};

export default Header;
