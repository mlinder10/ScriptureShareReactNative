import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { BookContext } from "../contexts/BookProvider";
import { useContext, useEffect, useState } from "react";
import { BiblesSchema } from "../config/schemas";
import { z } from "zod";
import { getBibleVersions } from "../config/helpers";
import { useNavigation } from "@react-navigation/native";

export default function ChangeVersion() {
  const { version, chapter, setBookData } = useContext(BookContext);
  const [versions, setVersions] = useState<z.infer<typeof BiblesSchema>[]>([]);
  const navigation = useNavigation();

  async function fetchVersions() {
    try {
      const res = await getBibleVersions();
      if (res !== null) setVersions(res);
    } catch (err: any) {
      console.error(err?.message);
    }
  }

  function filterAbb(abbreviation: string) {
    if (abbreviation.startsWith("eng")) return abbreviation.slice(3);
    return abbreviation;
  }

  function handleVersionChange(version: string) {
    setBookData(version, chapter);
    navigation.goBack();
  }

  useEffect(() => {
    fetchVersions();
  }, []);

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerVersion}>{version}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        {versions.map((v) => (
          <TouchableOpacity
            style={styles.version}
            key={v.id}
            onPress={() => handleVersionChange(v.id)}
          >
            <Text style={styles.abb}>{filterAbb(v.abbreviation)}</Text>
            <Text style={styles.name}>{v.name}</Text>
          </TouchableOpacity>
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
  headerVersion: {},
  scroll: {
    paddingBottom: 55,
  },
  version: {
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
});
