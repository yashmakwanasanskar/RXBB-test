import React, { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

interface PrivateRouteProps {
  element: ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const isAuthenticated = Cookies.get('Authorization');
  const location = useLocation();

  return isAuthenticated ? element : <Navigate to="/auth/login" state={{ from: location }} />;
};

export default PrivateRoute;
