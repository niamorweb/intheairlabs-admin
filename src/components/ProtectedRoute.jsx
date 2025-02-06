import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Layout from "../Layout";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, authUser } = useAuth();
  const [loading, setLoading] = useState(true);

  const storedUser = localStorage.getItem("authUser");
  const storedIsLoggedIn = localStorage.getItem("isLoggedIn");

  if (!storedIsLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
