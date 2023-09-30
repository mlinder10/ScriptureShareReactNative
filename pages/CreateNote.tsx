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
import { BookContext } from "../contexts/BookProvider";
import { AuthContext } from "../contexts/AuthProvider";
import { formatVerses } from "../config/helpers";
import { colors } from "../config/constants";

type CreateNoteProps = {
  route: RouteProp<StackParamList, "CreateNote">;
  navigation: StackNavigationProp<StackParamList, "CreateNote">;
};

export default function CreateNote({ route, navigation }: CreateNoteProps) {
  const { chapter, postNote } = useContext(BookContext);
  const { user } = useContext(AuthContext);
  const { lines } = route.params;
  const [input, setInput] = useState<string>("");

  async function handlePostNote() {
    if (user === null) return;
    await postNote(user, input, lines.text, lines.numbers);
    setInput("");
    navigation.goBack();
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {formatVerses(chapter, lines.numbers)}
        </Text>
      </View>
      <ScrollView
        style={styles.txtContainer}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text>
          {lines.text.map((l, i) => (
            <Text style={{ color: colors.text }} key={i}>
              {l}
            </Text>
          ))}
        </Text>
      </ScrollView>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.commentaryContainer}
      >
        <TextInput
          style={styles.textInput}
          placeholderTextColor={colors.cancel}
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
    backgroundColor: colors.bg,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.text,
  },
  txtContainer: {
    flex: 1,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    color: colors.text,
  },
  commentaryContainer: {
    flex: 2,
    padding: 20,
    gap: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.border,
    height: 200,
    borderRadius: 5,
    padding: 5,
    color: colors.text,
  },
  postBtn: {
    alignSelf: "center",
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  postBtnText: {
    fontSize: 16,
    color: colors.bg,
  },
});
