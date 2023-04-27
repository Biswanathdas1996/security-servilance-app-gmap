import React from "react";

const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated) {
      return false;
    }

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
