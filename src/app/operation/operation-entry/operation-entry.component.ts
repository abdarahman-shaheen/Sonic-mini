import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { operationService } from '../operations.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProductService } from '../../categoryproduct/product/product.service';
import { Product } from '../../categoryproduct/product/product.model';

@Component({
  selector: 'app-operation-entry',
  templateUrl: './operation-entry.component.html',
  styleUrls: ['./operation-entry.component.css'], // Fix the typo here
})
export class OperationEntryComponent implements OnInit {
  constructor(
    private router: Router,
    private operationServie: operationService
  , private itemService:ProductService) {}

  ngOnInit(): void {
    // Subscribe to productsChange to get the updated products
    this.itemService.productsChange.subscribe((products: Product[]) => {
      this.items = products;
    });

    // Fetch products initially
    this.itemService.getProduct();
  }
  isSaveNotAvilable = false;
  errorMassege:string
  grossTotal: number = 0;
  totalDiscount: number = 0;
  totalTax: number = 0;
  total: number = 0;
  customerName: string = '';
  operationType: string = '';
  items:Product[]=[]
  quantityArray: number[] = Array(this.items.length).fill(0);
  itemCount: number = 0;
  Count: number = 0;
  errorMassage:string
  onChange(index: number, quantity: number) {
    this.quantityArray[index] = quantity || 0;
    this.grossTotal = 0;
    this.totalDiscount = 0;
    this.totalTax = 0;
    this.Count = 0; // Reset Count before calculating

    this.items.forEach((currentItem, i) => {
      this.grossTotal += currentItem.price * this.quantityArray[i];
      this.totalDiscount +=
        currentItem.price * (currentItem.discount / 100) * this.quantityArray[i];
      this.totalTax += currentItem.tax * this.quantityArray[i]; // Use currentItem.tax directly

      if (this.quantityArray[i] > 0) {
        // Increment Count for each item with quantity > 0
        this.Count++;
      }
    });

    this.itemCount = this.quantityArray.reduce((total, quantity) => total + quantity, 0);

    // Calculate total without applying discount
    const totalWithoutDiscount = this.grossTotal + this.totalTax;

    // Calculate total after discount
    const totalAfterDiscount = totalWithoutDiscount - this.totalDiscount;

    this.total = totalAfterDiscount;
  }

  onSubmit() {
    if (this.total != 0 &&this.operationType!="" && this.customerName !=="") {
      console.log(this.operationType+" "+this.customerName)
      this.operationServie.setOperation({
        grossTotal: this.grossTotal,
        totalDiscount: this.totalDiscount,
        totalTax: this.totalTax,
        total: this.total,
        itemCount: this.itemCount,
        customerName: this.customerName,
        operationType: this.operationType,
      });

      this.router.navigate(['/operations']);
    } else {
      if(this.total==0){
        this.errorMassage=" Please add items to Operation";
      }
else if(this.operationType==""){
  this.errorMassage = "please add operation type"
}
else if(this.customerName ==""){
  this.errorMassage = "please add customer type"
}
else{
  this.errorMassage=" Please add items to Operation";
}
      this.isSaveNotAvilable = true;
      // switch(this.operationType==null || this.customerName){
      //   case this.operationType==null :
      //     this.errorMassege = "please add type operation"
      //     break
      //     case this.customerName:
      //       this.errorMassege = "please add customer Name";
      //       break;
      //       default:
      //         this.errorMassege = "please add item to operation"
      // }
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
