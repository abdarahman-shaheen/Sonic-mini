import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  isNew = false;
countProductId = 0
products:Product[]
  constructor(private productService:ProductService){

  }
  ngOnInit(): void {

this.productService.productsChange.subscribe(data=>{
  this.products =data
})
this.products= this.productService.getProduct()
}
  onNew(){
this.isNew = true
  }
  onSubmit(f:NgForm){
this.productService.setProduct({
  id:this.countProductId++,
  name:  f.value.name,
  price:  f.value.price,
  discount:  f.value.discount,
  tax:  f.value.tax
})
  }
}
