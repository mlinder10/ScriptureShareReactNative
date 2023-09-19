import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { instance } from "./config/constants";

export default function App() {
  const [text, setText] = useState<string>("");

  async function fetchText() {
    try {
      const res = await instance.get(
        "/chapter?bible=de4e12af7f28f599-02&chapter=GEN.1"
      );
      setText(res.data.content);
    } catch (err: any) {
      console.error(err?.message);
    }
  }

  useEffect(() => {
    fetchText();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text>{text}</Text>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 20
  },
});
