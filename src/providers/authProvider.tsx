import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IUser } from "../interfaces";

interface IAuthContext {
  user: IUser | undefined;
  setUser: (newUser?: IUser) => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Component content goes here
  const stringUser = localStorage.getItem("user");

  const [user, setUser_] = useState<IUser | undefined>(
    JSON.parse(stringUser as string)
  );

  const setUser = (newUser?: IUser) => {
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
