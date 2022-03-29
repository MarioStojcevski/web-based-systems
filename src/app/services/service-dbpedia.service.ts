
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import {DbpediaBookResponse} from "../model/dbpedia/dbpedia-book-response";
import {FilterDto} from "../model/dto/filter.dto";
import {Queries} from "./queries";
import {WikiDataBookResponse} from "../model/wikidata/wiki-data-book-response";

@Injectable({
  providedIn: 'root'
})
export class DbpediaService {

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<DbpediaBookResponse> {
    return this.http.get<DbpediaBookResponse>
    ("https://dbpedia.org/sparql?query=" +
      encodeURIComponent(Queries.GET_ALL_BOOKS) +
      "&format=json");
  }

  getBookDetailsByBookURI(bookURI: string): Observable<DbpediaBookResponse> {
    return this.http.get<DbpediaBookResponse>
    ("https://dbpedia.org/sparql?query=" +
      encodeURIComponent(Queries.GET_BOOK_DETAILS_BY_BOOK_URI(bookURI)) +
      "&format=json");
  }

  getAllBooksFiltered(filterDto: FilterDto) : Observable<DbpediaBookResponse> {
    return this.http.get<DbpediaBookResponse>("https://dbpedia.org/sparql?query=" +
      encodeURIComponent(Queries.GET_ALL_BOOKS_FILTERED(filterDto)) + //change this to GET_FILTERED_BOOKS
      "&format=json");
  }

  getBookDetailsFromWikiData(uri: string) : Observable<WikiDataBookResponse>
  {
      return this.http.get<DbpediaBookResponse>("/api/sparql?query=" +
        encodeURIComponent(Queries.GET_BOOK_DETAILS_FROM_WIKIDATA(uri)) +
        "&format=json&origin=*")
        .pipe(catchError(e => of(e)));
  }
}
