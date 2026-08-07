import {createContext,useEffect,useState,} from "react";
import { loginUser } from "../services/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  const [token, setToken] = useState(storedToken || "");
  const [user, setUser] = useState(() => {
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  const login = async (username, password) => {
    const data = await loginUser(username, password);

    setToken(data.token);
    setUser(data.user);

    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    return data.user;
  };

  const logout = () => {
    setToken("");
    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };

    const syncSession = () => {
      const currentToken = localStorage.getItem("token");
      const currentUser = localStorage.getItem("user");

      if (!currentToken || !currentUser) {
        logout();
      }
    };

    window.addEventListener("unauthorized", handleUnauthorized);
    window.addEventListener("focus", syncSession);

    return () => {
      window.removeEventListener("unauthorized", handleUnauthorized);
      window.removeEventListener("focus", syncSession);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: Boolean(token && user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}