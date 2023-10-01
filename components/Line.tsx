import { Text } from "react-native";
import Notes from "./Notes";
import { NoteType } from "../config/types";
import { colors } from "../config/constants";
import { BookContext } from "../contexts/BookProvider";
import { useContext } from "react";

type LineProps = {
  line: string;
  number: number;
  notes: NoteType[];
  selectLine: (number: number) => void;
};

export default function Line({ line, number, notes, selectLine }: LineProps) {
  const { selectedLines } = useContext(BookContext);
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
