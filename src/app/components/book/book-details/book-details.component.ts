import { Component, OnInit } from '@angular/core';
import {DbpediaService} from "../../../services/service-dbpedia.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BookPropertiesResponse} from "../../../model/book-properties-response";
import { Book } from 'src/app/model/book';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  isLoading = false;
  bookURI: string = '';
  bookProperties: Book[] = [];
  imageNotAvailableOnDbpedia = false;

  constructor(private service: DbpediaService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.bookURI = params['bookURI'];
        if(this.bookURI !== '') {
          this.loadBookByURI(this.bookURI);
        }
      });
  }

  loadBookByURI(bookURI: string): void {
    this.service.getBookDetailsByBookURI(bookURI)
      .subscribe((result: BookPropertiesResponse) => {
        this.bookProperties = result.results.bindings;
        this.isLoading = false;
        var sameAsBookURI = this.bookProperties[0].wikiDataEntity.value;
        this.service.getBookDetailsFromWikiData('<' + sameAsBookURI + '>').subscribe(
          res => {
            // show the data in the template
            console.log(res);
          },
          err => {
            console.log(err);
          }
        )
      });
  }

  showTooltip() {
    this.imageNotAvailableOnDbpedia = true;
  }
}
