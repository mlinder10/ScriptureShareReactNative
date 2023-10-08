import {
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { createRef, useContext, useEffect, useState } from "react";
import { getLineNum } from "../config/helpers";
import { Ionicons } from "@expo/vector-icons";
import { BookContext } from "../contexts/BookProvider";
import ReadHeader from "../components/ReadHeader";
import Line from "../components/Line";
import { colors } from "../config/constants";
import { NavContext } from "../contexts/navigation";

export default function Read() {
  const {
    version,
    book,
    chapter,
    setBookData,
    content,
    notes,
    selectedLines,
    handleSelectLine,
  } = useContext(BookContext);
  const { navigate } = useContext(NavContext);
  const [scrolling, setScrolling] = useState<boolean>(false);
  const [prevScroll, setPrevScroll] = useState<number>(0);
  const scrollRef = createRef<ScrollView>();

  function getNotes(lineNum: number) {
    let validNotes = [];
    for (const note of notes) {
      if (note.lineNumbers[0] === lineNum) validNotes.push(note);
    }
    return validNotes;
  }

  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const currentScroll = event.nativeEvent.contentOffset.y;
    const height =
      event.nativeEvent.contentSize.height - Dimensions.get("window").height;
    if (
      (currentScroll < prevScroll && currentScroll < height - 30) ||
      currentScroll < 30
    )
      setScrolling(false);
    else setScrolling(true);

    setPrevScroll(currentScroll);
  }

  function handlePageChange(direction: "next" | "last") {
    if (direction === "next") setBookData(version, content.next);
    else setBookData(version, content.previous);
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [version, book, chapter]);

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <ReadHeader scroll={scrolling} />
      <ScrollView
        ref={scrollRef}
        style={{ flex: 4 }}
        contentContainerStyle={styles.textContainer}
        onScroll={handleScroll}
        scrollEventThrottle={60}
      >
        {content.lines.length === 0 ? (
          <ActivityIndicator style={{ marginTop: 200 }} />
        ) : (
          <>
            <Text style={{ fontSize: 18, lineHeight: 28 }}>
              {content.lines.map((l, i) => (
                <Line
                  selectLine={handleSelectLine}
                  key={i}
                  number={getLineNum(l)}
                  line={l}
                  notes={getNotes(getLineNum(l))}
                />
              ))}
            </Text>
            <View style={styles.navBtnContainer}>
              <TouchableOpacity
                style={styles.navBtn}
                onPress={() => handlePageChange("last")}
              >
                <Ionicons name="arrow-back" style={styles.text} />
                <Text style={styles.text}>Last</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navBtn}
                onPress={() => handlePageChange("next")}
              >
                <Text style={styles.text}>Next</Text>
                <Ionicons name="arrow-forward" style={styles.text} />
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
      {selectedLines.length !== 0 && (
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() =>
              navigate("CreateNote", {
                lines: {
                  numbers: selectedLines,
                  text: content.lines.slice(
                    selectedLines[0] - 1,
                    selectedLines[selectedLines.length - 1]
                  ),
                },
              })
            }
          >
            <Ionicons name="pencil" color={colors.text} size={30} />
          </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  navBtnContainer: {
    paddingTop: 20,
    paddingBottom: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navBtn: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    alignItems: "center",
    gap: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  text: {
    color: colors.bg,
    fontSize: 16,
  },
  addBtn: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.text,
    borderWidth: 1,
  },
  compareBtn: {
    position: "absolute",
    bottom: 30,
    left: 30,
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.text,
    borderWidth: 1,
  },
});
