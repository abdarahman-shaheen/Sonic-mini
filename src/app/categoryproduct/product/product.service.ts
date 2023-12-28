import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable(
  {
    providedIn:"root"
  }
  )
export class ProductService{
  private apiUrl = "https://localhost:44351";
  productsChange = new Subject<Product[]>;
products:Product[]= [];
constructor(private http: HttpClient){}
getProduct() {
  this.http.get<Product[]>(this.apiUrl + '/api/Item').subscribe((products: Product[]) => {
    this.products = products;
    this.productsChange.next(this.products.slice());
  });
}
setProduct(product: Product) {
  this.http.post<Product>(this.apiUrl + '/api/Item', product).subscribe(
    (response: Product) => {
      console.log(response);
      this.products.push(response);
      this.productsChange.next(this.products.slice());
    },
    (error) => {
      console.error(error);
    }
  );
}
updateProduct(product: Product) {
  debugger
  this.http.put<Product>(this.apiUrl + `/api/Item/${product.id}`, product).subscribe(
    (response: Product) => {
      console.log(response);
      var updatedCategory= this.products.findIndex(products =>products.id==product.id)
      this.products[updatedCategory] = response;
      this.productsChange.next(this.products.slice());
    },
    (error) => {
      console.error(error);
    }
  );
}
 getIndexProduct(index: number) {
  var IndexProduct= this.products.findIndex(products =>products.id==index)
    return this.products[IndexProduct];
  }
  deleteProduct(id: number) {
    this.http.delete<Product>(this.apiUrl + `/api/Item/${id}`).subscribe((response) => {
      console.log(response);
    });
    const index = this.products.findIndex((product) => id === product.id);
    this.products.splice(index, 1);
    this.productsChange.next(this.products.slice());
  }
}
