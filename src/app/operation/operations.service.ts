import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Operation, OperationDetail } from "./operations.model";
import { ProductService } from "../categoryproduct/product/product.service";
import { HttpClient } from "@angular/common/http";

export interface OperationDetailResponse {
  quantity: number;
  itemId: number;
  operationId: number;
  operationType: number;
  operationDate: Date;
  netTotal: number;
  grossTotal: number;
  discountTotal: number;
  taxTotal: number;
  itemName: string;
  itemPrice: number;
  itemDiscount: number;
  itemTax: number;
}

@Injectable({
  providedIn:"root"
})
export class operationService{


  private apiUrl = "https://localhost:44351";
  public operationsChange = new Subject<Operation[]>();
  operations: Operation[] = [];
  operationDetails:OperationDetailResponse[]=[];
  constructor(private http: HttpClient) {}

  getOperations() {
   return this.http.get<Operation[]>(`${this.apiUrl}/api/Operation`)
    // subscribe(
    //   (operations: Operation[]) => {
    //     this.operations = operations;
    //     this.operationsChange.next(this.operations.slice());
    //   },
    //   (error) => this.handleHttpError(error)
    // );
  }



 addOperation(operation: Operation) {
  debugger
    this.http.post<Operation>(`${this.apiUrl}/api/Operation`, operation).subscribe(
      (response: Operation) => {

        // this.operations.push(response);
        // this.operationsChange.next(this.operations.slice());
        console.log(response);
        this.getOperations()
      },
      (error) => this.handleHttpError(error)
    );
  }

  updateOperation(operation: Operation) {
    this.http.put<Operation>(`${this.apiUrl}/api/Operation/${operation.id}`, operation).subscribe(
      (response: Operation) => {
        console.log(response);
        this.getOperations()
        // const updatedOperationIndex = this.operations.findIndex(op => op.id === operation.id);
        // this.operations[updatedOperationIndex] = response;
        // this.operationsChange.next(this.operations.slice());
      },
      (error) => this.handleHttpError(error)
    );
  }

  getOperationById(id: number) {
    return this.operations.find(op => op.id === id);
  }

  deleteOperation(id: number) {
    this.http.delete<Operation>(`${this.apiUrl}/api/Operation/${id}`).subscribe(
      (response) => {console.log(response);
        this.getOperations()},
      (error) => this.handleHttpError(error)
    );
    // const index = this.operations.findIndex(operation => id === operation.id);
    // this.operations.splice(index, 1);
    // this.operationsChange.next(this.operations.slice());
  }

  private handleHttpError(error: any): void {
    console.error("HTTP Error:", error);
    // Handle error (e.g., display error message to user)
  }

  viewOperation(OperationId: number) {
   return this.http.get<OperationDetailResponse[]>(`${this.apiUrl}/api/Operation/details/${OperationId}`)
  }
}

