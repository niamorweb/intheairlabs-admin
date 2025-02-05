import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedUser && storedIsLoggedIn === "true") {
      setAuthUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = (userData) => {
    setAuthUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("authUser", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");
  };

  const logout = () => {
    setAuthUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("authUser");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
