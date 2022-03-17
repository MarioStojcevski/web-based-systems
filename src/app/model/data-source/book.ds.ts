import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";
import { DbpediaService } from "src/app/services/service-dbpedia.service";
import { Book } from "../book";
import {BookResponse} from "../book-response";

export class BookDataSource implements DataSource<Book> {

    private bookSubject = new BehaviorSubject<Book[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private totalElements = new BehaviorSubject<number>(0);

    constructor(private bookService: DbpediaService)
    {

    }

    connect(collectionViewer: CollectionViewer): Observable<readonly Book[]> {
        // on initialization
        return this.bookSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.bookSubject.complete();
        this.loadingSubject.complete();
        this.totalElements.complete();
    }

    setLoading(isLoading : boolean) {
        this.loadingSubject.next(isLoading);
    }

    loadBooks()
    {
        this.loadingSubject.next(true);
        this.bookService.getBooks().subscribe(
          (res: BookResponse) => {
              let bookResult: Book[]  = res.results.bindings;
              this.bookSubject.next(bookResult);
              console.log(bookResult)
              this.totalElements.next(5);
              this.loadingSubject.next(false);
            }
        );
    }

}
