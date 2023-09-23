import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
} from "react";
import { AuthContextType, NavigationProps, StackParamList } from "../types";
import useAuth from "../hooks/useAuth";
import { AuthProviderDefault } from "../config/constants";
import { NavContext } from "../config/navigation";

export const AuthContext = createContext<AuthContextType>(AuthProviderDefault);

type AuthProviderProps = {
  children: ReactNode;
  setRoute: Dispatch<SetStateAction<keyof StackParamList>>;
};

export default function AuthProvider({
  children,
  setRoute,
}: AuthProviderProps) {
  const authObject = useAuth();
  const { replace, route } = useContext(NavContext);

  useEffect(() => {
    if (route !== "Read")
    setRoute(route);

    if ((route === "Login" || route === "Signup") && authObject.user !== null)
      replace("Read");

    if (route !== "Login" && route !== "Signup" && authObject.user === null)
      replace("Login");
  }, [route, authObject.user]);

  return (
    <AuthContext.Provider value={{ ...authObject }}>
      {children}
    </AuthContext.Provider>
  );
}
