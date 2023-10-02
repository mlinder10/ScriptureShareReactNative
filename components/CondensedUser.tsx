import { Text, StyleSheet, Pressable } from "react-native";
import ProfileImage from "./ProfileImage";
import { UserType } from "../config/types";
import { NavContext } from "../contexts/navigation";
import { useContext } from "react";
import { colors } from "../config/constants";
import { AuthContext } from "../contexts/AuthProvider";

type CondensedUserProps = {
  user: UserType;
};

export default function CondensedUser({ user }: CondensedUserProps) {
  const { navigate, fullReplace } = useContext(NavContext);
  const currentUser = useContext(AuthContext).user;

  function handleNav() {
    if (currentUser?._id === user._id) fullReplace("Account");
    else navigate("User", { user });
  }

  return (
    <Pressable style={styles.user} key={user._id} onPress={handleNav}>
      <ProfileImage user={user} />
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
