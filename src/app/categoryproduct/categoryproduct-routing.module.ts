import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { CategoryProductComponent } from './category-product/category-product.component';
import { ProductComponent } from './product/product.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

const routes: Routes = [
  // { path: '' , redirectTo:'category'},
  // { path: '',redirectTo:'category' },
  { path: 'category', component: CategoryComponent },
  {
    path: 'category/new',
    component: EditCategoryComponent,
    // resolve: [RecipesResolverService]
  },
  { path: 'product', component: ProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryproductRoutingModule { }
