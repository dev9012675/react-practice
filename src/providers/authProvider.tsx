import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Component content goes here
  const stringUser = localStorage.getItem("user");

  const [user, setUser_] = useState(JSON.parse(stringUser));

  const setUser = (newUser) => {
    setUser_(newUser);
  };

  useEffect(() => {
    if (user) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + user.access_token;
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("user");
    }
  }, [user]);

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
