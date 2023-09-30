import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { BookContext } from "../contexts/BookProvider";
import { useContext, useEffect, useState } from "react";
import { BiblesSchema } from "../config/schemas";
import { z } from "zod";
import { filterAbb, getBibleVersions } from "../config/helpers";
import { useNavigation } from "@react-navigation/native";
import { BibleType } from "../config/types";
import { colors } from "../config/constants";

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

  function handleVersionChange(version: BibleType) {
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
        <Text style={styles.headerVersion}>{version.name}</Text>
      </View>
      <FlatList
        ListEmptyComponent={<ActivityIndicator />}
        contentContainerStyle={styles.scroll}
        data={versions}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.version}
            key={item.id}
            onPress={() => handleVersionChange(item)}
          >
            <Text style={styles.abb}>{filterAbb(item.abbreviation)}</Text>
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
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
  headerVersion: {
    color: colors.text,
  },
  scroll: {
    paddingBottom: 65,
  },
  version: {
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
});
