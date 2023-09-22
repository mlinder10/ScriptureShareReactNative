import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../types";

export default function Login() {
  const { loginWithUsernameAndPassword } = useContext(AuthContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigation<NavigationProps>();

  function handleLogin() {
    loginWithUsernameAndPassword(username, password);
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
      <TouchableOpacity onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
