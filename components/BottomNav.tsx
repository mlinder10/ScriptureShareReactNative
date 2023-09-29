import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { NavContext } from "../contexts/navigation";

export default function BottomNav() {
  const [shown, setShown] = useState<boolean>(false);
  const { route, replace } = useContext(NavContext);

  useEffect(() => {
    if (route === "Login" || route === "Signup") setShown(false);
    else setShown(true);
  }, [route]);

  if (!shown) return null;

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => replace("Home")}>
          <Ionicons
            style={styles.text}
            name={route === "Home" ? "home" : "home-outline"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => replace("Read")}>
          <Ionicons
            style={styles.text}
            name={route === "Read" ? "book" : "book-outline"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => replace("Search")}>
          <Ionicons
            style={styles.text}
            name={route === "Search" ? "md-search" : "md-search-outline"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => replace("Account")}>
          <Ionicons
            style={styles.text}
            name={route === "Account" ? "person" : "person-outline"}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
    borderTopColor: "#bbb",
    borderTopWidth: 1,
  },
  text: {
    fontSize: 24,
  },
});
