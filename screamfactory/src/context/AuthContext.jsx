import { createContext, useState } from "react";
import users from "../data/users.json";

export const AuthContext = createContext();

export function AuthProvider({ usuarios }) {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    const foundUser = users.find(
      (u) =>
        u.username === username &&
        u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {usuarios}
    </AuthContext.Provider>
  );
}