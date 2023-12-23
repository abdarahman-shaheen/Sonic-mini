import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationRoutingModule } from './operation-routing.module';
import { OperationsComponent } from './operations/operations.component';
import { OperationEntryComponent } from './operation-entry/operation-entry.component';
import { FormsModule, NgForm } from '@angular/forms';
import { SearchPip } from './operations/filter.pipe';


@NgModule({
  declarations: [
    OperationsComponent,
    OperationEntryComponent,
    SearchPip
  ],
  imports: [
    CommonModule,
    OperationRoutingModule,
    FormsModule
  ]
})
export class OperationModule { }
