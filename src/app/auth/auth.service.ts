import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn:"root"
})
export class AuthService{
 isAuthSubject = new BehaviorSubject<boolean>(false);
constructor(private router:Router){}


  login(user:User){
console.log(user)
this.isAuthSubject.next(true) ;
this.router.navigate(['operations'])
  }

  Logout(){
    this.isAuthSubject.next(false) ;
    this.router.navigate(['/login'])
  }
}
