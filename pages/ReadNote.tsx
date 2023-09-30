import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { RouteProp } from "@react-navigation/native";
import { StackParamList } from "../config/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { formatVerses } from "../config/helpers";
import { AuthContext } from "../contexts/AuthProvider";
import { colors } from "../config/constants";

type ReadNoteProps = {
  route: RouteProp<StackParamList, "ReadNote">;
  navigation: StackNavigationProp<StackParamList, "ReadNote">;
};

export default function ReadNote({ route, navigation }: ReadNoteProps) {
  const { note } = route.params;
  const { user, friends } = useContext(AuthContext);

  function getUsername() {
    if (note.userId === user!._id) return "You";
    for (const friend of friends) {
      if (friend._id === note.userId) return friend.username;
    }
    return "Unknown";
  }

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeBtnText}>Close</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {formatVerses(note.chapter, note.lineNumbers)}
        </Text>
        <Text style={styles.username}>{getUsername()}</Text>
      </View>
      <View style={styles.txtContainer}>
        <View style={styles.verseContainer}>
          <Text style={styles.verseTitle}>
            {note.lines.length === 1 ? "Verse" : "Verses"}
          </Text>
          <Text>
            {note.lines.map((l, i) => (
              <Text style={{ color: colors.text }} key={i}>
                {l}
              </Text>
            ))}
          </Text>
        </View>
        <View style={styles.commentaryContainer}>
          <Text style={styles.commentaryTitle}>Commentary</Text>
          <Text style={{ color: colors.text }}>{note.content}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.bg,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  closeBtnText: {
    fontSize: 18,
    color: colors.cancel,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.text,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
  txtContainer: {
    padding: 20,
    gap: 40,
  },
  verseContainer: {
    gap: 10,
  },
  verseTitle: {
    alignSelf: "center",
    fontWeight: "bold",
    color: colors.text,
  },
  commentaryContainer: {
    gap: 10,
  },
  commentaryTitle: {
    alignSelf: "center",
    fontWeight: "bold",
    color: colors.text,
  },
});
