import { NavigationContainer } from "@react-navigation/native";
import NavigationProvider, { navigationRef } from "../contexts/navigation";
import AuthProvider from "../contexts/AuthProvider";
import BookProvider from "../contexts/BookProvider";
import { ReactNode } from "react";
import { StatusBar } from "expo-status-bar";
import BottomNav from "../components/BottomNav";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <NavigationContainer ref={navigationRef}>
      <NavigationProvider>
        <AuthProvider>
          <BookProvider>
            <>
              {children}
              <BottomNav />
              <StatusBar style="auto" />
            </>
          </BookProvider>
        </AuthProvider>
      </NavigationProvider>
    </NavigationContainer>
  );
}
