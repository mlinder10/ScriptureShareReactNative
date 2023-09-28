import { View, Text, Image, StyleSheet } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

type ProfileImageProps = {
  uri: string;
  size?: number;
};

export default function ProfileImage({ uri, size = 50 }: ProfileImageProps) {
  const [error, setError] = useState<boolean>(uri === "");

  return (
    <View>
      {error ? (
        <Ionicons
          name="person"
          style={[
            styles.icon,
            {fontSize: size - 20},
          ]}
        />
      ) : (
        <Image
          style={{ borderRadius: size }}
          width={size}
          height={size}
          source={{ uri }}
          onError={() => setError(true)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {},
});
