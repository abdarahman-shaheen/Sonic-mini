import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Operation, OperationDetail } from './operations.model';
import { ProductService } from '../categoryproduct/product/product.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
  providedIn: 'root',
})
export class operationService {
  private apiUrl = 'https://localhost:44351';
  public operationsChange = new Subject<Operation[]>();
  operations: Operation[] = [];
  operationDetails: OperationDetailResponse[] = [];
  constructor(private http: HttpClient, private router: Router) {}

  getOperations() {
    return this.http.get<Operation[]>(`${this.apiUrl}/api/Operation`);
  }

  addOperation(operation: Operation) {
    debugger;
    this.http
      .post<Operation>(`${this.apiUrl}/api/Operation`, operation)
      .subscribe(
        (response: Operation) => {
          console.log(response);
          this.getOperations();
          this.router.navigate(['/operations']);
        },
        (error) => this.handleHttpError(error)
      );
  }

  updateOperation(operation: Operation) {
    this.http
      .put<Operation>(`${this.apiUrl}/api/Operation/${operation.id}`, operation)
      .subscribe(
        (response: Operation) => {
          console.log(response);
          this.getOperations();
        },
        (error) => this.handleHttpError(error)
      );
  }

  getOperationById(id: number) {
    return this.operations.find((op) => op.id === id);
  }

  deleteOperation(id: number) {
    this.http.delete<Operation>(`${this.apiUrl}/api/Operation/${id}`).subscribe(
      (response) => {
        console.log(response);
        this.getOperations();
      },
      (error) => this.handleHttpError(error)
    );
  }

  private handleHttpError(error: any): void {
    console.error('HTTP Error:', error);
  }

  viewOperation(OperationId: number) {
    return this.http.get<OperationDetailResponse[]>(
      `${this.apiUrl}/api/Operation/details/${OperationId}`
    );
  }
}
