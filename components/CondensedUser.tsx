import { Text, StyleSheet, Pressable } from "react-native";
import ProfileImage from "./ProfileImage";
import { UserType } from "../config/types";
import { NavContext } from "../contexts/navigation";
import { useContext } from "react";
import { colors } from "../config/constants";

type CondensedUserProps = {
  user: UserType;
};

export default function CondensedUser({ user }: CondensedUserProps) {
  const { navigate } = useContext(NavContext);

  return (
    <Pressable
      style={styles.user}
      key={user._id}
      onPress={() => navigate("User", { user: user })}
    >
      <ProfileImage uri={user.profileImage} />
      <Text style={{ color: colors.text }}>{user.username}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  user: {
    alignItems: "center",
    gap: 10,
  },
});
