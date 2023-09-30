import { View, Image } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../config/constants";

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
          style={{ fontSize: size - 20, color: colors.text }}
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
