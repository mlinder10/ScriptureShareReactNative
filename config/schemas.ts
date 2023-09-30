import { z } from "zod";

export const TokenSchema = z.object({
  _id: z.string(),
  date: z.date(),
});

export const UserSchema = z.object({
  _id: z.string(),
  token: TokenSchema,
  username: z.string().max(20),
  password: z.string(),
  profileImage: z.string(),
  color: z.string(),
  friends: z.array(z.string()),
  notes: z.array(z.string()),
  bookmarks: z.array(z.string()),
});

export const NoteSchema = z.object({
  _id: z.string(),
  lines: z.array(z.string()),
  lineNumbers: z.array(z.number()),
  userId: z.string(),
  version: z.string(),
  book: z.string(),
  chapter: z.string(),
  content: z.string(),
});

export const BookmarkSchema = z.object({
  _id: z.string(),
});

export const BiblesSchema = z.object({
  id: z.string(),
  name: z.string(),
  abbreviation: z.string(),
});

export const BooksSchema = z.object({
  id: z.string(),
  abbreviation: z.string(),
  name: z.string(),
});

export const ChaptersSchema = z.object({
  id: z.string(),
  number: z.string(),
  reference: z.string(),
});

export const ChapterSchema = z.object({
  content: z.array(z.string()),
  next: z.string(),
  previous: z.string(),
});

export const VerseSchema = z.object({
  id: z.string(),
  reference: z.string(),
  text: z.string(),
  chapterId: z.string(),
  bookId: z.string(),
});

export const LocalStorageSchema = z.object({
  version: BiblesSchema,
  book: z.string(),
  chapter: z.string(),
});
