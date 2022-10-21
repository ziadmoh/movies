import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
//import { SocialAuthService,FacebookLoginProvider, GoogleLoginProvider ,SocialUser } from "angularx-social-login";
import {User} from '../models/user.model';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

export interface AuthResponseData {
  error:boolean,
  message:string,
  user:User
  //User_Type:string,
  //User_Name:string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  constructor(private http: HttpClient,
              private router:Router,
              private toast: ToastrService,
              private acRoute:ActivatedRoute
              ) { }
            

  newUser = new BehaviorSubject<User>(null!);

  private tokenExpirationTimer: any;

  private handleUserAuth(
    user:User,
  ) {
    const userNew :User = {
      email:user.email ? user.email :'',
      password:'',
      token:user.token,
      _tokenExpirationDate:user._tokenExpirationDate
    }
    this.newUser.next(userNew);
    this.autoLogout();
    localStorage.setItem(
      'user', JSON.stringify(userNew)
    );
    this.router.navigate(['/system'])
  
    
  }


  
  login(credentials:{
    email:string,
    password:string
  }) {
    return this.http
      .post(
        environment.SERVER_URL +'login',{...credentials}
      )
      .pipe(
        tap((res:any) => {
          if(res.status == 'success'){
            this.isLoggedIn = true;
            this.handleUserAuth(
              {email:credentials.email,
                password:credentials.password,
                token:res.authorisation.token,
                _tokenExpirationDate:new Date().setHours(new Date().getHours() + 1)
              }
            );
          }else{
            this.toast.error(res.status,res.message)
          }
          
          },err=>{
            this.toast.error(err.error.message)
          }
        )
      );
  }

  register(credentials:{
    name:string,
    email:string,
    password:string
  }) {
    return this.http
      .post(
        environment.SERVER_URL +'register',{...credentials}
      )
      .pipe(
        tap((res:any) => {
          if(res.status == 'success'){
            this.isLoggedIn = true;

            this.handleUserAuth(
              {email:res.user.email,
                password:'',
                token:res.authorisation.token,
                _tokenExpirationDate:new Date().setHours(new Date().getHours() + 1)
              }
            )
          }else{
            for(let i=0;i<Object.entries(res.message).length;i++){
              this.toast.error(res.status,Object.values(res.message)[i] as string)
            }
            
          }
          
          },err=>{
            this.toast.error(err.error.message)
          }
          )
      );
  }

  autoLogin() {
    const user: User = JSON.parse(localStorage.getItem('user')!);
    if (!user) {
      return;
    }

    const loadedUser:User = {
      email:user.email ? user.email :'',
      password:'',
      token:user.token,
      _tokenExpirationDate:user._tokenExpirationDate
    }

    if (loadedUser.token) {
      this.newUser.next(loadedUser);
      this.isLoggedIn = true;
      this.autoLogout();
    }
  }

  logout() {
    this.newUser.next(null!);
    this.isLoggedIn = false;
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

    autoLogout() {
      this.tokenExpirationTimer = setTimeout(() => {
        this.logout();
      }, 3600*1000);
    }


}
 