import {
  BiblesSchema,
  BooksSchema,
  NoteSchema,
  UserSchema,
  VerseSchema,
} from "./schemas";
import { z } from "zod";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type UserType = z.infer<typeof UserSchema>;

export type NoteType = z.infer<typeof NoteSchema>;

export type VerseType = z.infer<typeof VerseSchema>;

export type BibleType = z.infer<typeof BiblesSchema>;

export type BookContextType = {
  version: BibleType;
  book: string;
  chapter: string;
  bookOptions: z.infer<typeof BooksSchema>[];
  content: ContentType;
  notes: NoteType[];
  selectedLines: number[];
  handleSelectLine(number: number): void;
  getLocalData: () => Promise<void>;
  setBookData: (version: BibleType, chapter: string) => Promise<void>;
  postNote: (
    user: UserType,
    input: string,
    text: string[],
    numbers: number[]
  ) => Promise<void>;
};

export type AuthContextType = {
  user: UserType | null;
  friends: UserType[];
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

export type ContentType = {
  lines: string[];
  next: string;
  previous: string;
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
