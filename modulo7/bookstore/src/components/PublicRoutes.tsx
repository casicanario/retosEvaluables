import { Navigate } from 'react-router-dom';
import { ReactElement } from 'react';

interface PublicRoutesProps {
  children: ReactElement;
}

const PublicRoutes = ({ children }: PublicRoutesProps) => {
  // Variable fake para pruebas
  const user = null;

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoutes;
