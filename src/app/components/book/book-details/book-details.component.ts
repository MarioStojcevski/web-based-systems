import { Component, OnInit } from '@angular/core';
import {DbpediaService} from "../../../services/service-dbpedia.service";
import {ActivatedRoute} from "@angular/router";
import { DbpediaBook } from 'src/app/model/dbpedia/dbpedia-book';
import {DbpediaBookResponse} from "../../../model/dbpedia/dbpedia-book-response";
import {WikiDataBook} from "../../../model/wikidata/wiki-data-book";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  isLoading = false;
  bookURI: string = '';
  bookDbPedia: DbpediaBook[] = [];
  bookWikiData: WikiDataBook[] = [];
  authorURI: string = "";
  imageNotAvailableOnDbpedia = false;

  constructor(private service: DbpediaService,
              private activatedRoute: ActivatedRoute) { }

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
      .subscribe((dbPediaResult: DbpediaBookResponse) => {
        this.bookDbPedia = dbPediaResult.results.bindings;
        var sameAsBookURI = this.bookDbPedia[0].wikiDataEntity.value;
        this.service.getBookDetailsFromWikiData('<' + sameAsBookURI + '>').subscribe(
          ( wikiDataResult) => {
            console.log(wikiDataResult);
            this.bookWikiData = wikiDataResult.results.bindings;
            this.authorURI = this.bookWikiData[0].authorURI.value;
            this.isLoading = false;
          });
      });
  }

  showTooltip() {
    this.imageNotAvailableOnDbpedia = true;
  }
}
