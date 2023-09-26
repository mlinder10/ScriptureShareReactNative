import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./contexts/AuthProvider";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Read from "./pages/Read";
import { NoteType, StackParamList } from "./config/types";
import BookProvider from "./contexts/BookProvider";
import { navigationRef } from "./contexts/navigation";
import BottomNav from "./components/BottomNav";
import Account from "./pages/Account";
import NavigationProvider from "./contexts/navigation";
import Search from "./pages/Search";
import ChangeVersion from "./pages/ChangeVersion";
import ChangeChapter from "./pages/ChangeChapter";
import ReadNote from "./pages/ReadNote";
import CreateNote from "./pages/CreateNote";

const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <NavigationProvider>
        <AuthProvider>
          <BookProvider>
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{ animation: "none" }}
            >
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Signup"
                component={Signup}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen
                name="Read"
                component={Read}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Search"
                component={Search}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen name="Account" component={Account} />
              <Stack.Screen
                name="ChangeVersion"
                component={ChangeVersion}
                options={{
                  presentation: "modal",
                  animation: "slide_from_bottom",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ChangeChapter"
                component={ChangeChapter}
                options={{
                  presentation: "modal",
                  animation: "slide_from_bottom",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ReadNote"
                component={ReadNote}
                options={{
                  presentation: "modal",
                  animation: "slide_from_bottom",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="CreateNote"
                initialParams={undefined}
                component={CreateNote}
                options={{
                  presentation: "modal",
                  animation: "slide_from_bottom",
                  headerShown: false,
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
