import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./contexts/AuthProvider";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Read from "./pages/Read";
import { StackParamList } from "./types";
import BookProvider from "./contexts/BookProvider";

const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
  const [mounted, setMounted] = useState<boolean>(false);

  return (
    <NavigationContainer onReady={() => setMounted(true)}>
      <AuthProvider mounted={mounted}>
        <BookProvider>
          <Stack.Navigator initialRouteName="Read">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Read" component={Read} />
          </Stack.Navigator>
        </BookProvider>
      </AuthProvider>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
