import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NoteType } from "../types";
import { Dispatch, SetStateAction } from "react";

type NoteProps = {
  notes: NoteType[];
  setNote: Dispatch<SetStateAction<NoteType | null>>;
};

export default function Notes({ notes, setNote }: NoteProps) {
  return (
    <>
      {notes.length !== 0 &&
        notes.map((note) => (
          <TouchableOpacity onPress={() => setNote(note)}>
            <Ionicons name="add" size={16} color="#08f" />
          </TouchableOpacity>
        ))}
    </>
  );
}

