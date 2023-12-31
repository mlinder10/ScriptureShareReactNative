import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { NoteType } from "../config/types";
import { formatVerses, shortenContent } from "../config/helpers";
import { NavContext } from "../contexts/navigation";
import { useContext } from "react";
import { colors } from "../config/constants";

type CondensedNoteProps = {
  note: NoteType;
};

export default function CondensedNote({ note }: CondensedNoteProps) {
  const { navigate } = useContext(NavContext);

  return (
    <View style={styles.note} key={note._id}>
      <Text style={styles.verses}>
        {formatVerses(note.chapter, note.lineNumbers)}
      </Text>
      <Text style={{ textAlign: "center", color: colors.text }}>
        {shortenContent(note.content)}
      </Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigate("ReadNote", { note: note })}
      >
        <Text style={styles.btnText}>Open</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  note: {
    borderColor: colors.borderSecondary,
    borderWidth: 1,
    borderRadius: 10,
    width: (Dimensions.get("window").width - 40) / 2 - 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  verses: {
    fontWeight: "bold",
    color: colors.text
  },
  btn: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  btnText: {
    color: colors.bg,
  },
});
