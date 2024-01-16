import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {
  OperationDetailResponse,
  operationService,
} from '../operations.service';
import { Operation } from '../operations.model';
import { Subscription } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css'], // Fix the typo here
})
export class OperationsComponent implements OnInit, OnDestroy {
  constructor(
    private operationService: operationService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {}
  @ViewChild('FormViewOperation') testModal: NgbModalRef; // Reference to the modal template

  modalRef: NgbModalRef;
  OperationDetails: OperationDetailResponse[];
  searchInput = '';
  operations: Operation[];
  subscription: Subscription; // Fix the typo here

  ngOnInit(): void {
    this.subscription = this.operationService
      .getOperations()
      .subscribe((operations) => {
        this.operations = operations;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goEntryOperation() {
    this.router.navigate(['operation-entry'], { relativeTo: this.route });
  }
  openModal(operationId: number) {
    this.operationService.viewOperation(operationId).subscribe(
      (data) => {
        this.OperationDetails = data;
      },
      (error) => {
        console.error('Error fetching operation details:', error);
      }
    );
    this.modalRef = this.modalService.open(this.testModal, {
      centered: true,
      backdrop: false,
    });
  }

  closeModel() {
    if (this.modalRef) {
      this.modalRef.dismiss();
      this.OperationDetails = [];
    }
  }
}
