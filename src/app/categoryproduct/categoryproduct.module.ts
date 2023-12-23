import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryproductRoutingModule } from './categoryproduct-routing.module';
import { CategoryComponent } from './category/category.component';
import { CategoryProductComponent } from './category-product/category-product.component';
import { ProductComponent } from './product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditCategoryComponent } from './edit-category/edit-category.component';


@NgModule({
  declarations: [
    CategoryComponent,
    CategoryProductComponent,
    ProductComponent,
    EditCategoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CategoryproductRoutingModule,
    ReactiveFormsModule
  ]
})
export class CategoryproductModule { }
