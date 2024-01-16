import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Category } from './category.model';
import { CategoryService } from './category.service';
import { Subscription } from 'rxjs';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'], // Fix the typo here
})
export class CategoryComponent implements OnInit, OnDestroy {
  constructor(
    private modalService: NgbModal,
    private catgoryService: CategoryService
  ) {}
  @ViewChild('CategotyManageModal') testModal: NgbModalRef;
  modalRef: NgbModalRef;
  isModeEdit = false;
  indexEdit: number;
  categories: Category[];
  isNew = false;
  searchInput: string = '';
  subscribtionCategory: Subscription;
  countId = 0;

  openModal() {
    this.modalRef = this.modalService.open(this.testModal, {
      centered: true,
      backdrop: false,
      size: 'sm',
    });
  }

  closeModel() {
    if (this.modalRef) {
      this.modalRef.dismiss();
    }
  }

  ngOnDestroy(): void {
    this.subscribtionCategory.unsubscribe();
  }
  ngOnInit(): void {
    this.catgoryService.getMyCategory();
    this.subscribtionCategory = this.catgoryService.categoriyChange.subscribe(
      (data) => {
        this.categories = data;
      }
    );
  }
  getMyCategory() {}
  onNew() {
    this.isNew = true;
  }

  onEditMode(id: number) {
    this.isModeEdit = true;
    this.indexEdit = id;
  }
  onAddMode() {
    this.isModeEdit = false;
  }
  onDeleteMode(id: number) {
    this.catgoryService.deleteCategory(id);
  }
}
