const Footer = () => {
  return (
    <footer className="bg-emerald-400 py-4 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-4">
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-white transition-colors text-sm"
          >
            Facebook
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-white transition-colors text-sm"
          >
            Instagram
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-white transition-colors text-sm"
          >
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
