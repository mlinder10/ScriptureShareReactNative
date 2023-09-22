import { Modal, Text, TouchableOpacity } from "react-native";
import { NoteType } from "../types";
import { Ionicons } from "@expo/vector-icons";

type NoteModalProps = {
  note: NoteType | null;
  close: () => void;
};

export default function NoteModal({ note, close }: NoteModalProps) {
  return (
    <Modal
      visible={note !== null}
      presentationStyle="formSheet"
      animationType="slide"
    >
      <TouchableOpacity onPress={close}>
        <Ionicons name="arrow-down" color="#08f" size={16} />
      </TouchableOpacity>
      {note !== null && (
        <>
          <Text>
            {note.lines.map((l) => (
              <Text>{l}</Text>
            ))}
          </Text>
          <Text>{note?.content}</Text>
        </>
      )}
    </Modal>
  );
}
