import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { BookContext } from "../contexts/BookProvider";
import { ChaptersSchema } from "../config/schemas";
import { z } from "zod";
import { getChapters } from "../config/helpers";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../config/constants";

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
      const res = await getChapters(version.id, selectedBook);
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
        <Text style={{ color: colors.text }}>{book}</Text>
      </View>
      <FlatList
        data={bookOptions}
        contentContainerStyle={{ paddingBottom: 60 }}
        ListEmptyComponent={<ActivityIndicator />}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.book}>
            <TouchableOpacity onPress={() => handleSelectBook(item.id)}>
              <Text style={styles.abb}>{item.abbreviation}</Text>
              <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
            {selectedBook === item.id && (
              <View
                style={[
                  styles.chapterContainer,
                  { paddingVertical: chapterOptions.length !== 0 ? 20 : 0 },
                ]}
              >
                {chapterOptions.map((c) => (
                  <TouchableOpacity
                    style={styles.chapter}
                    key={c.id}
                    onPress={() => handleChapterChange(c.id)}
                  >
                    <Text
                      style={{
                        textTransform: "capitalize",
                        color: colors.text,
                      }}
                    >
                      {c.number}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.bg,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  cancel: {
    fontSize: 18,
    color: colors.cancel,
  },
  book: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  abb: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
  name: {
    fontSize: 12,
    color: colors.text,
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
    backgroundColor: colors.borderSecondary,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
});
