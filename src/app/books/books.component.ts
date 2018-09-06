import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../book';
import {BookService} from '../book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[];

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.getBooks();
   
  } 


  getBooks(): void {
    this.bookService.getBooks().subscribe(books => this.books = books);
  }

  update(book: Book): void {
    this.bookService.updateBook(book)
      .subscribe();
  }

  delete(book: Book): void {
    this.books = this.books.filter(h => h !== book);
    this.bookService.deleteBook(book).subscribe();
  }

  add(title: string, price: number, nbpage: number): void {
    var book ={title: title, price: price, nbpage: nbpage}
    this.bookService.addBook(book)
      .subscribe(book => {
        this.books.push(book);
      });
  }

}
