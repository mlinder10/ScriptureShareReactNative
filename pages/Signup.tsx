import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { NavContext } from "../contexts/navigation";

export default function Signup() {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { replace } = useContext(NavContext);

  function handleSignup() {
    register(username, password, confirmPassword);
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
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
      />
      <TouchableOpacity onPress={handleSignup}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => replace("Login")}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({

})
