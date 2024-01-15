import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit,OnDestroy {
  user:User
  constructor(private authService :AuthService,private router:Router){}
  isAuthenticated :boolean;
  subscribsionLogOut:Subscription
  ngOnInit(): void {
      const token = localStorage.getItem('token');
    if(token){
     this.authService.isAuthSubject.subscribe(data=>{
        this.isAuthenticated=data;})

        if(this.authService.isAuthenticated){
          this.authService.userSubject.subscribe(user=>
            this.user=user);
        }

    }
    else{
   this.authService.isAuthSubject.subscribe(data=>{
        this.isAuthenticated=data;
      })
    }

  }
  ngOnDestroy(): void {
    this.subscribsionLogOut.unsubscribe() ;
  }
  onLogout(){
  this.authService.logout() ;
  }
}
