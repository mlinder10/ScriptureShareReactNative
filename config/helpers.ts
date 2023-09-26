import { z } from "zod";
import { instanceAPI, instanceBackend } from "./constants";
import {
  BiblesSchema,
  BooksSchema,
  ChapterSchema,
  ChaptersSchema,
} from "./schemas";

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
  const res = await instanceAPI.get(
    `/bibles/${version}/chapters/${chapter}?content-type=text&include-titles=false&include-verse-numbers=true`
  );
  const next = res.data.data.next.id;
  const previous = res.data.data.previous.id;
  const content = res.data.data.content
    .split(/\[\d{1,2}\]/)
    .slice(1)
    .map((v: string, i: number) => (v = `[${i + 1}] ${v}`));
  return {
    content,
    next,
    previous,
  };
}

export function getLineNum(line: string) {
  return parseInt(line.split("]")[0].split("[")[1]);
}
