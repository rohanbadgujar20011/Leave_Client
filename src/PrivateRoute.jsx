import React from "react";
import { Route, Navigate, useNavigate } from "react-router-dom";

const PrivateRoute = ({ element: Component, role, ...rest }) => {
  const userRole = localStorage.getItem("userRole");
  const navigate = useNavigate();

  // Check if user is authenticated and has required role
  if (userRole && userRole === role) {
    return <Route {...rest} element={<Component />} />;
  } else {
    // Redirect to login page if user is not authenticated or role doesn't match
    navigate("/login");
    return null;
  }
};

export default PrivateRoute;