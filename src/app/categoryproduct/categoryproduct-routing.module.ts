import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { CategoryProductComponent } from './category-product/category-product.component';
import { ProductComponent } from './product/product.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';

const routes: Routes = [
  // { path: '' , redirectTo:'category'},
  { path: '',component:CategoryProductComponent,children:[
    { path: 'category', component: CategoryComponent },
    {
      path: 'category/new',
      component: ManageCategoryComponent,
      // resolve: [RecipesResolverService]
    },
    { path: 'product', component: ProductComponent },
  ] },

  { path: '**', redirectTo:'category' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryproductRoutingModule { }
