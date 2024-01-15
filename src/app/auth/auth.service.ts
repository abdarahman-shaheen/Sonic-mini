import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  errorMessage = new Subject<string>();
  isAuthSubject = new BehaviorSubject<boolean>(false);
  userSubject = new BehaviorSubject<User | null>(null);
  private apiUrl = 'https://localhost:44351';
  private tokenExpirationTimer: any;
  private jwtHelper: JwtHelperService = new JwtHelperService();
  subscription: Subscription;
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
    this.http.post<User>(this.apiUrl + '/api/User/login', user).subscribe(
      (response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          const expiresInDuration = this.getTokenExpirationDuration(
            response.token
          );
          this.setLogoutTimer(expiresInDuration);
          this.isAuthSubject.next(true);
          this.getUser();
          // this.userSubject.next(response);
        } else {
          this.errorMessage.next('The email and password is not correct');
        }
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.errorMessage.next(error);
      }
    );
  }
  getUser() {
    this.subscription = this.http
      .get<User>(this.apiUrl + '/api/User/profile')
      .subscribe((user) => {
        this.userSubject.next(user);
        this.router.navigate(['operations']);
      });
  }

  private getTokenExpirationDuration(token: string): number {
    const decodedToken: any = this.jwtHelper.decodeToken(token);
    const expirationDate = new Date(decodedToken.exp * 1000);
    const now = new Date();

    return expirationDate.getTime() - now.getTime();
  }

  private setLogoutTimer(duration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }
  logout() {
    this.isAuthSubject.next(false);
    this.userSubject.next(null);
    localStorage.removeItem('token');
    clearTimeout(this.tokenExpirationTimer);
    this.router.navigate(['/login']);
  }
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
  autoLogin() {
    const token = localStorage.getItem('token');

    if (token) {
      if (this.jwtHelper.isTokenExpired(token)) {
        // Token is expired, perform logout
        this.logout();
      } else {
        // Token is valid, set up auto-login
        this.isAuthSubject.next(true);
        this.getUser();
      }
    }
  }


}

