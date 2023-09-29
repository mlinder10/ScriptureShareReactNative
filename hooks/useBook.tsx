import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { BooksSchema, LocalStorageSchema } from "../config/schemas";
import {
  DEFAULT_BOOK,
  DEFAULT_CHAPTER,
  DEFAULT_CONTENT,
  DEFAULT_VERSION,
  instanceBackend,
} from "../config/constants";
import { z } from "zod";
import { getBooks, getChapter } from "../config/helpers";
import { BibleType, ContentType, NoteType, UserType } from "../config/types";

export default function useBook() {
  const [version, setVersion] = useState<BibleType>(DEFAULT_VERSION);
  const [book, setBook] = useState<string>(DEFAULT_BOOK);
  const [chapter, setChapter] = useState<string>(DEFAULT_CHAPTER);
  const [content, setContent] = useState<ContentType>(DEFAULT_CONTENT);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [selectedLines, setSelectedLines] = useState<number[]>([]);
  const [bookOptions, setBookOptions] = useState<z.infer<typeof BooksSchema>[]>(
    []
  );

  async function getLocalData() {
    try {
      const res = await AsyncStorage.getItem("SSData");
      if (res === null) return;
      const data = LocalStorageSchema.parse(JSON.parse(res));
      setVersion(data.version);
      setBook(data.book);
      setChapter(data.chapter);
    } catch (err: any) {
      console.error(err?.message);
    }
  }

  async function setBookData(version: BibleType, chapter: string) {
    try {
      const book = chapter.slice(0, 3);
      setVersion(version);
      setBook(book);
      setChapter(chapter);
      await AsyncStorage.setItem(
        "SSData",
        JSON.stringify({ version, book, chapter })
      );
    } catch (err: any) {
      console.error(err?.message);
    }
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
        version,
        book,
        chapter,
        content: input,
      });
      setSelectedLines([]);
      fetchNotes()
    } catch (err: any) {
      console.error(err?.message);
    }
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
    setContent({ lines: [], next: content.next, previous: content.previous });
    try {
      const res = await getChapter(version.id, chapter);
      if (res === null) return;
      setContent({
        lines: res.content,
        next: res.next,
        previous: res.previous,
      });
    } catch (err: any) {
      console.error(err?.message);
    }
  }

  async function fetchNotes() {
    try {
      const res = await instanceBackend.get(
        `/note/${version}/${chapter}/${"0cac5b7f-5397-4494-8cb4-d0f017a6081b"}`
      );
      setNotes(res.data.notes);
    } catch (err: any) {
      console.error(err?.message);
    }
  }

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await getBooks(version.id);
        if (res === null) return;
        setBookOptions(res);
      } catch (err: any) {
        console.error(err?.message);
      }
    }

    fetchBooks();
  }, [version]);

  useEffect(() => {
    fetchContent();
    fetchNotes();
  }, [version, chapter]);

  useEffect(() => {
    getLocalData();
  }, []);

  return {
    version,
    book,
    chapter,
    bookOptions,
    getLocalData,
    setBookData,
    notes,
    content,
    selectedLines,
    handleSelectLine,
    postNote,
  };
}
