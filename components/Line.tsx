import {
  Pressable,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Notes from "./Notes";
import { NoteType } from "../config/types";

type LineProps = {
  line: string;
  number: number;
  notes: NoteType[];
  selectedLines: number[];
  selectLine: (number: number) => void;
};

export default function Line({
  line,
  number,
  notes,
  selectedLines,
  selectLine,
}: LineProps) {
  return (
    <>
      <Text
        onPress={() => selectLine(number)}
        suppressHighlighting={true}
        style={{
          textDecorationLine: selectedLines.includes(number)
            ? "underline"
            : "none",
          textDecorationColor: "#08f",
        }}
      >
        {number + " " + line}
      </Text>
      <Notes notes={notes} />
    </>
  );
}
