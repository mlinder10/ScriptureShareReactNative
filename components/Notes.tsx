import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NoteType } from "../config/types";
import { NavContext } from "../contexts/navigation";
import { Fragment, useContext } from "react";
import { colors } from "../config/constants";
import { AuthContext } from "../contexts/AuthProvider";
import { BookContext } from "../contexts/BookProvider";

type NoteProps = {
  notes: NoteType[];
};

export default function Notes({ notes }: NoteProps) {
  if (notes.length === 0) return null;
  const { filter } = useContext(BookContext);
  const { navigate } = useContext(NavContext);
  const { user, friends } = useContext(AuthContext);

  return (
    <>
      {notes.length !== 0 &&
        notes.map((note) => (
          <Fragment key={note._id}>
            {(filter === "*" || filter.includes(note.userId)) && (
              <TouchableOpacity onPress={() => navigate("ReadNote", { note })}>
                <Ionicons
                  name="bookmark"
                  size={16}
                  color={
                    friends.find((f) => f._id === note.userId)?.color ??
                    user?.color ??
                    colors.primary
                  }
                />
              </TouchableOpacity>
            )}
          </Fragment>
        ))}
    </>
  );
}
