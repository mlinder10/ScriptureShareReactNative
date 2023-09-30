import { Modal, Text, TouchableOpacity } from "react-native";
import { NoteType } from "../config/types";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../config/constants";

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
        <Ionicons name="arrow-down" color={colors.primary} size={16} />
      </TouchableOpacity>
      {note !== null && (
        <>
          <Text>
            {note.lines.map((l, i) => (
              <Text key={i}>{i+1} {l}</Text>
            ))}
          </Text>
          <Text>{note?.content}</Text>
        </>
      )}
    </Modal>
  );
}
