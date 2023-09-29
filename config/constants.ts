import axios from "axios";

// export const SERVER = "http://localhost:3001";
const SERVER = "https://scripture-share-backend.vercel.app";
const BIBLE_URL = "https://api.scripture.api.bible/v1/";
export const IMAGE_URL = "https://wcj-backend-new.vercel.app/images";
const API_KEY = "h4grvubfeo84h23gd";
export const IMAGE_API_KEY = "ui45e8t34ogfai834";
const BIBLE_API_KEY = "6470ad3e0c3016155a14bc86781ddb80";
const DOUAY = "de4e12af7f28f599-02";

export const DEFAULT_VERSION = {
  id: "de4e12af7f28f599-02",
  abbreviation: "KJV",
  name: "King James (Authorised) Version",
};
export const DEFAULT_BOOK = "GEN";
export const DEFAULT_CHAPTER = "GEN.1";

export const instanceBackend = axios.create({
  headers: { "api-key": API_KEY },
  baseURL: SERVER,
});

export const instanceAPI = axios.create({
  headers: { "api-key": BIBLE_API_KEY },
  baseURL: BIBLE_URL,
});

export const DEFAULT_CONTENT = {
  lines: [],
  next: "",
  previous: "",
};

export const BookProviderDefault = {
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
