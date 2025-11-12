interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <img 
      src="/logo.png" 
      alt="BookStore Logo" 
      className={className || "h-12"}
    />
  );
};

export default Logo;
