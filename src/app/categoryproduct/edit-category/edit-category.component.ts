import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit {
  CategoryForm : FormGroup

  ngOnInit(): void {
    this.initForm()
    }
  onSubmit(){

  }
  private initForm() {
    let CategoryeName = '';
     this.CategoryForm= new FormGroup({
    name: new FormControl(CategoryeName, Validators.required),
  });
  }

}
