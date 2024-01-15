import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,

} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../category/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../auth/user.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.css',
})
export class ManageCategoryComponent implements OnInit, OnChanges {
  @Input() editMode: boolean;
  @Input() EditIndex: number;
  @Output() closeModalEvent: EventEmitter<void> = new EventEmitter<void>();
  user:User;
  CategoryForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private authService:AuthService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.EditIndex) {
      const newEditIndex = changes.EditIndex.currentValue;
      this.updateForm(newEditIndex);
    }
  }
  ngOnInit(): void {
this.authService.userSubject.subscribe(
  user=>{
    this.user= user ;
  }
)

  }

  updateForm(editIndex: number) {
    const category = this.categoryService.getCategory(editIndex);
    this.CategoryForm.patchValue({
      name: category ? category.categoryName : '',
    });
  }
  onSubmit() {
    const nameCategory = this.CategoryForm.value.name;
    if (this.editMode) {
      this.categoryService.updateCategory({
        id: this.EditIndex,
        categoryName: nameCategory,
      });
    } else {
      this.categoryService.setCategory({categoryName:nameCategory,});
    }
    this.CategoryForm.reset();
    this.closeModalEvent.emit();
    this.router.navigate(['./'], { relativeTo: this.route });
  }
  onClose() {
    this.closeModalEvent.emit();
  }
}
