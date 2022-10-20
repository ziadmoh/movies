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
 // user!: SocialUser;
  isLoggedIn: boolean = false;
  constructor(private http: HttpClient,
              private router:Router,
              private toast: ToastrService,
              private acRoute:ActivatedRoute
              ) { }
            

  newUser = new BehaviorSubject<User>(null!);
  //errorSub = new Subject<string>();// FaceBook Sign in and Sign Out //////////////////////////////////////////////////////////////


/// Handle Auth ///////////////////////////////////////////////////////////////////////
  private handleUserAuth(
    user:User,
    token:string
  ) {
    const userNew :User = {
      email:user.email ? user.email :'',
      password:'',
      token:token,
    }
    //= new User(userId,'','','','','','',false,0,'','');
    this.newUser.next(userNew);
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
              {email:credentials.email,password:credentials.password,token:res.authorisation.token},
              res.authorisation.token
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
            this.login({
              email:res.user.email,
              password:credentials.password
            })
          }else{
            this.toast.error(res.status,res.message)
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
    }

    if (loadedUser.token) {
      this.newUser.next(loadedUser);
      this.isLoggedIn = true;
    }
  }

  logout() {
    this.newUser.next(null!);
    this.isLoggedIn = false;
    localStorage.removeItem('user');
    //this.router.navigate(['/']);
    window.location.href = '/login'
  }


}
 