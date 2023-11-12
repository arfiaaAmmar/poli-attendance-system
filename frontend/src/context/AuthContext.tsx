import { createContext, useMemo, useState } from "react";
import { User } from "shared-library/src/declarations/types";

type AuthContextProps = {
  user: User | null;
  isLoggedIn: boolean | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  isLoggedIn: false,
  setUser: () => {},
  setIsLoggedIn: () => {},
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(false);
  const providerValue = useMemo(() => ({ user, setUser, isLoggedIn, setIsLoggedIn}), [])

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};
