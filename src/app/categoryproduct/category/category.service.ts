import { Injectable } from "@angular/core";
import { Category } from "./category.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn:'root'
})
export class categoryService{
  categoriyChange = new Subject<Category[]>()
   categories: Category[] = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Clothing' },
    { id: 3, name: 'Books' },
  ];

  getCategories(): Category[] {
    return this.categories;
  }
  setCategory(category:Category){
this.categories.push(category);
this.categoriyChange.next(this.categories.slice())
  }
}
