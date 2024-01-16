import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { operationService } from '../operations.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProductService } from '../../categoryproduct/product/product.service';
import { Product } from '../../categoryproduct/product/product.model';
import { Operation, OperationDetail } from '../operations.model';
import { exhaustMap, forkJoin, take } from 'rxjs';

@Component({
  selector: 'app-operation-entry',
  templateUrl: './operation-entry.component.html',
  styleUrls: ['./operation-entry.component.css'], // Fix the typo here
})
export class OperationEntryComponent implements OnInit {
  operationItem: Product[];
  isSaveNotAvilable = false;
  errorMassege: string;
  grossTotal: number = 0;
  totalDiscount: number = 0;
  totalTax: number = 0;
  total: number = 0;
  customerName: string = '';
  operationType: number = 0;
  items: Product[] = [];
  itemCount: number = 0;
  Count: number = 0;
  errorMassage: string;

  constructor(
    private router: Router,
    private operationServie: operationService,
    private itemService: ProductService
  ) {}

  ngOnInit(): void {
    this.itemService.productsChange.subscribe((products: Product[]) => {
      this.operationItem = [];
      this.items = products;
      console.log(this.items);
    });

    this.itemService.getProduct();
  }
  onChange() {
    this.grossTotal = 0;
    this.totalDiscount = 0;
    this.totalTax = 0;
    this.Count = 0;

    if (this.operationItem === undefined) {
      this.operationItem = []; // Initialize operationItem if not already defined
    }

    // Calculate the total discount and total tax before rounding
    this.totalDiscount = this.items.reduce((total, currentItem) => {
      const itemQuantity = currentItem.quantity || 0;
      const itemTotal = currentItem.price * itemQuantity;
      return total + itemTotal * (currentItem.discount / 100);
    }, 0);

    this.totalTax = this.items.reduce((total, currentItem) => {
      const itemQuantity = currentItem.quantity || 0;
      const itemTotal = currentItem.price * itemQuantity;
      return total + itemTotal * (currentItem.tax / 100);
    }, 0);

    this.items.forEach((currentItem) => {
      const itemQuantity = currentItem.quantity || 0;

      const itemTotal = currentItem.price * itemQuantity;

      this.grossTotal += itemTotal;

      if (itemQuantity > 0) {
        this.Count++;
        if (!this.operationItem.includes(currentItem)) {
          this.operationItem.push(currentItem);
        }
      }
    });

    this.itemCount = this.operationItem.reduce(
      (total, currentItem) => total + (currentItem.quantity || 0),
      0
    );

    this.grossTotal = parseFloat(this.grossTotal.toFixed(2));
    this.totalDiscount = parseFloat(this.totalDiscount.toFixed(2));
    this.totalTax = parseFloat(this.totalTax.toFixed(2));

    this.total = this.grossTotal + this.totalTax - this.totalDiscount;
    this.total = parseFloat(this.total.toFixed(2));
  }

  onSubmit() {
    var operationSend = new Operation(
      0,
      new Date(),
      this.total,
      this.grossTotal,
      this.totalDiscount,
      this.totalTax,
      this.operationType,
      []
    );
    if (
      (this.total != 0 && this.operationType == 5) ||
      this.operationType == 6
    ) {
      this.operationItem.forEach((element) => {
        var operationDetail = new OperationDetail(
          element.quantity,
          element.id,
          -1
        );
        operationSend.Items.push(operationDetail);
      });
      this.operationServie.addOperation(operationSend);
    } else {
      this.isSaveNotAvilable = true;
      if (this.total == 0) {
        this.errorMassage = ' Please add items to Operation';
      } else if (this.operationType == 0) {
        this.errorMassage = 'Please add valid operation type';
      } else if (this.customerName == '') {
        this.errorMassage = 'Please add customer type';
      }
      debugger;
    }
  }
  onClear(form: NgForm) {
    this.grossTotal = 0;
    this.totalDiscount = 0;
    this.totalTax = 0;
    this.itemCount = 0;
    this.total = 0;
    form.reset();
  }
}
