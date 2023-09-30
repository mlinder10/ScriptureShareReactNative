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
import { NavContextType, StackParamList } from "../config/types";

export const navigationRef =
  createRef<NavigationContainerRef<StackParamList>>();

export const NavContext = createContext<NavContextType>({
  route: "Signup",
  replace: () => {},
  navigate: () => {},
  fullReplace: () => {},
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

  function fullReplace(screen: keyof StackParamList, params: any = undefined) {
    navigationRef.current?.navigate(screen, params);
    navigationRef.current?.dispatch((state) => {
      return CommonActions.reset({
        ...state,
        routes: [state.routes[state.routes.length - 1]],
        index: 0,
      });
    });
  }

  function navigate(screen: keyof StackParamList, params: any = undefined) {
    navigationRef.current?.navigate(screen, params);
  }

  return (
    <NavContext.Provider value={{ route, replace, navigate, fullReplace }}>
      {children}
    </NavContext.Provider>
  );
}
