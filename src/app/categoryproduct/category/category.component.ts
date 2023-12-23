import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from './category.model';
import { categoryService } from './category.service';
import { Subscription, count } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit ,OnDestroy {

  categories:Category[];
isNew=false;
searchInput:string;
subscribtionCategory:Subscription;
countId =0;
  constructor(private catgoryService:categoryService, private router :Router,private route:ActivatedRoute ){

  }

  ngOnDestroy(): void {
this.subscribtionCategory.unsubscribe()
  }
  ngOnInit(): void {
  this.subscribtionCategory=  this.catgoryService.categoriyChange.subscribe(data=>{
      this.categories = data
    })
   this.categories = this.catgoryService.getCategories()
  }


  onNew(){
this.isNew = true
  }
  onSubmit(form:NgForm){
    this.countId++;
    console.log(form)
this.catgoryService.setCategory({id:this.countId,name:form.value.name})
  }
  EditCategories(){
this.router.navigate(['new'],{relativeTo:this.route})
  }
}
