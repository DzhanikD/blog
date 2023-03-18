// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  //   const authorized = useSelector((state) => state.userReducer.authorized);

  //   if (!authorized) return <Navigate to="/sign-in" />;

  return <div>{children}</div>;
}

export default PrivateRoute;
