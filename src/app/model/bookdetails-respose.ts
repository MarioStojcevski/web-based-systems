import { Book } from "./book";

export interface BookResponse {
    results: {
      bindings: Book;
    }
  }
  