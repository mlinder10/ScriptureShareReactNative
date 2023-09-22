import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../types";

export default function Signup() {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigation = useNavigation<NavigationProps>();

  function handleSignup() {
    register(username, password, confirmPassword);
  }

  return (
    <View>
      <Text>Scripture Share</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={() => setUsername(username)}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={() => setPassword(password)}
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={() => setConfirmPassword(confirmPassword)}
      />
      <TouchableOpacity onPress={handleSignup}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
