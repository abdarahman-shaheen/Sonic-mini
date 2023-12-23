import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryproductRoutingModule } from './categoryproduct-routing.module';
import { CategoryComponent } from './category/category.component';
import { CategoryProductComponent } from './category-product/category-product.component';
import { ProductComponent } from './product/product.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CategoryComponent,
    CategoryProductComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CategoryproductRoutingModule
  ]
})
export class CategoryproductModule { }
