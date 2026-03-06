// const withAuth = (Component) => {
//   const isAuthenticated = true;

//   return (props) => {
//     if (isAuthenticated) {
//       return <Component {...props} />;
//     } else {
//       return <p>Please login to access</p>;
//     }
//   };
// };

// export default withAuth;

import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Login from "../components/Login";
import ForbiddenPage from "../components/ForbiddenPage";

const withAuth = (Component, requiredRole) => {
  return function WrappedComponent(props) {
    const user = useContext(AuthContext);

    if (!user?.isAuthenticated) {
      return <Login />;
    }

    if (requiredRole && user.role !== requiredRole) {
      return <ForbiddenPage />;
    }

    return <Component {...props} />;
  };
};

export default withAuth;
