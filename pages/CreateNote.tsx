import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useContext, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { StackParamList } from "../config/types";
import { instanceBackend } from "../config/constants";
import { BookContext } from "../contexts/BookProvider";

type CreateNoteProps = {
  route: RouteProp<StackParamList, "CreateNote">;
  navigation: StackNavigationProp<StackParamList, "CreateNote">;
};

export default function CreateNote({ route, navigation }: CreateNoteProps) {
  const { version, book, chapter } = useContext(BookContext);
  const { lines } = route.params;
  const [input, setInput] = useState<string>("");

  async function handlePostNote() {
    try {
      await instanceBackend.post("/note", {
        lines: lines.text,
        lineNumbers: lines.numbers,
        userId: "testid",
        version,
        book,
        chapter,
        content: input,
      });
      setInput("");
      navigation.goBack();
    } catch (err: any) {
      console.error(err?.message);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {chapter.replace(".", " ") +
            ":" +
            (lines.numbers.length === 1
              ? lines.numbers[0]
              : lines.numbers[0] +
                "-" +
                lines.numbers[lines.numbers.length - 1])}
        </Text>
      </View>
      <ScrollView
        style={styles.txtContainer}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text>
          {lines.text.map((l, i) => (
            <Text key={i}>{l}</Text>
          ))}
        </Text>
      </ScrollView>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.commentaryContainer}
      >
        <TextInput
          style={styles.textInput}
          multiline
          placeholder="Your note..."
          keyboardType="ascii-capable"
          onChangeText={(text) => setInput(text)}
          value={input}
        />
        <TouchableOpacity style={styles.postBtn} onPress={handlePostNote}>
          <Text style={styles.postBtnText}>Post</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  txtContainer: {
    flex: 1,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  commentaryContainer: {
    flex: 2,
    padding: 20,
    gap: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    height: 200,
    borderRadius: 5,
    padding: 5,
  },
  postBtn: {
    alignSelf: "center",
    backgroundColor: "#08f",
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  postBtnText: {
    fontSize: 16,
    color: "#fff",
  },
});
