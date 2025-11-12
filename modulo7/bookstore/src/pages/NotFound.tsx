import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-9xl font-bold text-emerald-400 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Página no encontrada</h2>
        <p className="text-gray-600 mb-8">
          Lo sentimos, la página que buscas no existe.
        </p>
        <p className="text-gray-500 text-sm mb-6">
          Serás redirigido a la página de inicio en 5 segundos...
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-emerald-400 hover:bg-emerald-500 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default NotFound;
