import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'operations',
    loadChildren: () => import('./operation/operation.module').then((m) => m.OperationModule),
    canActivate: [AuthGuard],
    data: { roles: ['Admin','User']}
  },
  {
    path: 'ManageProduct',
    loadChildren: () => import('./categoryproduct/categoryproduct.module').then((m) => m.CategoryproductModule),
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },

  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
