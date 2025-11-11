interface LogoProps {
  className?: string;
}

const Logo = ({ className = '' }: LogoProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-10 h-10 bg-purple-600 rounded flex items-center justify-center">
        <svg 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Libro izquierdo inclinado */}
          <path 
            d="M3 19V5C3 4.44772 3.44772 4 4 4H8C8.55228 4 9 4.44772 9 5V19C9 19.5523 8.55228 20 8 20H4C3.44772 20 3 19.5523 3 19Z" 
            fill="white"
            opacity="0.9"
          />
          {/* Libro central */}
          <path 
            d="M10 19V6C10 5.44772 10.4477 5 11 5H13C13.5523 5 14 5.44772 14 6V19C14 19.5523 13.5523 20 13 20H11C10.4477 20 10 19.5523 10 19Z" 
            fill="white"
          />
          {/* Libro derecho inclinado */}
          <path 
            d="M15 19V4C15 3.44772 15.4477 3 16 3H20C20.5523 3 21 3.44772 21 4V19C21 19.5523 20.5523 20 20 20H16C15.4477 20 15 19.5523 15 19Z" 
            fill="white"
            opacity="0.85"
          />
          {/* Detalles de las portadas */}
          <line x1="5.5" y1="7" x2="5.5" y2="17" stroke="#8b5cf6" strokeWidth="0.5"/>
          <line x1="12" y1="8" x2="12" y2="17" stroke="#8b5cf6" strokeWidth="0.5"/>
          <line x1="18" y1="6" x2="18" y2="17" stroke="#8b5cf6" strokeWidth="0.5"/>
        </svg>
      </div>
      <span className="text-xl font-bold text-gray-800">BookStore</span>
    </div>
  );
};

export default Logo;
