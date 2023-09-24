import { ReactNode, createContext } from "react";
import useBook from "../hooks/useBook";
import { BookContextType } from "../config/types";
import { BookProviderDefault } from "../config/constants";

export const BookContext = createContext<BookContextType>(BookProviderDefault);

type BookProviderProps = {
  children: ReactNode;
};

export default function BookProvider({ children }: BookProviderProps) {
  return (
    <BookContext.Provider value={useBook()}>{children}</BookContext.Provider>
  );
}
