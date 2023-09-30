import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { NavContext } from "../contexts/navigation";
import { colors } from "../config/constants";

export default function BottomNav() {
  const [shown, setShown] = useState<boolean>(false);
  const { route, fullReplace } = useContext(NavContext);

  useEffect(() => {
    if (route === "Login" || route === "Signup") setShown(false);
    else setShown(true);
  }, [route]);

  if (!shown) return null;

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => fullReplace("Home")}>
          <Ionicons
            style={styles.text}
            name={route === "Home" ? "home" : "home-outline"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => fullReplace("Read")}>
          <Ionicons
            style={styles.text}
            name={route === "Read" ? "book" : "book-outline"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => fullReplace("Search")}>
          <Ionicons
            style={styles.text}
            name={route === "Search" ? "md-search" : "md-search-outline"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => fullReplace("Account")}>
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
    backgroundColor: colors.bg,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
    borderTopColor: colors.border,
    borderTopWidth: 1,
  },
  text: {
    fontSize: 24,
    color: colors.text,
  },
});
