import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BookContext } from "../contexts/BookProvider";
import { filterAbb } from "../config/helpers";
import { colors } from "../config/constants";
import { NavContext } from "../contexts/navigation";

export function ReadHeaderLeft() {
  const { version, chapter } = useContext(BookContext);
  const { navigate } = useContext(NavContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.version}
        onPress={() => navigate("ChangeVersion")}
      >
        <Text style={styles.text}>{filterAbb(version.abbreviation)}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.chapter}
        onPress={() => navigate("ChangeChapter")}
      >
        <Text style={styles.text}>{chapter.replace(".", " ")}</Text>
      </TouchableOpacity>
    </View>
  );
}

export function ReadHeaderRight() {
  const { navigate } = useContext(NavContext);

  return (
    <TouchableOpacity onPress={() => navigate("FilterNotes")}>
      <Text style={styles.filterText}>Filter Notes</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 5,
  },
  version: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  chapter: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  text: {
    color: colors.bg,
    fontSize: 18,
  },
  filterText: {
    color: colors.cancel,
    fontSize: 18,
  },
});
