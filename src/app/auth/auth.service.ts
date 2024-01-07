import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn:"root"
})
export class AuthService{
  errorMassege= new Subject<string>;
 isAuthSubject = new BehaviorSubject<boolean>(false);
 private apiUrl = "https://localhost:44351";
constructor(private router:Router,private http:HttpClient){}


login(user: User): void {

  this.http.get<User[]>(this.apiUrl + "/api/User").subscribe(
    (response:User[]) => {
      const authenticatedUser = response.find(
        (u) => u.email === user.email && u.password=== user.password
      );
      if (authenticatedUser) {
        console.log(authenticatedUser);
        this.isAuthSubject.next(true);
        this.router.navigate(['operations']);
      } else {
        this.errorMassege.next("Email or password is incorrect");
      }
    },
    (error) => {
      console.error("Error fetching users:", error);
      this.errorMassege.next("Email or password is incorrect");
    }
  );
}
  Logout(){
    this.isAuthSubject.next(false) ;
    this.router.navigate(['/login'])
  }
}
