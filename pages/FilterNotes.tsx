import { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import { BookContext } from "../contexts/BookProvider";
import { AuthContext } from "../contexts/AuthProvider";
import { colors } from "../config/constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps, UserType } from "../config/types";
import ProfileImage from "../components/ProfileImage";

export default function FilterNotes() {
  const { filter, setFilter } = useContext(BookContext);
  const { user, friends } = useContext(AuthContext);
  const navigation = useNavigation<NavigationProps>();

  function handleFilter(id: string) {
    if (filter === "*") return setFilter([id]);
    if (filter.includes(id))
      return setFilter([...filter].filter((f) => f !== id));
    setFilter([...filter, id]);
  }

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.close}>Close</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Filters</Text>
      </View>
      <FlatList
        style={styles.lower}
        data={[user !== null ? user : {} as UserType, ...friends]}
        renderItem={({ item }) => (
          <Pressable
            style={styles.friend}
            onPress={() => handleFilter(item._id)}
          >
            <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
              <ProfileImage user={item} size={30} />
              <Ionicons name="bookmark" color={item.color ?? colors.primary} size={20} />
              <Text style={styles.text}>{item.username}</Text>
            </View>
            <Ionicons
              name={
                filter === "*" || filter.includes(item._id)
                  ? "checkbox"
                  : "square-outline"
              }
              color={
                filter === "*" || filter.includes(item._id) ? "#0f0" : "#f00"
              }
              size={20}
            />
          </Pressable>
        )}
      />
    </View>
  );
}

function UserItem(user:UserType) {
    
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.bg,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  close: {
    color: colors.cancel,
    fontSize: 18,
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "bold",
  },
  lower: {
    flex: 8,
  },
  friend: {
    padding: 20,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "bold"
  },
});
