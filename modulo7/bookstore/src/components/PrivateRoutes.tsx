import { Navigate } from 'react-router-dom';
import { ReactElement } from 'react';

interface PrivateRoutesProps {
  children: ReactElement;
}

const PrivateRoutes = ({ children }: PrivateRoutesProps) => {
  // Variable fake para pruebas
  const user = null;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoutes;
