import { Injectable } from "@angular/core";
import { Category } from "./category.model";
import { Observable, Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn:'root'
})
export class CategoryService{
private apiUrl = "https://localhost:44351";
  categoriyChange = new Subject<Category[]>()

  constructor(private http: HttpClient) {}
   categories: Category[] = [

  ];

  getCategories() {
     this.http.get<Category[]>(this.apiUrl+'/api/Category')
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        console.log(categories);
        this.categoriyChange.next(this.categories.slice());

      });
  }

  // getCategories(): Category[] {
  //   return this.categories;
  // }
  setCategory(category:Category){
    this.http.post<Category>(this.apiUrl+"/api/Category", category).subscribe(
      (response: Category) => {
        console.log(response);
        // Update your local categories array if needed
        // this.categories[index] = response;
        // Notify subscribers about the change
        this.categories.push(response)
        this.categoriyChange.next(this.categories.slice());
      },
      (error) => {
        console.error(error);
      }
    );

// this.categories.push(category);
// this.categoriyChange.next(this.categories.slice())
  }
  updateCategory(category: Category) {
    this.http.put<Category>(this.apiUrl+"/api/Category", category).subscribe(
      (response: Category) => {
        console.log(response);

     var updatedCategory= this.categories.findIndex(categorie =>category.id==categorie.id)
     this.categories[updatedCategory] = response;
        this.categoriyChange.next(this.categories.slice());
      },
      (error) => {
        console.error(error);
      }
    );

    // this.categoriyChange.next(this.categories.slice());
  }

deleteCategory(id:number){
  this.http.delete<Category>(this.apiUrl+`/api/Category/${id}`).subscribe(respons=>{
    console.log(respons);

  });
  var updatedCategory= this.categories.findIndex(categorie =>id==categorie.id)
  this.categories.splice(updatedCategory,1)
  this.categoriyChange.next(this.categories.slice());
}
getCategory(id: number) {
  return this.categories.find(category => category.id === id);
}
}
