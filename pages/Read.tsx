import {
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { Fragment, useContext, useEffect, useState } from "react";
import { getChapter } from "../helpers";
import { Ionicons } from "@expo/vector-icons";
import CreateNoteModal from "../components/CreateNoteModal";
import { BookContext } from "../contexts/BookProvider";
import VersionModal from "../components/VersionModal";
import BookModal from "../components/BookModal";
import { instanceBackend } from "../config/constants";
import { NoteType } from "../types";
import Notes from "../components/Notes";
import NoteModal from "../components/NoteModal";

export default function Read() {
  const { version, book, chapter, setBookData } = useContext(BookContext);
  const [lines, setLines] = useState<string[]>([]);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [previous, setPrevious] = useState<string>("");
  const [next, setNext] = useState<string>("");
  const [bookModalVisible, setBookModalVisible] = useState<boolean>(false);
  const [selectedLines, setSelectedLines] = useState<number[]>([]);
  const [createNoteModalOpen, setCreateNoteModalOpen] =
    useState<boolean>(false);
  const [versionModalodalVisible, setVersionModalodalVisible] =
    useState<boolean>(false);
  const [openNote, setOpenNote] = useState<NoteType | null>(null);

  async function fetchLines() {
    try {
      const res = await getChapter(version, chapter);
      if (res === null) return;
      setLines(res.content);
      setPrevious(res.previous);
      setNext(res.next);
      if (chapter.length > 5 && res.content.length === 0) setLines(["Intro"]);
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

  // loops through all lines, looping through all notes,
  // n = lines
  // m = notes
  // lines = ~30
  // notes = 0 - ?
  // O(n + nm)
  function getNotes(lineNum: number) {
    let validNotes = []
    for (const note of notes) {
      if (note.lineNumbers[note.lineNumbers.length - 1] === lineNum)
        validNotes.push(note);
    }
    return validNotes;
  }

  useEffect(() => {
    fetchNotes();
    fetchLines();
  }, [version, book, chapter]);

  useEffect(() => {
    if (selectedLines.length === 0) setCreateNoteModalOpen(false);
    else setCreateNoteModalOpen(true);
  }, [selectedLines]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 4 }}
        contentContainerStyle={styles.textContainer}
      >
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.versionBtn}
            onPress={() => setVersionModalodalVisible(true)}
          >
            <Text style={styles.text}>Version</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bookBtn}
            onPress={() => setBookModalVisible(true)}
          >
            <Text style={styles.text}>{book}</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 18, lineHeight: 28 }}>
          {lines.map((l, i) => (
            <Fragment key={i}>
              <Text
                style={{
                  textDecorationLine: selectedLines.includes(i + 1)
                    ? "underline"
                    : "none",
                  textDecorationColor: "#08f",
                }}
                onPress={() => handleOpenCreateNoteModal(i + 1)}
              >
                {i + 1 + " " + l}
              </Text>
              <Notes notes={getNotes(i + 1)} setNote={setOpenNote} />
            </Fragment>
          ))}
        </Text>
        <TouchableOpacity
          style={styles.previous}
          onPress={() => setBookData(version, previous)}
        >
          <Ionicons name="arrow-back" style={styles.text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.next}
          onPress={() => setBookData(version, next)}
        >
          <Ionicons name="arrow-forward" style={styles.text} />
        </TouchableOpacity>
      </ScrollView>
      <VersionModal
        visible={versionModalodalVisible}
        close={() => setVersionModalodalVisible(false)}
      />
      <BookModal
        visible={bookModalVisible}
        close={() => setBookModalVisible(false)}
      />
      <CreateNoteModal
        visible={createNoteModalOpen}
        lineNumbers={selectedLines}
        lines={lines.slice(
          selectedLines[0] - 1,
          selectedLines[selectedLines.length - 1]
        )}
        fetchNotes={fetchNotes}
        close={() => setSelectedLines([])}
      />
      <NoteModal note={openNote} close={() => setOpenNote(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  btnContainer: {
    position: "absolute",
    top: 10,
    left: 10,
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
  previous: {
    position: "absolute",
    bottom: 10,
    left: 20,
    backgroundColor: "#08f",
    width: 40,
    aspectRatio: "1/1",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  next: {
    position: "absolute",
    bottom: 10,
    right: 20,
    backgroundColor: "#08f",
    width: 40,
    aspectRatio: "1/1",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  text: {
    color: "#fff",
  },
});
