import { User } from "@/types";
import { ReactNode, createContext, useCallback, useState } from "react";

type AuthContextType = {
  user: User | null;
  signin: (user: User) => void;
  logout: () => void;
};

const intialState: AuthContextType = {
  user: null,
  signin: () => null,
  logout: () => null,
};

export const AuthContext = createContext<AuthContextType>(intialState);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const localUser = localStorage.getItem("threads-user");

    if (typeof localUser === "string") return JSON.parse(localUser);

    return null;
  });

  const signin = useCallback((user: User) => {
    setUser(user);
    localStorage.setItem("threads-user", JSON.stringify(user));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("threads-user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, signin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
