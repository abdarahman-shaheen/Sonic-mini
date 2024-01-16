import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationRoutingModule } from './operation-routing.module';
import { OperationsComponent } from './operations/operations.component';
import { OperationEntryComponent } from './operation-entry/operation-entry.component';
import { FormsModule, NgForm } from '@angular/forms';
import { SharedModule } from '../Shared/shared.modul';

@NgModule({
  declarations: [OperationsComponent, OperationEntryComponent],
  imports: [CommonModule, OperationRoutingModule, FormsModule, SharedModule],
})
export class OperationModule {}
