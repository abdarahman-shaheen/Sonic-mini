import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService:AuthService){}
count:number = 0;
 formLogin:FormGroup = new FormGroup({
 "email": new FormControl("",[Validators.email,Validators.required]),
 "password": new FormControl("",[Validators.required,Validators.minLength(6)])
 })

 onSubmit(){
  if (this.formLogin.valid) {
    this.authService.login({
      email: this.formLogin.value.email,
      password: this.formLogin.value.password
    });
    console.log(this.formLogin.value);
  } else {
    this.formLogin.markAllAsTouched();
  }
}
}
