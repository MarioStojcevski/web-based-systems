import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";
import { DbpediaService } from "src/app/services/service-dbpedia.service";
import { Book } from "../book";
import {BookResponse} from "../book-response";

export class BookDataSource implements DataSource<Book> {

    private bookSubject = new BehaviorSubject<Book[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private totalElementsSubject = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();
    public totalElements$ = this.totalElementsSubject.asObservable();

    constructor(private bookService: DbpediaService)
    {}

    connect(collectionViewer: CollectionViewer): Observable<readonly Book[]> {
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
        (result: BookResponse) => {
          console.log(result);
          let bookResult: Book[] = result.results.bindings;
          this.bookSubject.next(bookResult);
          this.totalElementsSubject.next(bookResult.length);
          this.loadingSubject.next(false);
          }
      );

      return this.totalElementsSubject.value;
    }

  loadFilteredBooks(filteredBooks: Book[]) : number {
    this.loadingSubject.next(true);
    this.bookSubject.next(filteredBooks);
    this.totalElementsSubject.next(filteredBooks.length);
    this.loadingSubject.next(false);
    return filteredBooks.length;
  }

}
