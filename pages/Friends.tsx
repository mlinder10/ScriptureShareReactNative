import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { StackParamList, UserType } from "../config/types";
import { colors } from "../config/constants";
import { NavContext } from "../contexts/navigation";
import { useContext } from "react";
import ProfileImage from "../components/ProfileImage";
import { AuthContext } from "../contexts/AuthProvider";

type FriendsProps = {
  route: RouteProp<StackParamList, "Friends">;
  navigation: StackNavigationProp<StackParamList, "Friends">;
};

export default function Friends({ route, navigation }: FriendsProps) {
  const { friends } = route.params;
  const { navigate, fullReplace } = useContext(NavContext);
  const { user } = useContext(AuthContext);

  function handleNav(newUser: UserType) {
    navigation.goBack();
    if (newUser._id === user?._id) fullReplace("Account");
    else navigate("User", { user: newUser });
  }

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancel}>Close</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Friends</Text>
      </View>
      <FlatList
        style={{ flex: 1 }}
        data={friends}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.friend}
            onPress={() => handleNav(item)}
          >
            <ProfileImage user={item} />
            <Text style={styles.text}>{item.username}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.bg,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
  cancel: {
    color: colors.cancel,
    fontSize: 18,
  },
  list: {},
  friend: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  text: {
    color: colors.text,
    fontSize: 18,
  },
});
