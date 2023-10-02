import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Pressable,
  Image,
} from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { NavContext } from "../contexts/navigation";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { LOGO_URI, colors } from "../config/constants";
import Toast from "../components/Toast";

export default function Login() {
  const { loginWithUsernameAndPassword } = useContext(AuthContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);
  const { replace } = useContext(NavContext);

  async function handleLogin() {
    const res = await loginWithUsernameAndPassword(username, password);
    setToast(res);
  }

  return (
    <View style={styles.page}>
      <View style={styles.upper}>
        <Image
          style={{ width: "70%", height: "70%" }}
          resizeMode="contain"
          source={LOGO_URI}
        />
      </View>
      <KeyboardAvoidingView behavior="padding" style={styles.lower}>
        <View style={styles.inputContainer}>
          <View style={styles.textInputContainer}>
            <AntDesign style={styles.icon} name="user" />
            <TextInput
              autoCapitalize="none"
              keyboardType="ascii-capable"
              style={styles.textInput}
              placeholder="Username"
              placeholderTextColor={colors.cancel}
              value={username}
              onChangeText={(username) => setUsername(username)}
            />
          </View>
          <View style={styles.textInputContainer}>
            <AntDesign style={styles.icon} name="lock" />
            <TextInput
              autoCapitalize="none"
              keyboardType="ascii-capable"
              secureTextEntry={!passwordVisible}
              style={styles.textInput}
              placeholder="Password"
              placeholderTextColor={colors.cancel}
              value={password}
              onChangeText={(password) => setPassword(password)}
            />
            <Pressable onPress={() => setPasswordVisible(!passwordVisible)}>
              <Ionicons
                name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                style={styles.icon}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.btnText}>Log In</Text>
          </TouchableOpacity>
          <View style={styles.btnBreak}>
            <View style={styles.line} />
            <Text style={styles.or}>Or</Text>
            <View style={styles.line} />
          </View>
          <TouchableOpacity
            style={styles.signupBtn}
            onPress={() => replace("Signup")}
          >
            <Text style={[styles.btnText, { color: "#999" }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <Toast message={toast} setMessage={setToast} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  upper: {
    flex: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  lower: {
    flex: 6,
    marginBottom: 40,
    paddingHorizontal: 30,
    justifyContent: "space-between",
  },
  inputContainer: {
    gap: 30,
  },
  textInputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 15,
    flexDirection: "row",
    gap: 5,
  },
  icon: {
    fontSize: 24,
    color: colors.cancel,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    color: colors.text,
  },
  btnContainer: {
    alignItems: "center",
    gap: 10,
  },
  loginBtn: {
    width: "100%",
    backgroundColor: colors.primary,
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 15,
  },
  signupBtn: {
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: colors.cancel,
  },
  btnText: {
    color: colors.bg,
    fontSize: 16,
    fontWeight: "bold",
  },
  btnBreak: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  line: {
    backgroundColor: colors.border,
    height: 1,
    flex: 1,
  },
  or: {
    color: colors.border,
    paddingHorizontal: 10,
  },
});
