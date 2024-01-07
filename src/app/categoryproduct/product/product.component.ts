import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'], // Corrected property name
})
export class ProductComponent implements OnInit {
  @ViewChild('FormManageModal') testModal: NgbModalRef; // Reference to the modal template
  modalRef: NgbModalRef;
  isModeEdit = false;
  indexEdit :number;
  searchInput:string="";
  isNew = false;
countProductId = 0
products:Product[]
  constructor(    private modalService: NgbModal,private productService:ProductService){

  }
  ngOnInit(): void {
    this.productService.productsChange.subscribe((data: Product[]) => {
      this.products = data;
    });

    this.productService.getProduct();
  }
  onNew(){
this.isNew = true
  }
  onSubmit(f:NgForm){
this.productService.setProduct({
  id:this.countProductId++,
  name:  f.value.name,
  price:  f.value.price,
  discount:  f.value.discount,
  tax:  f.value.tax,
  CategoryId:1
})
  }
  onEditMode(id:number){
    this.isModeEdit= true,
    this.indexEdit= id;
  }
  onAddMode(){
    this.isModeEdit=false;
  }
  onDeleteMode(id:number){
    this.productService.deleteProduct(id)
  }
  openModal() {
    this.modalRef = this.modalService.open(this.testModal, {
      centered: true,
      backdrop: false,
      size:'sm',
    });
  }

  closeModel() {
    if (this.modalRef) {
      this.modalRef.dismiss();
    }
  }
}
