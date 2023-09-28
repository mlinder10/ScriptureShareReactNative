import { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
  FlatList,
} from "react-native";
import { BibleType, NoteType, UserType } from "../config/types";
import { instanceBackend } from "../config/constants";
import { NavContext } from "../contexts/navigation";
import {
  formatVerses,
  getBibleVersions,
  shortenContent,
} from "../config/helpers";
import { AuthContext } from "../contexts/AuthProvider";
import ProfileImage from "../components/ProfileImage";
import { BookContext } from "../contexts/BookProvider";

export default function Home() {
  const [friendsNotes, setFriendsNotes] = useState<NoteType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [bibles, setBibles] = useState<BibleType[]>([]);
  const { navigate } = useContext(NavContext);
  const { user } = useContext(AuthContext);
  const { setBookData, chapter } = useContext(BookContext);

  async function fetchFriendsNotes() {
    if (user === null) return;
    try {
      const res = await instanceBackend.get(`/note/${user._id}`);
      setFriendsNotes(res.data.notes);
    } catch (err: any) {
      console.error(err?.message);
    }
  }

  async function fetchNewFriends() {
    if (user === null) return;
    try {
      const res = await instanceBackend.get(`/user/${user._id}`);
      setUsers(res.data.users);
    } catch (err: any) {
      console.error(err?.message);
    }
  }

  async function fetchBibles() {
    try {
      const res = await getBibleVersions();
      if (res !== null) setBibles(res);
    } catch (err: any) {
      console.error(err?.message);
    }
  }

  function handleSelectBible(version: string) {
    setBookData(version, chapter);
    navigate("Read");
  }

  useEffect(() => {
    fetchFriendsNotes();
    fetchNewFriends();
    fetchBibles();
  }, [user]);

  return (
    <View style={styles.page}>
      <View style={styles.row}>
        <Text style={styles.rowTitle}>Friends' Notes</Text>
        {friendsNotes.length === 0 ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 140,
            }}
          >
            <Text style={{ textAlign: "center", width: 150 }}>
              Add friends to get new insights into scripture
            </Text>
          </View>
        ) : (
          <FlatList
            data={friendsNotes}
            contentContainerStyle={styles.scrollView}
            horizontal
            renderItem={({ item }) => (
              <View style={styles.note} key={item._id}>
                <Text style={styles.verses}>
                  {formatVerses(item.chapter, item.lineNumbers)}
                </Text>
                <Text style={{ textAlign: "center" }}>
                  {shortenContent(item.content)}
                </Text>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => navigate("ReadNote", { note: item })}
                >
                  <Text style={styles.btnText}>Open</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
      <View style={styles.row}>
        <Text style={styles.rowTitle}>Find New Friends</Text>
        {users.length === 0 ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 120,
            }}
          >
            <Text style={{ textAlign: "center", width: 150 }}>
              You're friends with everyone on the app!
            </Text>
          </View>
        ) : (
          <FlatList
            data={users}
            contentContainerStyle={[styles.scrollView, { height: 120 }]}
            horizontal
            renderItem={({ item }) => (
              <Pressable
                style={styles.user}
                key={item._id}
                onPress={() => navigate("User", { user: item })}
              >
                <ProfileImage uri={item.profileImage} />
                <Text>{item.username}</Text>
              </Pressable>
            )}
          />
        )}
      </View>
      <View style={[styles.row, { borderBottomWidth: 0 }]}>
        <Text style={styles.rowTitle}>Featured Bible Versions</Text>
        <FlatList
          contentContainerStyle={[styles.scrollView, {}]}
          horizontal
          data={bibles}
          renderItem={({ item }) => (
            <View style={styles.bible}>
              <Text style={styles.abb}>{item.abbreviation}</Text>
              <Text style={styles.bibleName}>{item.name}</Text>
              <Pressable
                style={styles.btn}
                onPress={() => handleSelectBible(item.id)}
              >
                <Text style={styles.btnText}>Read</Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {},
  row: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  rowTitle: {
    fontWeight: "bold",
    fontSize: 16,
    paddingTop: 20,
    paddingLeft: 20,
  },
  scrollView: {
    height: 160,
    gap: 20,
    padding: 20,
  },
  note: {
    borderColor: "#888",
    borderWidth: 1,
    borderRadius: 10,
    width: (Dimensions.get("window").width - 40) / 2 - 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  verses: {
    fontWeight: "bold",
  },
  btn: {
    backgroundColor: "#08f",
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  btnText: {
    color: "#fff",
  },
  user: {
    alignItems: "center",
    gap: 10,
  },
  bible: {
    alignItems: "center",
    justifyContent: "space-between"
  },
  abb: {
    fontWeight: "bold",
  },
  bibleName: {
    maxWidth: 160,
    textAlign: "center"
  },
});
