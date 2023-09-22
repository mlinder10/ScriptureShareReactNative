import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  BooksSchema,
  LocalStorageSchema,
} from "../config/schemas";
import {
  DEFAULT_BOOK,
  DEFAULT_CHAPTER,
  DEFAULT_VERSION,
} from "../config/constants";
import { z } from "zod";
import { getBooks } from "../helpers";

export default function useBook() {
  const [version, setVersion] = useState<string>(DEFAULT_VERSION);
  const [book, setBook] = useState<string>(DEFAULT_BOOK);
  const [chapter, setChapter] = useState<string>(DEFAULT_CHAPTER);
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

  async function setBookData(version: string, chapter: string) {
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

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await getBooks(version);
        if (res === null) return;
        setBookOptions(res);
      } catch (err: any) {
        console.error(err?.message);
      }
    }

    fetchBooks();
  }, [version]);

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
  };
}
