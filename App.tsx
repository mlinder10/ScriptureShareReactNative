import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackParamList } from "./config/types";
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
import Layout from "./pages/Layout";
import { ReadHeaderLeft, ReadHeaderRight } from "./components/ReadHeaders";
import {
  AccountHeaderLeft,
  AccountHeaderRight,
  UserHeaderRight,
} from "./components/AccountHeaders";
import { useContext, useState } from "react";
import { AuthContext } from "./contexts/AuthProvider";
import Searchbar from "./components/Searchbar";

const Stack = createNativeStackNavigator<StackParamList>();

function Pages() {
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState<string>("");

  return (
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
        options={{
          headerTitle: "",
          headerLeft: () => <ReadHeaderLeft />,
          headerRight: () => <ReadHeaderRight />,
        }}
      />
      <Stack.Screen
        name="Search"
        options={{
          headerTitle: () => (
            <Searchbar search={search} setSearch={setSearch} />
          ),
        }}
      >
        {(props) => <Search search={search} setSearch={setSearch} />}
      </Stack.Screen>
      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerTitle: "",
          headerLeft: () => <AccountHeaderLeft user={user} />,
          headerRight: () => <AccountHeaderRight />,
        }}
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
        options={({ route }) => ({
          animation: "simple_push",
          headerTitle: "",
          headerLeft: (props) => <AccountHeaderLeft user={route.params.user} />,
          headerRight: (props) => (
            <UserHeaderRight pageUser={route.params.user} />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Layout>
      <Pages />
    </Layout>
  );
}
