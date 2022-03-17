import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ListBooksComponent } from './components/book/list-books/list-books.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material.module";
import { BookDetailsComponent } from './components/book/book-details/book-details.component';
import { AuthorDetailsComponent } from './components/author/author-details/author-details.component';
import { AddBookComponent } from './components/book/add-book/add-book.component';

@NgModule({
  declarations: [
    AppComponent,
    ListBooksComponent,
    BookDetailsComponent,
    AuthorDetailsComponent,
    AddBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
