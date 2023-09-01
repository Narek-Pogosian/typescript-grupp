import { User } from "@/types";
import { ReactNode, createContext, useState } from "react";

type AuthContextType = {
  user: User | null;
  setUser: (user: User) => void;
};

const intialState: AuthContextType = {
  user: null,
  setUser: () => null,
};

export const AuthContext = createContext<AuthContextType>(intialState);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
