import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  BookStorageSchema,
  BooksSchema,
  FontStorageSchema,
} from "../config/schemas";
import {
  DEFAULT_BOOK_INFO,
  DEFAULT_CONTENT,
  DEFAULT_FILTER,
  DEFAULT_FONT_SIZE,
  DEFAULT_FONT_WEIGHT,
  instanceBackend,
} from "../config/constants";
import { z } from "zod";
import { getBooks, getChapter } from "../config/helpers";
import {
  BibleType,
  BookInfo,
  ContentType,
  FilterType,
  FontWeightType,
  NoteType,
  UserType,
} from "../config/types";

export default function useBook() {
  const [fontSize, setFontSize] = useState<number>(DEFAULT_FONT_SIZE);
  const [fontWeight, setFontWeight] =
    useState<FontWeightType>(DEFAULT_FONT_WEIGHT);
  const [bookInfo, setBookInfo] = useState<BookInfo>(DEFAULT_BOOK_INFO);
  const [content, setContent] = useState<ContentType>(DEFAULT_CONTENT);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [selectedLines, setSelectedLines] = useState<number[]>([]);
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const [filter, setFilter] = useState<FilterType>(DEFAULT_FILTER);
  const [bookOptions, setBookOptions] = useState<z.infer<typeof BooksSchema>[]>(
    []
  );

  async function getLocalData() {
    try {
      const res = await AsyncStorage.getItem("SSData");
      if (res !== null) {
        const bookData = BookStorageSchema.parse(JSON.parse(res));
        setBookInfo({
          version: bookData.version,
          book: bookData.book,
          chapter: bookData.chapter,
        });
      }
      const res2 = await AsyncStorage.getItem("SSFont");
      if (res2 !== null) {
        const fontData = FontStorageSchema.parse(JSON.parse(res2));
        setFontSize(fontData.fontSize);
        setFontWeight(fontData.fontWeight as FontWeightType);
      }
    } catch (err: any) {}
  }

  async function setBookData(version: BibleType, chapter: string) {
    try {
      const book = chapter.slice(0, 3);
      setBookInfo({ version, book, chapter });
      await AsyncStorage.setItem(
        "SSData",
        JSON.stringify({ version, book, chapter })
      );
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
        version: bookInfo.version.id,
        book: bookInfo.book,
        chapter: bookInfo.chapter,
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
    setContent({ lines: [], next: content.next, previous: content.previous });
    try {
      const res = await getChapter(bookInfo.version.id, bookInfo.chapter);
      if (res === null) return;
      setContent({
        lines: res.content,
        next: res.next,
        previous: res.previous,
      });
    } catch (err: any) {}
  }

  async function fetchNotes() {
    try {
      const res = await instanceBackend.get(
        `/note/${bookInfo.version.id}/${
          bookInfo.chapter
        }/${"0cac5b7f-5397-4494-8cb4-d0f017a6081b"}`
      );
      setNotes(res.data.notes);
    } catch (err: any) {}
  }

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await getBooks(bookInfo.version.id);
        if (res === null) return;
        setBookOptions(res);
      } catch (err: any) {}
    }

    fetchBooks();
  }, [bookInfo.version]);

  useEffect(() => {
    if (!dataFetched) return;
    fetchContent();
    fetchNotes();
  }, [bookInfo]);

  useEffect(() => {
    setDataFetched(true);
    getLocalData();
  }, []);

  return {
    version: bookInfo.version,
    book: bookInfo.book,
    chapter: bookInfo.chapter,
    bookOptions,
    getLocalData,
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
    setFontData
  };
}
