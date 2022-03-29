import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBooksComponent } from './components/book/list-books/list-books.component';
import {BookDetailsComponent} from "./components/book/book-details/book-details.component";
import {AuthorComponent} from "./components/author/author.component";

const routes: Routes = [
  { path: 'books', component: ListBooksComponent },
  { path: 'books/details', component: BookDetailsComponent },
  { path: 'author', component: AuthorComponent },
  { path: '', redirectTo: '/books', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
