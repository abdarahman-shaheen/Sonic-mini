import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit,OnDestroy {
  constructor(private authService :AuthService,private router:Router){}

  isAuthenticated :boolean;
  subscribsionLogOut:Subscription
  ngOnInit(): void {
      const token = localStorage.getItem('token');
    if(token){
      this.isAuthenticated = true ;
    }
    else{
      this.subscribsionLogOut=  this.authService.isAuthSubject.subscribe(data=>{
        this.isAuthenticated=data;
      })
    }

  }
  ngOnDestroy(): void {
    this.subscribsionLogOut.unsubscribe()  }
  onLogout(){
  this.authService.logout() ;
  }
}
