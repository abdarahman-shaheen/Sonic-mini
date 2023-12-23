import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { operationService } from '../operations.service';
import { Operation } from '../operations.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrl: './operations.component.css',
})
export class OperationsComponent implements OnInit,OnDestroy {
  constructor(private operationServie:operationService,private route:ActivatedRoute,private router:Router){}
  searchInput='';
  operations:Operation[]
  subscrbtion:Subscription
  ngOnInit(): void {
    this.subscrbtion=  this.operationServie.OperationChanged
    .subscribe(
      (operation: Operation[]) => {
        this.operations = operation;
      }
      );
      this.operations= this.operationServie.getOperation();
    }

    ngOnDestroy(): void {
      this.subscrbtion.unsubscribe()
    }
  goEntryOperation(){
this.router.navigate(['operation-entry'],{relativeTo:this.route})
  }

}
