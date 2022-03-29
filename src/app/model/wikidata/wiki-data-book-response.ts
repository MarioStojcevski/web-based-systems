import {WikiDataBook} from "./wiki-data-book";

export interface WikiDataBookResponse{
  results: {
    bindings: WikiDataBook[];
  }
}
