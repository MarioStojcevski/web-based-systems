import { Component, OnInit } from '@angular/core';
import { FilterDto} from "../../model/dto/filter.dto";
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  public minValue = 15000;
  public maxValue = 50000;

  constructor(
    private fb: FormBuilder,
    private dbpediaService: DbpediaService
  )
  {
    this.filterDto = {
      sortBy: '',
      minPrice: 15000,
      maxPrice: 50000,
      powerArray: [],
      filterByBrand: ""
    };
  }

  ngOnInit(): void {
    this.initFilterForm();
  }

  private initFilterForm(): void {
    this.filterForm = this.fb.group({
      sortByControl: [''],
      minPriceControl: new FormControl(this.minValue),
      maxPriceControl: new FormControl(this.maxValue),
      powerArrayControl: this.fb.array([]),
      filterByBrandControl: [null]
    });
  }

  public onCheckboxChange(e: any): void {
    const powerArray: FormArray = this.filterForm.get('powerArrayControl') as FormArray;
    if (e.checked) {
      powerArray.push(new FormControl(e.source.value));
    }
    else {
      for(let i=0; i<powerArray.controls.length; i++) {
        if(powerArray.controls[i].value == e.source.value) {
          powerArray.removeAt(i);
        }
      }
    }
  }

  public filter(): void {
    this.filterDto = {
    };
    console.log(this.filterDto);

  }

}
