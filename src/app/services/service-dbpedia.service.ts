import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbpediaService {

  constructor(private http: HttpClient) { }

  query = `
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
      SELECT ?book WHERE {
       ?book a dbpediaOntology:Book}`


  getBooks()
  {
    return this.http.get("https://dbpedia.org/sparql?query=" + encodeURIComponent(this.query) + "&format=json");
  }
}