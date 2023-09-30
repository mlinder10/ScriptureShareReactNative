import { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { BibleType, NoteType, UserType } from "../config/types";
import { instanceBackend } from "../config/constants";
import { NavContext } from "../contexts/navigation";
import { filterAbb, getBibleVersions } from "../config/helpers";
import { AuthContext } from "../contexts/AuthProvider";
import ProfileImage from "../components/ProfileImage";
import { BookContext } from "../contexts/BookProvider";
import CondensedNote from "../components/CondensedNote";
import CondensedUser from "../components/CondensedUser";

const notesLimit = 10;

export default function Home() {
  const [friendsNotes, setFriendsNotes] = useState<NoteType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [bibles, setBibles] = useState<BibleType[]>([]);
  const [fetchingNotes, setFetchingNotes] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const { navigate } = useContext(NavContext);
  const { user } = useContext(AuthContext);
  const { setBookData, chapter } = useContext(BookContext);

  async function fetchFriendsNotes() {
    if (user === null) return;
    try {
      const res = await instanceBackend.get(
        `/note/friends/${user._id}?limit=${notesLimit}`
      );
      setFriendsNotes(res.data.notes);
    } catch (err: any) {
      console.error(err?.message);
    }
  }

  async function fetchNewFriends() {
    if (user === null) return;
    try {
      const res = await instanceBackend.get(`/user/nfriends/${user._id}`);
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

  function handleSelectBible(version: BibleType) {
    setBookData(version, chapter);
    navigate("Read");
  }

  function updateOffset(event: NativeSyntheticEvent<NativeScrollEvent>) {
    if (
      event.nativeEvent.contentSize.width ===
      event.nativeEvent.contentOffset.x + Dimensions.get("window").width
    )
      setOffset(offset + 1);
  }

  useEffect(() => {
    fetchFriendsNotes();
    fetchNewFriends();
    fetchBibles();
  }, [user]);

  useEffect(() => {
    async function fetchMoreNotes() {
      if (user === null || fetchingNotes) return;
      try {
        setFetchingNotes(true);
        const res = await instanceBackend.get(
          `/note/friends/${user._id}?limit=${notesLimit}&offset=${
            offset * notesLimit
          }`
        );
        setFriendsNotes([...friendsNotes, ...res.data.notes]);
        setFetchingNotes(false);
      } catch (err: any) {
        console.error(err?.message);
        setFetchingNotes(false);
      }
    }

    fetchMoreNotes();
  }, [offset]);

  return (
    <View style={styles.page}>
      <View style={styles.row}>
        <Text style={styles.rowTitle}>Friends' Notes</Text>
        <FlatList
          onScroll={updateOffset}
          scrollEventThrottle={50}
          data={friendsNotes}
          contentContainerStyle={styles.flatList}
          ListEmptyComponent={EmptyFriendsNotes}
          horizontal
          renderItem={({ item }) => <CondensedNote note={item} />}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.rowTitle}>Find New Friends</Text>
        <FlatList
          data={users}
          contentContainerStyle={[styles.flatList, { height: 120 }]}
          horizontal
          ListEmptyComponent={EmptyNewFriends}
          renderItem={({ item }) => <CondensedUser user={item} />}
        />
      </View>
      <View style={[styles.row, { borderBottomWidth: 0 }]}>
        <Text style={styles.rowTitle}>Featured Bible Versions</Text>
        <FlatList
          contentContainerStyle={[styles.flatList, {}]}
          horizontal
          data={bibles}
          renderItem={({ item }) => (
            <View style={styles.bible}>
              <Text style={styles.abb}>{filterAbb(item.abbreviation)}</Text>
              <Text style={styles.bibleName}>{item.name}</Text>
              <Pressable
                style={styles.btn}
                onPress={() => handleSelectBible(item)}
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

function EmptyFriendsNotes() {
  return (
    <View
      style={{
        alignSelf: "center",
        paddingHorizontal: (Dimensions.get("window").width - 190) / 2,
      }}
    >
      <Text style={{ textAlign: "center", width: 150 }}>
        Add friends to get new insights into scripture
      </Text>
    </View>
  );
}

function EmptyNewFriends() {
  return (
    <View
      style={{
        alignSelf: "center",
        paddingHorizontal: (Dimensions.get("window").width - 190) / 2,
      }}
    >
      <Text style={{ textAlign: "center", width: 150 }}>
        You're friends with everyone on the app!
      </Text>
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
  flatList: {
    height: 160,
    gap: 20,
    padding: 20,
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
  bible: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  abb: {
    fontWeight: "bold",
  },
  bibleName: {
    maxWidth: 160,
    textAlign: "center",
  },
});
