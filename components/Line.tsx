import { Text } from "react-native";
import Notes from "./Notes";
import { NoteType } from "../config/types";
import { colors } from "../config/constants";

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
    if (line !== "\n\t") selectLine(number);
  }

  return (
    <>
      <Notes notes={notes} />
      <Text
        onPress={handleSelectLine}
        suppressHighlighting={true}
        style={{
          textDecorationLine: selectedLines.includes(number)
            ? "underline"
            : "none",
          textDecorationColor: colors.primary,
          color: colors.text,
        }}
      >
        {line}
      </Text>
    </>
  );
}
