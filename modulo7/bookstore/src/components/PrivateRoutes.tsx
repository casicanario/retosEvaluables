import { Navigate } from 'react-router-dom';
import { ReactElement } from 'react';
import { useUser } from '../contexts/UserContext';

interface PrivateRoutesProps {
  children: ReactElement;
}

const PrivateRoutes = ({ children }: PrivateRoutesProps) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoutes;
