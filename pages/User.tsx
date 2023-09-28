import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, StyleSheet, Button } from "react-native";
import { StackParamList } from "../config/types";
import { AuthContext } from "../contexts/AuthProvider";
import { useContext } from "react";
import { instanceBackend } from "../config/constants";

type UserProps = {
  route: RouteProp<StackParamList, "User">;
  navigation: StackNavigationProp<StackParamList, "User">;
};

export default function User({ route, navigation }: UserProps) {
  const pageUser = route.params.user;
  const { user, updateUser } = useContext(AuthContext);

  async function handleFollow() {
    if (user === null) return;
    try {
      await instanceBackend.patch("/user/friend", {
        _id: user._id,
        friend_id: pageUser._id,
      });
      const newFriends = [...user.friends, pageUser._id];
      updateUser({ ...user, friends: newFriends });
    } catch (err: any) {
      console.error(err?.message);
    }
  }

  return (
    <View style={styles.page}>
      <Text>{pageUser.username}</Text>
      <Button title="Follow" onPress={handleFollow} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {},
});
