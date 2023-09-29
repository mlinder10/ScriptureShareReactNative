import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { BookContext } from "../contexts/BookProvider";
import { instanceAPI } from "../config/constants";
import { VerseSchema } from "../config/schemas";
import { VerseType } from "../config/types";
import { NavContext } from "../contexts/navigation";
import Searchbar from "../components/Searchbar";

export default function Search() {
  const { version, setBookData } = useContext(BookContext);
  const { navigate } = useContext(NavContext);
  const [verses, setVerses] = useState<VerseType[] | "loading" | "no match">(
    []
  );
  const [search, setSearch] = useState<string>("");

  function handleFind(verse: VerseType) {
    setBookData(version, verse.chapterId);
    navigate("Read");
  }

  useEffect(() => {
    let debounceTimer: NodeJS.Timeout | null = null;

    async function performSearch() {
      if (search === "") return;
      setVerses("loading");
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
      } catch (err: any) {
        setVerses("no match");
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
        containerStyles={{ paddingTop: 30, backgroundColor: "#fff" }}
      />
      <ScrollView style={styles.page} contentContainerStyle={styles.container}>
        {verses === "loading" && (
          <ActivityIndicator style={{ marginTop: 200 }} />
        )}
        {verses === "no match" && (
          <View>
            <Text>No matches for {search}</Text>
          </View>
        )}
        {typeof verses !== "string" &&
          verses.map((v) => (
            <View style={styles.verse} key={v.id}>
              <Text style={styles.chapter}>{v.reference}</Text>
              <Text style={styles.text}>{v.text}</Text>
              <TouchableOpacity
                style={styles.read}
                onPress={() => handleFind(v)}
              >
                <Text style={styles.readText}>Read</Text>
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    borderTopWidth: 1,
    borderTopColor: "#bbb",
  },
  container: {
    gap: 20,
    paddingBottom: 100,
  },
  verse: {
    borderBottomWidth: 1,
    padding: 20,
    gap: 10,
  },
  chapter: {
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
  },
  read: {
    backgroundColor: "#08f",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  readText: {
    color: "#fff",
    fontSize: 16,
  },
});
