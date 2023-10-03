import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StackParamList } from "./config/types";
import { navigationRef } from "./contexts/navigation";
import AuthProvider from "./contexts/AuthProvider";
import BookProvider from "./contexts/BookProvider";
import NavigationProvider from "./contexts/navigation";
import BottomNav from "./components/BottomNav";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Read from "./pages/Read";
import Account from "./pages/Account";
import Search from "./pages/Search";
import Settings from "./pages/Settings";
import User from "./pages/User";
import ChangeVersion from "./pages/ChangeVersion";
import ChangeChapter from "./pages/ChangeChapter";
import ReadNote from "./pages/ReadNote";
import CreateNote from "./pages/CreateNote";
import { colors } from "./config/constants";
import FilterNotes from "./pages/FilterNotes";
import Friends from "./pages/Friends";

const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <NavigationProvider>
        <AuthProvider>
          <BookProvider>
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{
                animation: "none",
                headerTitleStyle: {
                  fontSize: 18,
                  fontWeight: "600",
                  color: colors.text,
                },
                headerStyle: { backgroundColor: colors.bg },
                contentStyle: { backgroundColor: colors.bgSecondary },
                headerTintColor: colors.primary,
              }}
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
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Search"
                component={Search}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Account"
                component={Account}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Settings"
                component={Settings}
                options={{ animation: "simple_push" }}
              />
              <Stack.Screen
                name="Friends"
                component={Friends}
                options={{
                  animation: "slide_from_bottom",
                  presentation: "modal",
                  headerShown: false,
                }}
              />
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
                name="FilterNotes"
                component={FilterNotes}
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
                component={CreateNote}
                options={{
                  presentation: "modal",
                  animation: "slide_from_bottom",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="User"
                component={User}
                options={{ headerShown: false, animation: "simple_push" }}
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
