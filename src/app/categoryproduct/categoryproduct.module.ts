import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryproductRoutingModule } from './categoryproduct-routing.module';
import { CategoryComponent } from './category/category.component';
import { CategoryProductComponent } from './category-product/category-product.component';
import { ProductComponent } from './product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlert, NgbAlertModule, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageProductComponent } from './manage-product/manage-product.component';


@NgModule({
  declarations: [
    CategoryComponent,
    CategoryProductComponent,
    ProductComponent,
    ManageCategoryComponent,
    ManageProductComponent,


  ],
  imports: [
    CommonModule,
    FormsModule,
    CategoryproductRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    NgbAlert,
    NgbAlertModule,
    NgbNavModule,


  ]
})
export class CategoryproductModule { }
