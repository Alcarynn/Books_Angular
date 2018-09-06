import { Injectable } from '@angular/core';
import { Book } from './book';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BookService {

    private booksUrl = 'http://localhost:4200/api/RESTful/rest/book';  // URL to web api

    constructor(
      private http: HttpClient,
      private messageService: MessageService
    ) { }

    getBooks(): Observable<Book[]>{
      this.messageService.add('BookService: fetched books from server');
      return this.http.get<Book[]>(this.booksUrl).pipe(
        catchError(this.handleError('getBooks', []))
      );
    }
   /** GET book by id. Will 404 if id not found */
   getBook(id: number): Observable<Book> {
    const url = `${this.booksUrl}/${id}`;
    return this.http.get<Book>(url).pipe(
      tap(_ => this.log(`fetched book id=${id}`)),
      catchError(this.handleError<Book>(`getBook id=${id}`))
    );
  }

 
  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addBook (book: Book): Observable<Book> {
    return this.http.post<Book>(this.booksUrl, book, httpOptions).pipe(
      tap((book: Book) => this.log(`added book w/ id=${book.id}`)),
      catchError(this.handleError<Book>('addBook'))
    );
  }

  /** PUT: update the book on the server */
  updateBook (book: Book | number): Observable<any> {
    const id = typeof book === 'number' ? book : book.id;
    const url = `${this.booksUrl}`;

    return this.http.put(url, book, httpOptions).pipe(
      tap(_ => this.log(`updated book id=${book.id}`)),
      catchError(this.handleError<any>('updateBook'))
    );
  }


    /** DELETE: delete the book from the server */
    deleteBook (book: Book | number): Observable<Book> {
      const id = typeof book === 'number' ? book : book.id;
      const url = `${this.booksUrl}/${id}`;

      return this.http.delete<Book>(url, httpOptions).pipe(
        tap(_ => this.log(`deleted book id=${id}`)),
        catchError(this.handleError<Book>('deleteBook'))
      );
    }

     /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`BookService: ${message}`);
  }
}
