import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./contexts/AuthProvider";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Read from "./pages/Read";
import { StackParamList } from "./types";
import BookProvider from "./contexts/BookProvider";
import { NavContext, navigationRef } from "./config/navigation";
import BottomNav from "./components/BottomNav";
import Account from "./pages/Account";
import NavigationProvider from "./config/navigation";
import { useEffect, useState } from "react";

const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
  const [route, setRoute] = useState<keyof StackParamList>("Signup");

  useEffect(() => {
    console.log(route);
  }, [route]);

  return (
    <NavigationContainer ref={navigationRef}>
      <NavigationProvider>
        <AuthProvider setRoute={setRoute}>
          <BookProvider>
            <Stack.Navigator
              initialRouteName="Signup"
              screenOptions={{ headerBackVisible: false }}
            >
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  animationTypeForReplace: "pop",
                }}
              />
              <Stack.Screen
                name="Read"
                component={Read}
                options={{
                  animationTypeForReplace: route === "Home" ? "push" : "pop",
                }}
              />
              <Stack.Screen
                name="Account"
                component={Account}
                options={{
                  animationTypeForReplace: "push",
                }}
              />
            </Stack.Navigator>
            <BottomNav />
          </BookProvider>
        </AuthProvider>
        <StatusBar style="auto" />
      </NavigationProvider>
    </NavigationContainer>
  );
}
