import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { MessagesComponent } from './messages/messages.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { PublisherSearchComponent } from './publisher-search/publisher-search.component';
import { AppRoutingModule } from './/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    MessagesComponent,
    BookDetailComponent,
    BookSearchComponent,
    PublisherSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
