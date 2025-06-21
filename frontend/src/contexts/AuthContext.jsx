import { createContext, useContext, useEffect, useState } from "react";
import { checkAuth, loginUser, registerUser, logoutUser } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await checkAuth();
        setUser(user || null);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (formData) => {
    try {
      const user = await loginUser(formData);
      setUser(user);
      return true;
    } catch (err) {
      console.error("Login failed", err);
      return false;
    }
  };

  const register = async (formData) => {
    try {
      const user = await registerUser(formData);
      setUser(user);
      return true;
    } catch (err) {
      console.error("Register failed", err);
      return false;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}