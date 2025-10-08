import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = (userData, jwtToken) => {
  const userToStore = {
    id: userData.id,
    username: userData.username, // make sure your backend returns this
    role: userData.role
  };

  setUser(userToStore);
  setToken(jwtToken);

  // store the object you just created, not the raw userData
  localStorage.setItem("user", JSON.stringify(userToStore));
  localStorage.setItem("token", jwtToken);
};


  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
