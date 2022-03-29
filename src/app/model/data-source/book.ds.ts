import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, Observable} from "rxjs";
import {DbpediaService} from "src/app/services/service-dbpedia.service";
import {DbpediaBook} from "../dbpedia/dbpedia-book";
import {DbpediaBookResponse} from "../dbpedia/dbpedia-book-response";

export class BookDataSource implements DataSource<DbpediaBook> {

    private bookSubject = new BehaviorSubject<DbpediaBook[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private totalElementsSubject = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();
    public totalElements$ = this.totalElementsSubject.asObservable();

    constructor(private bookService: DbpediaService)
    {}

    connect(collectionViewer: CollectionViewer): Observable<readonly DbpediaBook[]> {
        return this.bookSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.bookSubject.complete();
        this.loadingSubject.complete();
        this.totalElementsSubject.complete();
    }

    setLoading(isLoading : boolean) {
        this.loadingSubject.next(isLoading);
    }

    loadBooks() : number {
      this.loadingSubject.next(true);
      this.bookService.getAllBooks().subscribe(
        (result: DbpediaBookResponse) => {
          console.log(result);
          let bookResult: DbpediaBook[] = result.results.bindings;
          this.bookSubject.next(bookResult);
          this.totalElementsSubject.next(bookResult.length);
          this.loadingSubject.next(false);
          }
      );

      return this.totalElementsSubject.value;
    }

  loadFilteredBooks(filteredBooks: DbpediaBook[]) : number {
    this.loadingSubject.next(true);
    this.bookSubject.next(filteredBooks);
    this.totalElementsSubject.next(filteredBooks.length);
    this.loadingSubject.next(false);
    return filteredBooks.length;
  }

}
