import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { BookContext } from "../contexts/BookProvider";
import { ChaptersSchema } from "../config/schemas";
import { z } from "zod";
import { getChapters } from "../config/helpers";
import { useNavigation } from "@react-navigation/native";

export default function ChangeChapter() {
  const { bookOptions, setBookData, version, book } = useContext(BookContext);
  const navigation = useNavigation();
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
    navigation.goBack();
    setChapterOptions([]);
    setSelectedBook(null);
  }

  useEffect(() => {
    fetchChapters();
  }, [selectedBook]);

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
        <Text>{book}</Text>
      </View>
      <ScrollView>
        {bookOptions.map((b) => (
          <View key={b.id} style={styles.book}>
            <TouchableOpacity onPress={() => handleSelectBook(b.id)}>
              <Text style={styles.abb}>{b.abbreviation}</Text>
              <Text style={styles.name}>{b.name}</Text>
            </TouchableOpacity>
            {selectedBook === b.id && (
              <View style={[styles.chapterContainer, {paddingVertical: chapterOptions.length !== 0 ? 20 : 0}]}>
                {chapterOptions.map((c) => (
                  <TouchableOpacity
                    style={styles.chapter}
                    key={c.id}
                    onPress={() => handleChapterChange(c.id)}
                  >
                    <Text style={{textTransform: "capitalize"}}>{c.number}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  cancel: {
    fontSize: 18,
    color: "#555",
  },
  headerBook: {},
  book: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  abb: {
    fontSize: 16,
    fontWeight: "bold",
  },
  name: {
    fontSize: 12,
  },
  chapterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 10,
  },
  chapter: {
    width: 45,
    height: 45,
    backgroundColor: "#ddd",
    borderWidth: 1,
    borderColor: "#bbb",
    justifyContent: "center",
    alignItems: "center",
  },
});
