import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { RouteProp } from "@react-navigation/native";
import { StackParamList } from "../config/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { formatVerses } from "../config/helpers";

type ReadNoteProps = {
  route: RouteProp<StackParamList, "ReadNote">;
  navigation: StackNavigationProp<StackParamList, "ReadNote">;
};

export default function ReadNote({ route, navigation }: ReadNoteProps) {
  const { note } = route.params;

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {formatVerses(note.chapter, note.lineNumbers)}
        </Text>
      </View>
      <View style={styles.txtContainer}>
        <View style={styles.verseContainer}>
          <Text style={styles.verseTitle}>
            {note.lines.length === 1 ? "Verse" : "Verses"}
          </Text>
          <Text>
            {note.lines.map((l, i) => (
              <Text key={i}>{l}</Text>
            ))}
          </Text>
        </View>
        <View style={styles.commentaryContainer}>
          <Text style={styles.commentaryTitle}>Commentary</Text>
          <Text>{note.content}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
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
  },
  commentaryContainer: {
    gap: 10,
  },
  commentaryTitle: {
    alignSelf: "center",
    fontWeight: "bold"
  },
});
