import {
  CommonActions,
  NavigationContainerRef,
} from "@react-navigation/native";
import {
  ReactNode,
  createContext,
  createRef,
  useEffect,
  useState,
} from "react";
import { StackParamList } from "../config/types";

export const navigationRef =
  createRef<NavigationContainerRef<StackParamList>>();

type NavContextType = {
  route: keyof StackParamList;
  replace: (screen: keyof StackParamList, params?: any) => void;
  navigate: (screen: keyof StackParamList, params?: any) => void;
};

export const NavContext = createContext<NavContextType>({
  route: "Signup",
  replace: () => {},
  navigate: () => {},
});

type NavigationProviderProps = {
  children: ReactNode;
};

export default function NavigationProvider({
  children,
}: NavigationProviderProps) {
  const [route, setRoute] = useState<keyof StackParamList>("Login");

  useEffect(() => {
    const subscribe = navigationRef.current?.addListener("state", () => {
      const currentRoute: any = navigationRef.current?.getCurrentRoute()?.name;
      if (currentRoute) {
        setRoute(currentRoute);
      }
    });

    return subscribe;
  }, []);

  function replace(screen: keyof StackParamList, params: any = undefined) {
    const currentRoute: any = navigationRef.current?.getCurrentRoute();

    if (!currentRoute || currentRoute.name === screen) return;

    navigationRef.current?.navigate(screen, params);
    navigationRef.current?.dispatch((state) => {
      const routes = state.routes.filter(
        (route) => route.name !== currentRoute.name
      );
      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
  }

  function navigate(screen: keyof StackParamList, params: any = undefined) {
    navigationRef.current?.navigate(screen, params);
  }

  return (
    <NavContext.Provider value={{ route, replace, navigate }}>
      {children}
    </NavContext.Provider>
  );
}
