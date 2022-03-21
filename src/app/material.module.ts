import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTooltipModule
  ],
  exports: [
    MatProgressSpinnerModule,
    MatTableModule,
    MatTooltipModule
  ]
})
export class MaterialModule { }
