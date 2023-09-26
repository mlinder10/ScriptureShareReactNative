import { View, Text, Button } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

export default function Account() {
  const { logout } = useContext(AuthContext);
  return (
    <View>
      <Text>Account</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
