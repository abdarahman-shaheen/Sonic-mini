import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { CategoryProductComponent } from './category-product/category-product.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: '', component: CategoryProductComponent ,children:[
    { path: 'category', component: CategoryComponent },
    { path: 'product', component: ProductComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryproductRoutingModule { }
