import {DbpediaBook} from "./dbpedia-book";

export interface DbpediaBookResponse {
  results: {
    bindings: DbpediaBook[]
  }
}
