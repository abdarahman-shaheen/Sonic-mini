import { Injectable } from '@angular/core';
import { Category } from './category.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'https://localhost:44351';
  categoriyChange = new Subject<Category[]>();

  constructor(private http: HttpClient) {}
  categories: Category[] = [];

  getCategories() {
    return this.http
      .get<Category[]>(this.apiUrl + '/api/Category')
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        console.log(categories);
        this.categoriyChange.next(this.categories.slice());
      });
  }

  setCategory(category: Category) {
    this.http.post<Category>(this.apiUrl + '/api/Category', category).subscribe(
      (response: Category) => {
        console.log(response);
        this.getMyCategory();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  updateCategory(category: Category) {
    this.http.put<Category>(this.apiUrl + '/api/Category', category).subscribe(
      (response: Category) => {
        console.log(response);

        this.getMyCategory();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteCategory(id: number) {
    this.http.delete<Category>(this.apiUrl + `/api/Category/${id}`).subscribe(
      (respons) => {
        console.log(respons);
        this.getMyCategory();
      },
      (error) => console.log(error)
    );
  }
  getCategory(id: number) {
    return this.categories.find((category) => category.id === id);
  }

  getMyCategory() {
    this.http
      .get<Category[]>(this.apiUrl + '/api/Category/current')
      .subscribe((data: Category[]) => {
        this.categories = data;
        this.categoriyChange.next(this.categories.slice());
      });
  }
}
