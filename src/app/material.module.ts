import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTooltipModule,
    MatCardModule
  ],
  exports: [
    MatProgressSpinnerModule,
    MatTableModule,
    MatTooltipModule,
    MatCardModule
  ]
})
export class MaterialModule { }
