import { z } from "zod";
import { instanceAPI, instanceBackend } from "./config/constants";
import {
  BiblesSchema,
  BooksSchema,
  ChapterSchema,
  ChaptersSchema,
} from "./config/schemas";

export async function getBibleVersions() {
  try {
    const res = await instanceAPI("bibles?language=eng");
    return z.array(BiblesSchema).parse(res.data.data);
  } catch (err: any) {
    console.error(err?.message);
    return null;
  }
}

export async function getBooks(version: string) {
  try {
    const res = await instanceAPI(`bibles/${version}/books`);
    return z.array(BooksSchema).parse(res.data.data);
  } catch (err: any) {
    console.error(err?.message);
    return null;
  }
}

export async function getChapters(version: string, book: string) {
  try {
    const res = await instanceAPI.get(
      `bibles/${version}/books/${book}/chapters`
    );
    return z.array(ChaptersSchema).parse(res.data.data);
  } catch (err: any) {
    console.error(err?.message);
    return null;
  }
}

export async function getChapter(version: string, chapter: string) {
  try {
    const res = await instanceBackend.get(`/chapter?bible=${version}&chapter=${chapter}`)
    return ChapterSchema.parse(res.data)
  } catch (err: any) {
    console.error(err?.message);
    return null;
  }
}
