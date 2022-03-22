import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {BookResponse} from "../model/book-response";
import {BookPropertiesResponse} from "../model/book-properties-response";

@Injectable({
  providedIn: 'root'
})
export class DbpediaService {

  constructor(private http: HttpClient) { }

  prefixes = `
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX dc: <http://purl.org/dc/elements/1.1/>
    PREFIX : <http://dbpedia.org/resource/>
    PREFIX dbpedia2: <http://dbpedia.org/property/>
    PREFIX dbpedia: <http://dbpedia.org/>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX dbpediaOntology: <http://dbpedia.org/ontology/>
    PREFIX dbpprop: <http://dbpedia.org/property/>
    PREFIX dbpedia-owl: <http://dbpedia.org/ontology/>
    PREFIX dbr: <http://dbpedia.org/resource/>
    PREFIX dbpedia-owl: <http://dbpedia.org/ontology/>`

  getAllBooksQuery = `${this.prefixes}
    SELECT DISTINCT ?book, ?bookTitle, ?abstract, ?author, ?authorName, ?bookThumbnail
    WHERE {
      ?book a dbpedia-owl:Book ;
            dbpprop:author ?author ;
            dbo:abstract ?abstract ;
            rdfs:label ?bookTitle ;
            dbo:thumbnail ?bookThumbnail .
      ?bookThumbnailURL foaf:thumbnail ?bookThumbnail .
      ?author dbpprop:name ?authorName .
      filter langMatches(lang(?abstract), "en")
      filter langMatches(lang(?authorName), "en")
      filter langMatches(lang(?bookTitle), "en")
    }

    LIMIT 30
  `;

  getBookDetailsByBookURIQuery = `${this.prefixes}
    SELECT ?book, ?bookTitle, ?abstract, ?author, ?authorName, ?bookThumbnail 
  `

  getBooks() : Observable<BookResponse> {
    return this.http.get<BookResponse>
    ("https://dbpedia.org/sparql?query=" +
      encodeURIComponent(this.getAllBooksQuery) +
      "&format=json");
  }

  getBookDetailsByBookURI(bookURI: string): Observable<BookPropertiesResponse> {
    let whereClause = ` WHERE {
      <${bookURI}> dbpprop:author ?author ;
                   dbo:abstract ?abstract ;
                   rdfs:label ?bookTitle ;
                   dbo:thumbnail ?bookThumbnail .
      ?bookThumbnailURL foaf:thumbnail ?bookThumbnail .
      ?author dbpprop:name ?authorName .
      filter langMatches(lang(?abstract), "en")
      filter langMatches(lang(?authorName), "en")
      filter langMatches(lang(?bookTitle), "en").
    }`;
    let query = this.getBookDetailsByBookURIQuery + whereClause;
    return this.http.get<BookPropertiesResponse>
    ("https://dbpedia.org/sparql?query=" +
      encodeURIComponent(query) +
      "&format=json");
  }
}
