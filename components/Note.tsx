import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NoteType } from "../types";
import { Dispatch, SetStateAction } from "react";

type NoteProps = {
  note: NoteType | null;
  setNote: Dispatch<SetStateAction<NoteType | null>>;
};

export default function Note({ note, setNote }: NoteProps) {
  return (
    <>
      {note !== null && (
        <TouchableOpacity onPress={() => setNote(note)}>
          <Ionicons name="add" size={16} color="#08f" />
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  closed: {},
  open: {
    width: "100%",
    padding: 5,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
  },
});
