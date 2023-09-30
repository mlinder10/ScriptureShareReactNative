import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import * as ImagePicker from "expo-image-picker";
import { uploadProfilePic } from "../config/helpers";
import ProfileImage from "../components/ProfileImage";
import { FontAwesome } from "@expo/vector-icons";
import { NoteType } from "../config/types";
import { colors, instanceBackend } from "../config/constants";
import CondensedNote from "../components/CondensedNote";
import { BookContext } from "../contexts/BookProvider";
import { NavContext } from "../contexts/navigation";
import CondensedUser from "../components/CondensedUser";

type FileType = {
  uri: string;
  type: string;
  name: string;
};

export default function Account() {
  const { user, updateUser, friends } = useContext(AuthContext);
  const { version, book, chapter } = useContext(BookContext);
  const { navigate } = useContext(NavContext);
  const [notes, setNotes] = useState<NoteType[]>([]);

  async function openImagePicker() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled) return;
    let uri = result.assets[0].uri;
    let filename = uri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename ?? "");
    let type = match ? `image/${match[1]}` : `image`;
    await handleUpload({ uri, type, name: filename ?? "" });
  }

  async function handleUpload(file: FileType) {
    if (user === null || file === null) return;
    const { path } = await uploadProfilePic(user._id, file);
    if (path !== null) updateUser({ ...user, profileImage: path });
  }

  async function fetchNotes() {
    if (user === null) return;
    try {
      const res = await instanceBackend.get(`/note/${user._id}`);
      setNotes(res.data.notes);
    } catch (err: any) {
      console.error(err?.message);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Pressable onPress={openImagePicker}>
            <ProfileImage size={50} uri={user?.profileImage ?? ""} />
          </Pressable>
          <Text style={styles.username}>{user?.username}</Text>
        </View>
        <TouchableOpacity onPress={() => navigate("Settings")}>
          <FontAwesome style={styles.settings} name="cog" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.row}>
          <Text style={styles.rowTitle}>Your Notes</Text>
          <FlatList
            contentContainerStyle={styles.flatListInner}
            data={notes}
            horizontal
            renderItem={({ item }) => <CondensedNote note={item} />}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.rowTitle}>Your Friends</Text>
          <FlatList
            contentContainerStyle={[styles.flatListInner, { height: 120 }]}
            data={friends}
            horizontal
            renderItem={({ item }) => <CondensedUser user={item} />}
          />
        </View>
        <View>
          <Text style={styles.rowTitle}>Your Info</Text>
          <View style={styles.infoContainer}>
            <View style={styles.staticColumn}>
              <Text style={styles.static}>Total Notes:</Text>
              <Text style={styles.static}>Friends:</Text>
              <Text style={styles.static}>Current Chapter:</Text>
              <Text style={styles.static}>Current Book:</Text>
              <Text style={styles.static}>Current Version:</Text>
            </View>
            <View style={styles.dynamicColumn}>
              <Text style={styles.dynamic}>{notes.length}</Text>
              <Text style={styles.dynamic}>{user?.friends.length}</Text>
              <Text style={styles.dynamic}>{chapter.replace(".", " ")}</Text>
              <Text style={styles.dynamic}>{book}</Text>
              <Text style={styles.dynamic}>{version.name}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.bg,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileContainer: {
    flexDirection: "row",
    gap: 20,
    alignItems: "flex-end",
  },
  settings: {
    fontSize: 24,
    color: colors.text,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
  },
  flatListInner: {
    height: 160,
    gap: 20,
    padding: 20,
  },
  row: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: "600",
    paddingLeft: 20,
    paddingTop: 20,
    color: colors.text,
  },
  infoContainer: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  staticColumn: {
    gap: 10,
  },
  dynamicColumn: {
    alignItems: "flex-end",
    gap: 10,
  },
  static: {
    fontWeight: "bold",
    color: colors.text,
  },
  dynamic: {
    color: colors.text,
  },
});
