import { Component, OnInit } from '@angular/core';
import { DbpediaService } from 'src/app/services/service-dbpedia.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(private service: DbpediaService) { }

  ngOnInit(): void {
    this.service.getBooks().subscribe(
      books => {
        console.log(books);
      }
    );
  }

}
