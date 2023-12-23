import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationsComponent } from './operations/operations.component';
import { OperationEntryComponent } from './operation-entry/operation-entry.component';

const routes: Routes = [{
  path:'',component:OperationsComponent,
},
{
  path:'operation-entry',component:OperationEntryComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationRoutingModule { }
