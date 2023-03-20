import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const userId = localStorage.getItem('userToken');
  if (!userId) return <Navigate to="/sign-in" />;

  return <div>{children}</div>;
}

export default PrivateRoute;
