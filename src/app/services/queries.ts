import {FilterDto} from "../model/dto/filter.dto";

export class Queries {

  static readonly PREFIXES: string = `
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

  static readonly GET_ALL_BOOKS: string =
    `${this.PREFIXES}
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

  public static GET_BOOK_DETAILS_BY_BOOK_URI(bookURI: string): string {
    return `${this.PREFIXES}
     SELECT ?book, ?bookTitle, ?abstract, ?author, ?authorName, ?bookThumbnail, ?numPages, ?wikiDataEntity

     WHERE {
      <${bookURI}> dbpprop:author ?author ;
                   dbo:abstract ?abstract ;
                   rdfs:label ?bookTitle ;
                   dbo:thumbnail ?bookThumbnail ;
                   dbpediaOntology:numberOfPages ?numPages ;
                   owl:sameAs ?wikiDataEntity .
      ?bookThumbnailURL foaf:thumbnail ?bookThumbnail .
      ?author dbpprop:name ?authorName .
      filter langMatches(lang(?abstract), "en")
      filter langMatches(lang(?authorName), "en")
      filter langMatches(lang(?bookTitle), "en").
      filter strStarts(str(?wikiDataEntity), 'http://www.wikidata.org/').
    }
    `;
  }

  public static GET_ALL_BOOKS_FILTERED(filterDto: FilterDto): string {
    console.log(filterDto);

    return `${this.PREFIXES}
    SELECT DISTINCT ?book, ?bookTitle, ?abstract, ?author, ?authorName, ?bookThumbnail
    WHERE {
      ?book a dbpedia-owl:Book ;
            dbpprop:author ?author ;
            dbo:abstract ?abstract ;
            rdfs:label ?bookTitle ;
            dbo:thumbnail ?bookThumbnail .
      ?bookThumbnailURL foaf:thumbnail ?bookThumbnail .
      ?author dbpprop:name ?authorName .
      FILTER langMatches(lang(?abstract), "en")
      FILTER langMatches(lang(?authorName), "en")
      FILTER langMatches(lang(?bookTitle), "en")
      ${filterDto.searchKeyWord != "" ?
      `FILTER CONTAINS(STR(?bookTitle), \"${filterDto.searchKeyWord}\")`: ""}
    }
    ${filterDto.sortBy !== "" ? "ORDER BY " + filterDto.sortBy + "(?bookTitle)" : ""}
    LIMIT ${filterDto.resultsCount !== 0 ? filterDto.resultsCount.toString() : "30"}
    `;
  }

 public static GET_BOOK_DETAILS_FROM_WIKIDATA(uri: string) : string {
    return `SELECT ?prop ?book` + " WHERE { " + uri + " ?prop ?book }";
 }

}
