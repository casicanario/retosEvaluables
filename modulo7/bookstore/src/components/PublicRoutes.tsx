import { Navigate } from 'react-router-dom';
import { ReactElement } from 'react';
import { useUser } from '../contexts/UserContext';

interface PublicRoutesProps {
  children: ReactElement;
}

const PublicRoutes = ({ children }: PublicRoutesProps) => {
  const { user } = useUser();

  if (user) {
    return <Navigate to="/books" />;
  }

  return children;
};

export default PublicRoutes;
