import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NoteType } from "../config/types";
import { NavContext } from "../contexts/navigation";
import { useContext } from "react";

type NoteProps = {
  notes: NoteType[];
};

export default function Notes({ notes }: NoteProps) {
  const { navigate } = useContext(NavContext);

  return (
    <>
      {notes.length !== 0 &&
        notes.map((note) => (
          <TouchableOpacity key={note._id} onPress={() => navigate("ReadNote", { note })}>
            <Ionicons name="add" size={16} color="#08f" />
          </TouchableOpacity>
        ))}
    </>
  );
}
