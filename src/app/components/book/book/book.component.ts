import { Component, OnInit } from '@angular/core';
import { BookDataSource } from 'src/app/model/data-source/book.ds';
import { DbpediaService } from 'src/app/services/service-dbpedia.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(private service: DbpediaService) {

  }

  public displayedColumns = ['Book Name', 'Abstract'];
  public dataSource: BookDataSource = new BookDataSource(this.service);

  ngOnInit(): void {
    // this.service.getBooks().subscribe(
    //   books => {
    //     console.log(books);
    //   }
    // );
    this.dataSource.loadBooks();
  }

}
