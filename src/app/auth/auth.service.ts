import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: "root",
})
export class AuthService {
  errorMessage = new Subject<string>();
  isAuthSubject = new BehaviorSubject<boolean>(false);
  userSubject = new BehaviorSubject<User | null>(null);
  private apiUrl = "https://localhost:44351";
  private tokenExpirationTimer: any;
  private jwtHelper: JwtHelperService = new JwtHelperService();

  // getUserInfo() {
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     return null;
  //   }
  //    this.http.get<User>(this.apiUrl + "/api/User").subscribe(data=>console.log(data)
  //    );
  // }

  constructor(private router: Router, private http: HttpClient) {}

  login(user: User): void {
    clearTimeout(this.tokenExpirationTimer);
    this.http.post<User>(this.apiUrl + "/api/User/login", user).subscribe(
      (response) => {
        debugger
        if(response.token){

          localStorage.setItem('token', response.token);
          const expiresInDuration = this.getTokenExpirationDuration(response.token);
          this.setLogoutTimer(expiresInDuration);
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
  private getTokenExpirationDuration(token: string): number {
    const decodedToken: any = this.jwtHelper.decodeToken(token);
    const expirationDate = new Date(decodedToken.exp * 1000); // Convert to milliseconds
    const now = new Date();
    debugger
    return expirationDate.getTime() - now.getTime();
  }

  private setLogoutTimer(duration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }
  logout() {
    this.isAuthSubject.next(false);
    localStorage.removeItem("token");
    clearTimeout(this.tokenExpirationTimer);
    this.router.navigate(['/login']);
  }
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
