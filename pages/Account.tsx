import { View, Text, Button } from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import * as ImagePicker from "expo-image-picker";
import { uploadProfilePic } from "../config/helpers";
import ProfileImage from "../components/ProfileImage";

type FileType = {
  uri: string;
  type: string;
  name: string;
};

export default function Account() {
  const { logout, user, updateUser } = useContext(AuthContext);
  const [file, setFile] = useState<FileType | null>(null);

  async function openImagePicker() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      let uri = result.assets[0].uri;
      let filename = uri.split("/").pop();
      let match = /\.(\w+)$/.exec(filename ?? "");
      let type = match ? `image/${match[1]}` : `image`;
      setFile({ uri, type, name: filename ?? "" });
    }
  }

  async function handleUpload() {
    if (user === null || file === null) return;
    const { path } = await uploadProfilePic(user._id, file);
    if (path !== null) updateUser({ ...user, profileImage: path });
  }

  return (
    <View>
      <Text>Account</Text>
      <ProfileImage uri={user?.profileImage ?? ""} />
      <Button title="choose image" onPress={openImagePicker} />
      <Button title="upload image" onPress={handleUpload} />
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
