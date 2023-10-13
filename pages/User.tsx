import { RouteProp } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { NoteType, StackParamList, UserType } from "../config/types";
import { useContext, useEffect, useState } from "react";
import { colors, instanceBackend } from "../config/constants";
import CondensedNote from "../components/CondensedNote";
import CondensedUser from "../components/CondensedUser";
import { NavContext } from "../contexts/navigation";

type UserProps = {
  route: RouteProp<StackParamList, "User">;
};

export default function User({ route }: UserProps) {
  const pageUser = route.params.user;
  const { navigate } = useContext(NavContext);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [friends, setFriends] = useState<UserType[]>([]);

  async function fetchNotes() {
    try {
      const res = await instanceBackend.get(`/note/${pageUser._id}`);
      setNotes(res.data.notes);
    } catch (err: any) {}
  }

  async function fetchFriends() {
    try {
      const res = await instanceBackend.get(`/user/friends/${pageUser._id}`);
      setFriends(res.data.friends);
    } catch (err: any) {}
  }

  useEffect(() => {
    fetchNotes();
    fetchFriends();
  }, [pageUser]);

  return (
    <View style={styles.page}>
      <ScrollView>
        <View style={styles.row}>
          <Text style={styles.rowTitle}>{pageUser.username + "'s"} Notes</Text>
          <FlatList
            contentContainerStyle={styles.flatListInner}
            data={notes}
            horizontal
            renderItem={({ item }) => <CondensedNote note={item} />}
          />
        </View>
        <View style={styles.row}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.rowTitle}>
              {pageUser.username + "'s"} Friends
            </Text>
            <TouchableOpacity onPress={() => navigate("Friends", { friends })}>
              <Text
                style={{
                  color: colors.primary,
                  marginTop: 20,
                  marginRight: 20,
                }}
              >
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            contentContainerStyle={[styles.flatListInner, { height: 120 }]}
            data={friends.slice(0, 5)}
            horizontal
            renderItem={({ item }) => <CondensedUser user={item} />}
          />
        </View>
        <View>
          <Text style={styles.rowTitle}>{pageUser.username + "'s"} Info</Text>
          <View style={styles.infoContainer}>
            <View style={styles.staticColumn}>
              <Text style={styles.static}>Total Notes:</Text>
              <Text style={styles.static}>Friends:</Text>
            </View>
            <View style={styles.dynamicColumn}>
              <Text style={styles.dynamic}>{notes.length}</Text>
              <Text style={styles.dynamic}>{pageUser.friends.length}</Text>
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
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
  },
  followBtn: {},
  followText: {
    color: colors.cancel,
    fontSize: 16,
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
function fullReplace(arg0: string) {
  throw new Error("Function not implemented.");
}
