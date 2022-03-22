import { Book } from "./book";

export interface BookPropertiesResponse {
  results: {
    bindings: Book[];
  }
}
