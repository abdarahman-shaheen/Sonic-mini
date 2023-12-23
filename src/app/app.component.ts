import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit,OnDestroy {

  title = 'Sonic-min';
 login :boolean =false;
subscribeLogin:Subscription
 constructor(private authService : AuthService){}
 ngOnInit(): void {
   this.subscribeLogin =  this.authService.isAuthSubject.subscribe((isAuth) => {
     this.login = isAuth;
    });
  }
  ngOnDestroy(): void {
    this.subscribeLogin.unsubscribe()
  }




}
