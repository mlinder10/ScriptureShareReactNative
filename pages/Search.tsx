import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { BookContext } from "../contexts/BookProvider";
import { colors, instanceAPI } from "../config/constants";
import { VerseSchema } from "../config/schemas";
import { VerseType } from "../config/types";
import { NavContext } from "../contexts/navigation";
import Searchbar from "../components/Searchbar";

export default function Search() {
  const { version, setBookData } = useContext(BookContext);
  const { navigate } = useContext(NavContext);
  const [search, setSearch] = useState<string>("");
  const [verseStatus, setVerseStatus] = useState<
    "loading" | "no match" | "done"
  >("done");
  const [verses, setVerses] = useState<VerseType[]>([]);

  function handleFind(verse: VerseType) {
    setBookData(version, verse.chapterId);
    navigate("Read");
  }

  useEffect(() => {
    let debounceTimer: NodeJS.Timeout | null = null;

    async function performSearch() {
      if (search === "") return;
      setVerseStatus("loading");
      try {
        let newVerses = [];
        const res = await instanceAPI.get(
          `bibles/${version.id}/search?query=${encodeURIComponent(
            search
          )}&sort=relevance`
        );
        for (const verse of res.data.data.verses) {
          newVerses.push(VerseSchema.parse(verse));
        }
        setVerses(newVerses);
        setVerseStatus("done");
      } catch (err: any) {
        setVerseStatus("no match");
        console.error(err?.message);
      }
    }

    if (debounceTimer !== null) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(performSearch, 300);

    return () => {
      if (debounceTimer !== null) clearTimeout(debounceTimer);
    };
  }, [search, version]);

  return (
    <View>
      <Searchbar
        search={search}
        setSearch={setSearch}
        containerStyles={{ paddingTop: 30, backgroundColor: colors.bg }}
      />
      <View style={styles.page}>
        {verseStatus === "loading" && <ActivityIndicator />}
        {verseStatus === "no match" && <Text>No matches for {search}</Text>}
        <FlatList
          contentContainerStyle={styles.container}
          data={verses}
          renderItem={({ item }) => (
            <View style={styles.verse} key={item.id}>
              <Text style={styles.chapter}>{item.reference}</Text>
              <Text style={styles.text}>{item.text}</Text>
              <TouchableOpacity
                style={styles.read}
                onPress={() => handleFind(item)}
              >
                <Text style={styles.readText}>Read</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  container: {
    gap: 20,
    paddingBottom: 170,
  },
  verse: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    padding: 20,
    gap: 10,
  },
  chapter: {
    fontWeight: "bold",
    color: colors.text,
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
    color: colors.text,
  },
  read: {
    backgroundColor: colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  readText: {
    color: colors.bg,
    fontSize: 16,
  },
});
