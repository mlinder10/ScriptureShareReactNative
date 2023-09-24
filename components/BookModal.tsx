import {
  View,
  Text,
  Modal,
  Button,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { BookContext } from "../contexts/BookProvider";
import { ChaptersSchema } from "../config/schemas";
import { z } from "zod";
import { getChapters } from "../config/helpers";

type BookModalProps = {
  visible: boolean;
  close: () => void;
};

export default function BookModal({ visible, close }: BookModalProps) {
  const { bookOptions, setBookData, version } = useContext(BookContext);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [chapterOptions, setChapterOptions] = useState<
    z.infer<typeof ChaptersSchema>[]
  >([]);

  async function fetchChapters() {
    setChapterOptions([]);
    if (selectedBook === null) return;
    try {
      const res = await getChapters(version, selectedBook);
      if (res === null) return;
      setChapterOptions(res);
    } catch (err: any) {
      console.error(err?.message);
    }
  }

  function handleSelectBook(book: string) {
    if (book !== selectedBook) setSelectedBook(book);
    else setSelectedBook(null);
  }

  function handleChapterChange(chapter: string) {
    setBookData(version, chapter);
    close();
    setChapterOptions([]);
    setSelectedBook(null);
  }

  useEffect(() => {
    fetchChapters();
  }, [selectedBook]);

  return (
    <Modal
      visible={visible}
      presentationStyle="formSheet"
      animationType="slide"
    >
      <Button title="X" onPress={close} />
      <ScrollView>
        {bookOptions.map((b) => (
          <View key={b.id} style={styles.book}>
            <TouchableOpacity onPress={() => handleSelectBook(b.id)}>
              <Text>{b.name}</Text>
            </TouchableOpacity>
            {selectedBook === b.id && (
              <View style={styles.chapterContainer}>
                {chapterOptions.map((c) => (
                  <TouchableOpacity
                    style={styles.chapter}
                    key={c.id}
                    onPress={() => handleChapterChange(c.id)}
                  >
                    <Text>{c.number}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  book: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    gap: 20,
  },
  chapterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    paddingHorizontal: 10,
  },
  chapter: {
    width: 40,
    aspectRatio: "1/1",
    backgroundColor: "#555",
    justifyContent: "center",
    alignItems: "center",
  },
});
