import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnDestroy,OnInit {
  errorMessage : string
  count:number = 0;
  subscribtion:Subscription
  constructor(private authService:AuthService,private toaster:ToastrService){}
  ngOnInit(): void {
    this.toaster.clear();
  }


 formLogin:FormGroup = new FormGroup({
 "email": new FormControl("",[Validators.email,Validators.required]),
 "password": new FormControl("",[Validators.required,Validators.minLength(6)])
 })

 onSubmit(){
  if (this.formLogin.valid) {
    this.authService.login({
      id:0,
    userName:"samer",
      email: this.formLogin.value.email,
      password: this.formLogin.value.password,
      role:"Admin",

    });
 this.authService.userSubject.subscribe(user=>{
  if(user){
     if(this.toaster){
      if(user.role=='Admin'){
        this.toaster.success(`Welcome Admin ${user.userName}`)

      }else
      {
        this.toaster.success(`Welcome User ${user.userName}`)

      }
       this.toaster = null;
     }
   }
   })
    console.log(this.formLogin.value);
    if(this.authService.errorMessage){
      this.authService.errorMessage.subscribe(error=>this.errorMessage=error);
    }
  } else {
    this.formLogin.markAllAsTouched();
  }

}
ngOnDestroy(): void {
}

}
