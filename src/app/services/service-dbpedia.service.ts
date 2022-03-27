import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BookResponse} from "../model/book-response";
import {BookPropertiesResponse} from "../model/book-properties-response";
import {FilterDto} from "../model/dto/filter.dto";
import {Queries} from "./queries";

@Injectable({
  providedIn: 'root'
})
export class DbpediaService {

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<BookResponse> {
    return this.http.get<BookResponse>
    ("https://dbpedia.org/sparql?query=" +
      encodeURIComponent(Queries.GET_ALL_BOOKS) +
      "&format=json");
  }

  getBookDetailsByBookURI(bookURI: string): Observable<BookPropertiesResponse> {
    return this.http.get<BookPropertiesResponse>
    ("https://dbpedia.org/sparql?query=" +
      encodeURIComponent(Queries.GET_BOOK_DETAILS_BY_BOOK_URI(bookURI)) +
      "&format=json");
  }

  getAllBooksFiltered(filterDto: FilterDto) : Observable<BookResponse> {
    return this.http.get<BookResponse>("https://dbpedia.org/sparql?query=" +
      encodeURIComponent(Queries.GET_ALL_BOOKS_FILTERED(filterDto)) + //change this to GET_FILTERED_BOOKS
      "&format=json");
  }
}
