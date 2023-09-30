import { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { AuthContext } from "../contexts/AuthProvider";

export default function Settings() {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.page}>
      <Text>Settings</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {},
});
