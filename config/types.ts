import { BiblesSchema, BooksSchema, NoteSchema, UserSchema, VerseSchema } from "./schemas";
import { z } from "zod";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type UserType = z.infer<typeof UserSchema>;

export type NoteType = z.infer<typeof NoteSchema>;

export type VerseType = z.infer<typeof VerseSchema>;

export type BibleType = z.infer<typeof BiblesSchema>

export type BookContextType = {
  version: string;
  book: string;
  chapter: string;
  bookOptions: z.infer<typeof BooksSchema>[];
  getLocalData: () => Promise<void>;
  setBookData: (version: string, chapter: string) => Promise<void>;
};

export type AuthContextType = {
  user: UserType | null;
  loginWithUsernameAndPassword: (
    username: string,
    password: string
  ) => Promise<void>;
  register: (
    username: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  logout: () => void;
  updateUser: (user: UserType) => void;
  setToken: (token: string) => Promise<void>;
};

type LineType = {
  text: string[];
  numbers: number[];
};

export type StackParamList = {
  Signup: undefined;
  Login: undefined;
  Home: undefined;
  Read: undefined;
  Search: undefined;
  Account: undefined;
  ChangeVersion: undefined;
  ChangeChapter: undefined;
  ReadNote: { note: NoteType };
  CreateNote: { lines: LineType };
  User: { user: UserType };
};

export type NavigationProps = NativeStackNavigationProp<StackParamList>;
