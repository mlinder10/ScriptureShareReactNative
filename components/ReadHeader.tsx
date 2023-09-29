import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BookContext } from "../contexts/BookProvider";
import { useContext } from "react";
import { NavContext } from "../contexts/navigation";
import { filterAbb } from "../config/helpers";

type LineType = {
  text: string[];
  numbers: number[];
};

type ReadHeaderProps = {
  scroll: boolean;
  lines: LineType;
};

const scrollContainerStyles = {
  paddingTop: 20,
  paddingBottom: 0,
};

const scrollBtnStyles = {
  fontSize: 14,
};

export default function ReadHeader({ scroll, lines }: ReadHeaderProps) {
  const { chapter, version } = useContext(BookContext);
  const { navigate } = useContext(NavContext);

  return (
    <View style={[styles.container, scroll ? scrollContainerStyles : null]}>
      <View style={[styles.btnContainer, scroll ? { gap: 2 } : null]}>
        <TouchableOpacity
          style={styles.versionBtn}
          onPress={() => navigate("ChangeVersion")}
        >
          <Text style={[styles.text, scroll ? scrollBtnStyles : null]}>
            {filterAbb(version.abbreviation)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() => navigate("ChangeChapter")}
        >
          <Text style={[styles.text, scroll ? scrollBtnStyles : null]}>
            {chapter.replace(".", " ")}
          </Text>
        </TouchableOpacity>
      </View>
      {lines.numbers.length !== 0 && (
        <TouchableOpacity onPress={() => navigate("CreateNote", { lines })}>
          <Text style={styles.noteText}>Make Note</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#bbb",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnContainer: {
    flexDirection: "row",
    gap: 5,
  },
  versionBtn: {
    backgroundColor: "#08f",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  bookBtn: {
    backgroundColor: "#08f",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
  noteText: {
    fontSize: 16,
    color: "#555",
  },
});
