import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./contexts/AuthProvider";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Read from "./pages/Read";
import { StackParamList } from "./config/types";
import BookProvider from "./contexts/BookProvider";
import { navigationRef } from "./contexts/navigation";
import BottomNav from "./components/BottomNav";
import Account from "./pages/Account";
import NavigationProvider from "./contexts/navigation";
import { useState } from "react";
import Search from "./pages/Search";

const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
  const [lastRoute, setLastRoute] = useState<keyof StackParamList>("Login");

  return (
    <NavigationContainer ref={navigationRef}>
      <NavigationProvider setLastRoute={setLastRoute}>
        <AuthProvider>
          <BookProvider>
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{ headerBackVisible: false, animation: "simple_push" }}
            >
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen
                name="Home"
                component={Home}
              />
              <Stack.Screen
                name="Read"
                component={Read}
              />
              <Stack.Screen
                name="Search"
                component={Search}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Account"
                component={Account}
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

function Header() {
  return <></>;
}
