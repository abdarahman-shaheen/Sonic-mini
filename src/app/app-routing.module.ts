import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'operations',
    loadChildren: () => import('./operation/operation.module').then((m) => m.OperationModule),
  },
  {
    path: 'ManageProduct',
    loadChildren: () => import('./categoryproduct/categoryproduct.module').then((m) => m.CategoryproductModule),
  },

  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
