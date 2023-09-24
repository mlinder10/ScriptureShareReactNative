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
import { getChapter } from "../config/helpers";
import { Ionicons } from "@expo/vector-icons";
import { BookContext } from "../contexts/BookProvider";
import { instanceBackend } from "../config/constants";
import { NoteType } from "../config/types";
import ReadHeader from "../components/ReadHeader";
import Line from "../components/Line";

type ContentType = {
  lines: string[];
  next: string;
  previous: string;
};

const defaultContent = {
  lines: [],
  next: "",
  previous: "",
};

export default function Read() {
  const { version, book, chapter, setBookData } = useContext(BookContext);
  const [content, setContent] = useState<ContentType>(defaultContent);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [selectedLines, setSelectedLines] = useState<number[]>([]);
  const [scrolling, setScrolling] = useState<boolean>(false);
  const [prevScroll, setPrevScroll] = useState<number>(0);
  const scrollRef = createRef<ScrollView>();

  async function fetchLines() {
    setContent({ lines: [], next: content.next, previous: content.previous });
    try {
      const res = await getChapter(version, chapter);
      if (res === null) return;
      setContent({
        lines: res.content,
        next: res.next,
        previous: res.previous,
      });
    } catch (err: any) {
      console.error(err?.message);
    }
  }

  async function fetchNotes() {
    try {
      const res = await instanceBackend.get(
        `/note/${version}/${chapter}/${"testid"}`
      );
      setNotes(res.data.notes);
    } catch (err: any) {
      console.error(err?.message);
    }
  }

  function handleOpenCreateNoteModal(number: number) {
    if (selectedLines.length === 0) {
      setSelectedLines([number]);
      return;
    }

    const min = selectedLines[0];
    const max = selectedLines[selectedLines.length - 1];
    if (!selectedLines.includes(number)) {
      if (number < min) {
        let lineNumbers = [];
        for (let i = number; i <= max; i++) {
          lineNumbers.push(i);
        }
        setSelectedLines(lineNumbers);
        return;
      }
      let lineNumbers = [];
      for (let i = min; i <= number; i++) {
        lineNumbers.push(i);
      }
      setSelectedLines(lineNumbers);
      return;
    }

    setSelectedLines([]);
  }

  function getNotes(lineNum: number) {
    let validNotes = [];
    for (const note of notes) {
      if (note.lineNumbers[note.lineNumbers.length - 1] === lineNum)
        validNotes.push(note);
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
    setSelectedLines([]);
    if (direction === "next") setBookData(version, content.next);
    else setBookData(version, content.previous);
  }

  useEffect(() => {
    fetchNotes();
    fetchLines();
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [version, book, chapter]);

  return (
    <View style={{ flex: 1 }}>
      <ReadHeader
        scroll={scrolling}
        lines={{
          numbers: selectedLines,
          text: content.lines.slice(
            selectedLines[0] - 1,
            selectedLines[selectedLines.length - 1]
          ),
        }}
      />
      <ScrollView
        ref={scrollRef}
        style={{ flex: 4 }}
        contentContainerStyle={styles.textContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {content.lines.length === 0 ? (
          <ActivityIndicator
            size="large"
            color="black"
            style={{ marginTop: 200 }}
          />
        ) : (
          <>
            <Text style={{ fontSize: 18, lineHeight: 28 }}>
              {content.lines.map((l, i) => (
                <Line
                  selectLine={handleOpenCreateNoteModal}
                  key={i}
                  number={i + 1}
                  line={l}
                  notes={getNotes(i + 1)}
                  selectedLines={selectedLines}
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
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: 20,
  },
  navBtnContainer: {
    paddingTop: 20,
    paddingBottom: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navBtn: {
    flexDirection: "row",
    backgroundColor: "#08f",
    alignItems: "center",
    gap: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});
