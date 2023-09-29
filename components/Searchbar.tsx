import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Dispatch, SetStateAction, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

type SearchBarProps = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  containerStyles?: StyleProp<ViewStyle>;
};

export default function Searchbar({
  search,
  setSearch,
  containerStyles,
}: SearchBarProps) {
  const [focus, setFocus] = useState<boolean>(false);

  function handleCancel() {
    setSearch("");
    Keyboard.dismiss();
  }

  return (
    <View style={[styles.container, containerStyles]}>
      <View style={styles.barContainer}>
        <Ionicons style={styles.icon} name="search" />
        <TextInput
          style={styles.textInput}
          keyboardType="default"
          placeholder="Search"
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          value={search}
          onChangeText={(text) => setSearch(text)}
          selectionColor="#888"
        />
        {focus && search !== "" && (
          <Pressable onPress={() => setSearch("")}>
            <Ionicons style={styles.icon} name="close-circle" />
          </Pressable>
        )}
      </View>
      {focus && (
        <Pressable onPress={handleCancel}>
          <Text style={styles.cancel}>Cancel</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
    gap: 10,
  },
  barContainer: {
    backgroundColor: "#eee",
    borderRadius: 10,
    padding: 8,
    gap: 5,
    alignItems: "center",
    flexDirection: "row",
    flex: 1, // Make the search bar container take up all available horizontal space
  },
  icon: {
    color: "#bbb",
    fontSize: 18,
  },
  textInput: {
    fontSize: 16,
    flex: 1, // Make the input take up the remaining space
  },
  cancel: {
    fontSize: 18,
    color: "#444",
  },
});
