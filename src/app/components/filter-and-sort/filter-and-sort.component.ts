import { Component, OnInit } from '@angular/core';
import { FilterDto} from "../../model/dto/filter.dto";
import { FormBuilder, FormGroup } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import {Book} from "../../model/book";
import {DbpediaService} from "../../services/service-dbpedia.service";

@Component({
  selector: 'app-filter-and-sort',
  templateUrl: './filter-and-sort.component.html',
  styleUrls: ['./filter-and-sort.component.scss']
})
export class FilterAndSortComponent implements OnInit {

  @Output() booksFiltered = new EventEmitter<Book[]>();
  @Output() size = new EventEmitter<number>();

  public filterDto: FilterDto;
  public filterForm: FormGroup = new FormGroup({});
  public minValue = 50;
  public maxValue = 5000;

  constructor(private fb: FormBuilder,
              private dbpediaService: DbpediaService) {
    this.filterDto = {
      sortBy: "",
      resultsCount: 50,
      searchKeyWord: "",
      genre: ""
    };
  }

  ngOnInit(): void {
    this.initFilterForm();
  }

  private initFilterForm(): void {
    this.filterForm = this.fb.group({
      sortByControl: [''],
      resultsCountControl: [this.minValue],
      searchKeyWordControl: [''],
      genreControl: ['']
    });
  }

  public filter(): void {
    this.filterDto = {
      sortBy: this.filterForm.get("sortByControl")?.value,
      resultsCount: this.filterForm.get("resultsCountControl")?.value,
      searchKeyWord: this.filterForm.get("searchKeyWordControl")?.value,
      genre: this.filterForm.get("genreControl")?.value
    };

    this.dbpediaService.getAllBooksFiltered(this.filterDto)
      .subscribe((result) => {
        this.booksFiltered.emit(result.results.bindings);
        this.size.emit(result.results.bindings.length);
      });
  }

}
