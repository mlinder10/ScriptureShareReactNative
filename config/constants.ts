import axios from "axios";

// export const SERVER = "http://localhost:3001";
export const SERVER = "https://scripture-share-backend.vercel.app"
export const API_KEY = "h4grvubfeo84h23gd";
export const instance = axios.create({
  headers: { "api-key": API_KEY },
  baseURL: SERVER,
});
