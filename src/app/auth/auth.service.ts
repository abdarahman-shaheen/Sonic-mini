import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  errorMessage = new Subject<string>();
  isAuthSubject = new BehaviorSubject<boolean>(false);
  userSubject = new BehaviorSubject<User | null>(null);
  private apiUrl = "https://localhost:44351";

  // Method to get user information using the token
  getUserInfo() {
    const token = localStorage.getItem("token");

    if (!token) {
      // Token not available, handle accordingly
      return null;
    }
     this.http.get<User>(this.apiUrl + "/api/User").subscribe(data=>console.log(data)
     );
  }

  constructor(private router: Router, private http: HttpClient) {}

  login(user: User): void {
    this.http.post<User>(this.apiUrl + "/api/User/login", user).subscribe(
      (response) => {
        debugger
        if(response.token){
          localStorage.setItem('token', response.token);
          this.isAuthSubject.next(true);
          this.userSubject.next(response);
          this.router.navigate(['operations']);
        }
        else{
          this.errorMessage.next("The email and password is not correct");
        }
      },
      (error) => {
        console.error("Error fetching users:", error);
        this.errorMessage.next(error);
      }
    );
  }

  logout() {
    this.isAuthSubject.next(false);
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
