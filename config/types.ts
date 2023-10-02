import {
  BiblesSchema,
  BooksSchema,
  NoteSchema,
  UserSchema,
  VerseSchema,
} from "./schemas";
import { z } from "zod";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Dispatch, SetStateAction } from "react";

export type UserType = z.infer<typeof UserSchema>;

export type NoteType = z.infer<typeof NoteSchema>;

export type VerseType = z.infer<typeof VerseSchema>;

export type BibleType = z.infer<typeof BiblesSchema>;

export type BookInfo = {
  version: BibleType;
  book: string;
  chapter: string;
};

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
  filter: FilterType;
  setFilter: Dispatch<SetStateAction<FilterType>>;
};

export type AuthContextType = {
  user: UserType | null;
  friends: UserType[];
  loginWithUsernameAndPassword: (
    username: string,
    password: string
  ) => Promise<string | null>;
  register: (
    username: string,
    password: string,
    confirmPassword: string
  ) => Promise<string | null>;
  logout: () => void;
  updateUser: (user: UserType) => void;
  setToken: (token: string) => Promise<void>;
};

export type NavContextType = {
  route: keyof StackParamList;
  replace: (screen: keyof StackParamList, params?: any) => void;
  navigate: (screen: keyof StackParamList, params?: any) => void;
  fullReplace: (screen: keyof StackParamList, params?: any) => void;
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

export type FilterType = string[] | "*";

export type StackParamList = {
  Signup: undefined;
  Login: undefined;
  Home: undefined;
  Read: undefined;
  Search: undefined;
  Account: undefined;
  ChangeVersion: undefined;
  ChangeChapter: undefined;
  FilterNotes: undefined;
  ReadNote: { note: NoteType };
  CreateNote: { lines: LineType };
  User: { user: UserType };
  Settings: undefined;
  Friends: { friends: UserType[] };
};

export type NavigationProps = NativeStackNavigationProp<StackParamList>;
