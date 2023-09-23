import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { NavContext } from "../config/navigation";
import { AuthContext } from "../contexts/AuthProvider";

export default function BottomNav() {
  const [shown, setShown] = useState<boolean>(false);
  const { route, replace } = useContext(NavContext);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    if (route === "Login" || route === "Signup") setShown(false);
    else setShown(true);
  }, [route]);

  if (!shown) return null;

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => replace("Home")}>
          <Ionicons style={styles.text} name="home" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => replace("Read")}>
          <Ionicons style={styles.text} name="book" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => replace("Account")}>
          <Ionicons style={styles.text} name="person" />
        </TouchableOpacity>
        <TouchableOpacity onPress={logout}>
          <Ionicons style={styles.text} name="log-out" />
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
