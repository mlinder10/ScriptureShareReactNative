import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BookContext } from "../contexts/BookProvider";
import { useContext } from "react";
import { NavContext } from "../contexts/navigation";
import { filterAbb } from "../config/helpers";
import { colors } from "../config/constants";

type ReadHeaderProps = {
  scroll: boolean;
};

const scrollContainerStyles = {
  paddingTop: 20,
  paddingBottom: 0,
};

const scrollBtnStyles = {
  fontSize: 14,
};

export default function ReadHeader({ scroll }: ReadHeaderProps) {
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
      <TouchableOpacity
        style={styles.filterBtn}
        onPress={() => navigate("FilterNotes")}
      >
        <Text style={[styles.filterText, scroll ? { fontSize: 14 } : null]}>
          Filter Notes
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: colors.bg,
    flexDirection: "row",
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnContainer: {
    flexDirection: "row",
    gap: 5,
  },
  versionBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  bookBtn: {
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
  filterBtn: {
    borderColor: colors.primary,
    backgroundColor: colors.bgSecondary,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  filterText: {
    color: colors.primary,
    fontSize: 18,
  },
});
