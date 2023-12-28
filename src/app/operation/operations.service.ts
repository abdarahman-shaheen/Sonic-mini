import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Operation } from "./operations.model";
import { ProductService } from "../categoryproduct/product/product.service";
interface OperationDetail{
  grossTotal: number;
  totalDiscount: number;
  totalTax: number;
  total: number;
  itemCount: number;
  customerName: string ;
  operationType: string
}

@Injectable({
  providedIn:"root"
})
export class operationService{

  constructor(private productService:ProductService){}
  operationDetail = new Subject<{
    grossTotal: number;
    totalDiscount: number;
    totalTax: number;
    total: number;
    itemCount: number;
  }>();

  OperationChanged = new Subject<Operation[]>();

  setOperation(operationDetail: OperationDetail) {
    this.operations.push({id:5,type:operationDetail.operationType,nameCustomer:operationDetail.customerName
  ,date: new Date(),netTotal:operationDetail.total,grossTotal:operationDetail.grossTotal,

  });
    this.OperationChanged.next(this.operations.slice());
  }
  operations:Operation[] = [
    {
      id: 1,
      type: 'sales',
      nameCustomer:'1',
      date: new Date(),
      netTotal: 200,
      grossTotal: 500,
    },
    {
      id: 2,
      type: 'sales',
      nameCustomer:'2',
      date: new Date(),
      netTotal: 400,
      grossTotal: 500,
    },{
      id: 3,
      type: 'sales',
      nameCustomer:'3',
      date: new Date(),
      netTotal: 300,
      grossTotal: 600,
    },
  ];
  getOperation() {
    return this.operations.slice();
  }
  getEntryService(){
    this.productService.products.slice()
  }

}

