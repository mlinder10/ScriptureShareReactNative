import axios from "axios";
import { Appearance } from "react-native";
import { FilterType } from "./types";

// export const SERVER = "http://localhost:3001";
const SERVER = "https://scripture-share-backend.vercel.app";
const BIBLE_URL = "https://api.scripture.api.bible/v1/";
export const IMAGE_URL = "https://wcj-backend-new.vercel.app/images";
const API_KEY = "h4grvubfeo84h23gd";
export const IMAGE_API_KEY = "ui45e8t34ogfai834";
const BIBLE_API_KEY = "6470ad3e0c3016155a14bc86781ddb80";
const DOUAY = "de4e12af7f28f599-02";
export const LOGO_URI = require("../assets/logo.png");

export const DEFAULT_VERSION = {
  id: "de4e12af7f28f599-02",
  abbreviation: "KJV",
  name: "King James (Authorised) Version",
};
export const DEFAULT_BOOK = "GEN";
export const DEFAULT_CHAPTER = "GEN.1";

export const DEFAULT_FONT_SIZE = 16;
export const DEFAULT_FONT_WEIGHT = 400;

export const DEFAULT_BOOK_INFO = {
  version: DEFAULT_VERSION,
  book: DEFAULT_BOOK,
  chapter: DEFAULT_CHAPTER,
};

export const instanceBackend = axios.create({
  headers: { "api-key": API_KEY },
  baseURL: SERVER,
});

export const instanceAPI = axios.create({
  headers: { "api-key": BIBLE_API_KEY },
  baseURL: BIBLE_URL,
});

export const DEFAULT_FILTER: FilterType = "*";

export const DEFAULT_CONTENT = {
  lines: [],
  next: "",
  previous: "",
};

export const BookProviderDefault: any = {
  version: DEFAULT_VERSION,
  book: DEFAULT_BOOK,
  chapter: DEFAULT_CHAPTER,
  bookOptions: [],
  content: {
    lines: [],
    next: "GEN.1",
    previous: "GEN.1",
  },
  notes: [],
  selectedLines: [],
  handleSelectLine: () => {},
  getLocalData: async () => {},
  setBookData: async () => {},
  postNote: async () => {},
  filter: "*",
  setFilter: () => {},
  fontSize: DEFAULT_FONT_SIZE,
  fontWeight: DEFAULT_FONT_WEIGHT,
  setFontData: () => {}
};

export const AuthProviderDefault = {
  user: null,
  friends: [],
  loginWithUsernameAndPassword: async () => {},
  register: async () => {},
  logout: () => {},
  updateUser: () => {},
  setToken: async () => {},
  getLocalData: async () => null,
};

const colorScheme = Appearance.getColorScheme();

export const colors =
  colorScheme === "light"
    ? {
        primary: "#008000",
        bg: "#fff",
        bgSecondary: "#eee",
        text: "#000",
        border: "#ccc",
        borderSecondary: "#ddd",
        cancel: "#555",
      }
    : {
        primary: "#008000",
        bg: "#000",
        bgSecondary: "#111",
        text: "#fff",
        border: "#333",
        borderSecondary: "#222",
        cancel: "#999",
      };
