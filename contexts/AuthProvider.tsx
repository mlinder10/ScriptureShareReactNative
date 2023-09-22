import { ReactNode, createContext } from "react";
import { AuthContextType } from "../types";
import useAuth from "../hooks/useAuth";
import { AuthProviderDefault } from "../config/constants";

export const AuthContext = createContext<AuthContextType>(AuthProviderDefault);

type AuthProviderProps = {
  children: ReactNode;
  mounted: boolean;
};

export default function AuthProvider({ children, mounted }: AuthProviderProps) {
  return (
    <AuthContext.Provider value={{ ...useAuth(), mounted }}>
      {children}
    </AuthContext.Provider>
  );
}
