import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Layout from "../Layout";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, authUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [isLoggedIn, authUser]);

  console.log("isLoggedIn in ProtectedRoute:", isLoggedIn);

  if (loading) {
    return <Layout>Loading ...</Layout>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
