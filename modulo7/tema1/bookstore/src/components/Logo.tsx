interface LogoProps {
  className?: string;
}

const Logo = ({ className = '' }: LogoProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        <rect width="32" height="32" rx="4" fill="#4A5568"/>
        <path 
          d="M8 10h16v2H8v-2zm0 5h16v2H8v-2zm0 5h12v2H8v-2z" 
          fill="white"
        />
      </svg>
      <span className="text-xl font-bold">BookStore</span>
    </div>
  );
};

export default Logo;
