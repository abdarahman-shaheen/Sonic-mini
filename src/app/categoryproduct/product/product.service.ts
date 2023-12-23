import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { Subject } from "rxjs";

@Injectable(
  {
    providedIn:"root"
  }
  )
export class ProductService{

  productsChange = new Subject<Product[]>;
products:Product[]= [
  {
    id: 1,
    name: 'Item 1',
    price: 100,
    discount: 10,
    tax: 16,
  },
  {
    id: 2,
    name: 'Item 2',
    price: 200,
    discount: 20,
    tax: 16,
  },
  {
    id: 3,
    name: 'Item 3',
    price: 150,
    discount: 15,
    tax: 12,
  },
]
getProduct(){
  return this.products.slice();
}
setProduct(product:Product){
  this.products.push(product);
  this.productsChange.next(this.products);
}

}
