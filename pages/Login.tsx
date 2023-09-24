import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { NavContext } from "../contexts/navigation";

export default function Login() {
  const { loginWithUsernameAndPassword } = useContext(AuthContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { replace } = useContext(NavContext);

  function handleLogin() {
    loginWithUsernameAndPassword(username, password);
  }

  return (
    <View>
      <Text>Scripture Share</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(username) => setUsername(username)}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(password) => setPassword(password)}
      />
      <TouchableOpacity onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => replace("Signup")}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  
})
