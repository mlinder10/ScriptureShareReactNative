import { Text } from "react-native";
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

  function handleSelectLine() {
    if (line !== "\n\t")
    selectLine(number)
  }

  return (
    <>
      <Text
        onPress={handleSelectLine}
        suppressHighlighting={true}
        style={{
          textDecorationLine: selectedLines.includes(number)
            ? "underline"
            : "none",
          textDecorationColor: "#08f",
        }}
      >
        {line}
      </Text>
      <Notes notes={notes} />
    </>
  );
}
