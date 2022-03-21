import { Component, OnInit } from '@angular/core';
import { BookDataSource } from 'src/app/model/data-source/book.ds';
import { DbpediaService } from 'src/app/services/service-dbpedia.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Book} from "../../../model/book";
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {

  constructor(private service: DbpediaService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  public displayedColumns = ['Thumbnail', 'Author', 'Book Name', 'Abstract'];
  public dataSource: BookDataSource = new BookDataSource(this.service);
  public showErrorTooltip : boolean[] = [];
  public numberOfLoadedBooks = 0;

  ngOnInit(): void {
    this.numberOfLoadedBooks = this.dataSource.loadBooks();
    for(var i =0; i < this.numberOfLoadedBooks; i++)
    {
        this.showErrorTooltip.push(false);
    }
  }

  onRowClick(bookClicked: Book): void {
    this.router.navigate(['./details'],
      {relativeTo: this.activatedRoute, queryParams: {bookURI: bookClicked.book.value}});
  }

  setTooltip(errorIndex: number)
  {
    debugger;
    this.showErrorTooltip[errorIndex] = true;
  }
}
