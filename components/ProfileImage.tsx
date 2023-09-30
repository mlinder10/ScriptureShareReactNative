import { View, Image, Text } from "react-native";
import { useState } from "react";
import { UserType } from "../config/types";
import { parseColor } from "../config/helpers";

type ProfileImageProps = {
  user: UserType | null;
  size?: number;
};

export default function ProfileImage({ user, size = 50 }: ProfileImageProps) {
  const [error, setError] = useState<boolean>(
    user === null || user.profileImage === ""
  );
  const letter = user?.username[0] ?? "?";

  return (
    <View>
      {error || user === null ? (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size,
            backgroundColor: user?.color,
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Text
            style={{
              color: parseColor(user?.color ?? "#fff"),
              textTransform: "capitalize",
              fontWeight: "bold",
              fontSize: size / 2.4,
            }}
          >
            {letter}
          </Text>
        </View>
      ) : (
        <Image
          style={{ borderRadius: size }}
          width={size}
          height={size}
          source={{ uri: user.profileImage }}
          onError={() => setError(true)}
        />
      )}
    </View>
  );
}
