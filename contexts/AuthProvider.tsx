import { ReactNode, createContext, useContext, useEffect } from "react";
import { AuthContextType } from "../config/types";
import useAuth from "../hooks/useAuth";
import { AuthProviderDefault } from "../config/constants";
import { NavContext } from "./navigation";

export const AuthContext = createContext<AuthContextType>(AuthProviderDefault);

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const authObject = useAuth();
  const { fullReplace, route } = useContext(NavContext);

  useEffect(() => {
    if ((route === "Login" || route === "Signup") && authObject.user !== null)
      fullReplace("Home");

    if (route !== "Login" && route !== "Signup" && authObject.user === null)
      fullReplace("Login");
  }, [route, authObject.user]);

  return (
    <AuthContext.Provider value={{ ...authObject }}>
      {children}
    </AuthContext.Provider>
  );
}
