import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {RequestBaseService} from "./request-base.service";
import {AuthenticationService} from "./authentication.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../models/book.model";

const API_URL = `${environment.BASE_URL}/api/book/`;

@Injectable({
  providedIn: 'root'
})
export class BookService extends RequestBaseService{

  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }

  saveBook(book: Book): Observable<any> {
    return this.http.post(API_URL, book, {headers: this.getHeders});
  }

  deleteBook(book: Book): Observable<any> {
    return this.http.delete( `${API_URL}/${book.id}`, {headers: this.getHeders});
  }

  getAllBooks(): Observable<any> {
    return this.http.get(API_URL);
  }
}
