import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <nav style={{ display: 'flex', gap: '32px' }}>
      <Link 
        to="/" 
        style={{ color: '#374151', fontWeight: '500', textDecoration: 'none', padding: '0 12px' }}
      >
        Perfil
      </Link>
      <Link 
        to="/libros" 
        style={{ color: '#374151', fontWeight: '500', textDecoration: 'none', padding: '0 12px' }}
      >
        Libros
      </Link>
      <Link 
        to="/books" 
        style={{ color: '#374151', fontWeight: '500', textDecoration: 'none', padding: '0 12px' }}
      >
        Añadir Libro
      </Link>
      <Link 
        to="/login" 
        style={{ color: '#374151', fontWeight: '500', textDecoration: 'none', padding: '0 12px' }}
      >
        Editar Libro
      </Link>
      <Link 
        to="/login" 
        style={{ color: '#374151', fontWeight: '500', textDecoration: 'none', padding: '0 12px' }}
      >
        Log Out
      </Link>
    </nav>
  );
};

export default Menu;
