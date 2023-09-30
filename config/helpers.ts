import { z } from "zod";
import {
  IMAGE_API_KEY,
  IMAGE_URL,
  instanceAPI,
  instanceBackend,
} from "./constants";
import { BiblesSchema, BooksSchema, ChaptersSchema } from "./schemas";
import * as FileSystem from "expo-file-system";

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

export function formatVerses(chapter: string, linesNumbers: number[]) {
  return (
    chapter.replace(".", " ") +
    ":" +
    linesNumbers[0] +
    (linesNumbers.length !== 1
      ? "-" + linesNumbers[linesNumbers.length - 1]
      : "")
  );
}

export function shortenContent(content: string) {
  const arrayContent = content.split(" ");
  let newContent: string[] = [];
  let totalChars = 0;
  for (let i = 0; i < arrayContent.length; i++) {
    totalChars += arrayContent[i].length;
    if (totalChars >= 25) return newContent.join(" ") + "...";
    newContent.push(arrayContent[i]);
  }
  return newContent.join(" ");
}

type FileType = {
  uri: string;
  type: string;
  name: string;
};

export async function uploadProfilePic(_id: string, file: FileType) {
  try {
    const res = await FileSystem.uploadAsync(
      `${IMAGE_URL}?filename=${Math.floor(
        Math.random() * 1_000_000
      )}&type=external`,
      file.uri,
      {
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: "image",
        mimeType: `image/${file.type}`,
        headers: { "api-key": IMAGE_API_KEY },
      }
    );
    const path = JSON.parse(res.body).url;
    await instanceBackend.patch("/user/image", {
      _id,
      path,
    });

    return { path };
  } catch (err: any) {
    console.error(err?.message);
    return { path: null };
  }
}

export function filterAbb(abbreviation: string) {
  if (abbreviation.startsWith("eng")) return abbreviation.slice(3);
  return abbreviation;
}

const hex: any = {
  a: 10,
  b: 11,
  c: 12,
  d: 13,
  e: 14,
  f: 15,
};

const mid = (16 * 6) / 2;

export function parseColor(color: string) {
  color = color.slice(1);
  let total = 0;
  for (const key of color) {
    if (key.match(/\d/)) total += parseInt(key);
    else total += hex[key];
  }

  if (total < mid) return "#fff";
  return "#000";
}
