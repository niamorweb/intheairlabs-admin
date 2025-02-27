import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Auth Context will be used to get useState data in every pages/components . Here it's for authentication
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider will be for wrap our routes and in order to they can access to these useState data
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Checking if an user in logged when the page loaded. If yes, we store auth user in useState et setIsLoggedIn to true.
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedUser && storedIsLoggedIn === "true") {
      setAuthUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  // Checking if an user in logged when the page loaded. If yes, we store auth user in useState et setIsLoggedIn to true.
  const login = (userData) => {
    setAuthUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("authUser", JSON.stringify(userData.user));
    localStorage.setItem("access_token", JSON.stringify(userData.access_token));
    localStorage.setItem("isLoggedIn", "true");
  };

  // Handle Logout, put useState to default state and remove user data from localstorage, then redirect user into login page
  const logout = () => {
    setAuthUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("authUser");
    localStorage.removeItem("access_token");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  // All useState setter and getter for we can re-use them in other pages/components
  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    login,
    logout,
  };

  // The Provider
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
