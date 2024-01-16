import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ProductService } from '../product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.css',
})
export class ManageProductComponent implements OnInit, OnDestroy {
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  @Input() editMode: boolean;
  @Input() EditIndex: number;
  @Output() closeModalEvent: EventEmitter<void> = new EventEmitter<void>();
  categories: Category[];
  subscribtionCategory: Subscription;
  ProductForm = new FormGroup({
    name: new FormControl(' ', Validators.required),
    price: new FormControl(0, Validators.required),
    discount: new FormControl(0, Validators.required),
    tax: new FormControl(0, Validators.required),
    CategoryId: new FormControl(0, Validators.required),
  });
  ngOnInit(): void {
    this.subscribtionCategory = this.categoryService.categoriyChange.subscribe(
      (data) => {
        this.categories = data;
      }
    );
    this.categoryService.getCategories();
    // ...
  }
  ngOnDestroy(): void {
    this.subscribtionCategory.unsubscribe;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.EditIndex) {
      const newEditIndex = changes.EditIndex.currentValue;
      this.updateForm(newEditIndex);
    }
  }
  updateForm(editIndex: number) {
    const product = this.productService.getIndexProduct(editIndex);

    this.ProductForm.setValue({
      name: product ? product.name : '',
      price: product ? product.price : 0,
      discount: product ? product.discount : 0,
      tax: product ? product.tax : 0,
      CategoryId: product ? product.id : null,
    });
  }

  onSubmit() {
    const productName = this.ProductForm.value.name;
    const productPrice = this.ProductForm.value.price;
    const productDiscount = this.ProductForm.value.discount;
    const productTax = this.ProductForm.value.tax;
    const productCategoryId = this.ProductForm.value.CategoryId;
    if (this.editMode) {
      this.productService.updateProduct({
        id: this.EditIndex,
        name: productName,
        price: productPrice,
        discount: productDiscount,
        tax: productTax,
        CategoryId: productCategoryId,
      });
    } else {
      this.productService.setProduct({
        id: 1,
        name: productName,
        price: productPrice,
        discount: productDiscount,
        tax: productTax,
        CategoryId: productCategoryId,
      });
    }
    this.ProductForm.reset();
    this.closeModalEvent.emit();
    this.router.navigate(['./'], { relativeTo: this.route });
  }

  onClose() {
    this.closeModalEvent.emit();
  }
}
