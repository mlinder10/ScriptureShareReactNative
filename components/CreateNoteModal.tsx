import {
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { useContext, useState } from "react";
import { instanceBackend } from "../config/constants";
import { BookContext } from "../contexts/BookProvider";

type NoteModalProps = {
  visible: boolean;
  lines: string[];
  lineNumbers: number[];
  close: () => void;
  fetchNotes: () => Promise<void>;
};

export default function NoteModal({
  visible,
  lines,
  lineNumbers,
  close,
  fetchNotes,
}: NoteModalProps) {
  const { version, book, chapter } = useContext(BookContext);
  const [input, setInput] = useState<string>("");

  async function handlePostNote() {
    try {
      await instanceBackend.post("/note", {
        lines,
        lineNumbers,
        userId: "testid",
        version,
        book,
        chapter,
        content: input,
      });
      setInput("");
      fetchNotes();
      close();
    } catch (err: any) {
      console.error(err?.message);
    }
  }

  return (
    <>
      {visible && (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <TextInput
            placeholder="Make a note"
            value={input}
            onChangeText={(text) => setInput(text)}
            style={styles.input}
            multiline
          />
          <TouchableOpacity style={styles.btn} onPress={handlePostNote}>
            <Text style={styles.text}>Post</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#eee",
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    width: "100%",
  },
  btn: {
    backgroundColor: "#08f",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  text: {
    fontSize: 20,
    color: "#fff",
  },
});
