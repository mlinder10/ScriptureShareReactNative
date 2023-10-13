import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import {
  BooksSchema,
} from "../config/schemas";
import {
  DEFAULT_BOOK,
  DEFAULT_CHAPTER,
  DEFAULT_CONTENT,
  DEFAULT_FILTER,
  DEFAULT_FONT_SIZE,
  DEFAULT_FONT_WEIGHT,
  DEFAULT_VERSION,
  instanceBackend,
} from "../config/constants";
import { z } from "zod";
import { getBooks, getChapter } from "../config/helpers";
import {
  BibleType,
  ContentType,
  FilterType,
  FontWeightType,
  NoteType,
  UserType,
} from "../config/types";
import { AuthContext } from "../contexts/AuthProvider";

export default function useBook() {
  const { user, updateUser } = useContext(AuthContext);
  const [fontSize, setFontSize] = useState<number>(DEFAULT_FONT_SIZE);
  const [fontWeight, setFontWeight] =
    useState<FontWeightType>(DEFAULT_FONT_WEIGHT);
  const [content, setContent] = useState<ContentType>(DEFAULT_CONTENT);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [selectedLines, setSelectedLines] = useState<number[]>([]);
  const [filter, setFilter] = useState<FilterType>(DEFAULT_FILTER);
  const [bookOptions, setBookOptions] = useState<z.infer<typeof BooksSchema>[]>(
    []
  );

  async function setBookData(version: BibleType, chapter: string) {
    if (user === null) return;
    try {
      updateUser({ ...user, version, chapter });
      await instanceBackend.patch("/user/book", {
        _id: user._id,
        version,
        chapter,
      });
    } catch (err: any) {}
  }

  async function setFontData(fontSize: number, fontWeight: FontWeightType) {
    try {
      setFontSize(fontSize);
      setFontWeight(fontWeight);
      await AsyncStorage.setItem(
        "SSFont",
        JSON.stringify({ fontSize, fontWeight })
      );
    } catch (err: any) {}
  }

  async function postNote(
    user: UserType,
    input: string,
    text: string[],
    numbers: number[]
  ) {
    try {
      await instanceBackend.post("/note", {
        lines: text,
        lineNumbers: numbers,
        userId: user._id,
        version: user.version.id,
        book: user.chapter.split(".")[0],
        chapter: user.chapter,
        content: input,
      });
      setSelectedLines([]);
      fetchNotes();
    } catch (err: any) {}
  }

  function handleSelectLine(number: number) {
    if (selectedLines.length === 0) {
      setSelectedLines([number]);
      return;
    }

    const min = selectedLines[0];
    const max = selectedLines[selectedLines.length - 1];
    if (!selectedLines.includes(number)) {
      if (number < min) {
        let lineNumbers = [];
        for (let i = number; i <= max; i++) {
          lineNumbers.push(i);
        }
        setSelectedLines(lineNumbers);
        return;
      }
      let lineNumbers = [];
      for (let i = min; i <= number; i++) {
        lineNumbers.push(i);
      }
      setSelectedLines(lineNumbers);
      return;
    }

    setSelectedLines([]);
  }

  async function fetchContent() {
    if (user === null) return;
    setContent({ lines: [], next: content.next, previous: content.previous });
    try {
      const res = await getChapter(user.version.id, user.chapter);
      if (res === null) return;
      setContent({
        lines: res.content,
        next: res.next,
        previous: res.previous,
      });
    } catch (err: any) {}
  }

  async function fetchNotes() {
    if (user === null) return
    try {
      const res = await instanceBackend.get(
        `/note/${user.version.id}/${user.chapter}/${user?._id}`
      );
      setNotes(res.data.notes);
    } catch (err: any) {}
  }

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await getBooks(user!.version.id);
        if (res === null) return;
        setBookOptions(res);
      } catch (err: any) {}
    }

    fetchBooks();
  }, [user?.version]);

  useEffect(() => {
    fetchContent();
    fetchNotes();
  }, [user]);

  return {
    version: user?.version ?? DEFAULT_VERSION,
    book: user?.chapter?.split(".")[0] ?? DEFAULT_BOOK,
    chapter: user?.chapter ?? DEFAULT_CHAPTER,
    bookOptions,
    setBookData,
    notes,
    content,
    selectedLines,
    handleSelectLine,
    postNote,
    filter,
    setFilter,
    fontSize,
    fontWeight,
    setFontData,
  };
}
