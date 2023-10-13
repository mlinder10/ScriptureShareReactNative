import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ProfileImage from "./ProfileImage";
import { UserType } from "../config/types";
import { colors, instanceBackend } from "../config/constants";
import { FontAwesome } from "@expo/vector-icons";
import { useContext } from "react";
import { NavContext } from "../contexts/navigation";
import { AuthContext } from "../contexts/AuthProvider";

type AccountHeaderLeftProps = {
  user: UserType | null;
};

export function AccountHeaderLeft({ user }: AccountHeaderLeftProps) {
  return (
    <View style={styles.container}>
      <ProfileImage user={user} size={40} />
      <Text style={styles.username}>{user?.username}</Text>
    </View>
  );
}

export function AccountHeaderRight() {
  const { navigate } = useContext(NavContext);

  return (
    <TouchableOpacity onPress={() => navigate("Settings")}>
      <FontAwesome name="cog" style={styles.settings} />
    </TouchableOpacity>
  );
}

type UserHeaderRightProps = {
  pageUser: UserType;
};

export function UserHeaderRight({ pageUser }: UserHeaderRightProps) {
  const { user, updateUser } = useContext(AuthContext);
  const friend = user?.friends.includes(pageUser._id);

  async function handleFriend() {
    if (user === null) return;
    try {
      await instanceBackend.patch(`/user/friend`, {
        _id: user._id,
        friend_id: pageUser._id,
        friend,
      });
      if (friend)
        return updateUser({
          ...user,
          friends: [...user.friends].filter((f) => f !== pageUser._id),
        });

      updateUser({ ...user, friends: [...user.friends, pageUser._id] });
    } catch (err: any) {}
  }

  return (
    <TouchableOpacity onPress={handleFriend}>
      <Text>{friend ? "Remove Friend" : "Add Friend"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    paddingBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
  },
  settings: {
    fontSize: 24,
    color: colors.text,
  },
});
