import { useContext, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { AuthContext } from "../contexts/AuthProvider";
import Slider from "@react-native-community/slider";
import { colors } from "../config/constants";
import { FontWeightType } from "../config/types";
import { BookContext } from "../contexts/BookProvider";

export default function Settings() {
  const { logout } = useContext(AuthContext);
  const { fontSize, fontWeight, setFontData } = useContext(BookContext);

  return (
    <View style={styles.page}>
      <Text
        style={{ fontSize, fontWeight: `${fontWeight}`, color: colors.text }}
      >
        Font Size: {fontSize}
      </Text>
      <Slider
        minimumTrackTintColor={colors.primary}
        value={fontSize}
        maximumValue={24}
        minimumValue={6}
        step={1}
        onValueChange={(value) => setFontData(value, fontWeight)}
      />
      <Text
        style={{ fontSize, fontWeight: `${fontWeight}`, color: colors.text }}
      >
        Font Weight: {fontWeight}
      </Text>
      <Slider
        minimumTrackTintColor={colors.primary}
        value={fontWeight}
        maximumValue={900}
        minimumValue={100}
        step={100}
        onValueChange={(value) =>
          setFontData(fontSize, value as FontWeightType)
        }
      />
      <Button color={colors.primary} title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
});
