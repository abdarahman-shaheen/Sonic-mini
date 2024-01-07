import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage : string
  count:number = 0;
  constructor(private authService:AuthService){}
 formLogin:FormGroup = new FormGroup({
 "email": new FormControl("",[Validators.email,Validators.required]),
 "password": new FormControl("",[Validators.required,Validators.minLength(6)])
 })

 onSubmit(){
  if (this.formLogin.valid) {
    this.authService.login({
      id:0,
      name:"samer",
      email: this.formLogin.value.email,
      password: this.formLogin.value.password
    });
    console.log(this.formLogin.value);
    debugger
    if(this.authService.errorMassege){
      this.authService.errorMassege.subscribe(error=>this.errorMessage=error);
    }
  } else {
    this.formLogin.markAllAsTouched();
  }
}
}
