import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoggedin: boolean = false;
  loginForm:UntypedFormGroup

  constructor(private authService:AuthService,
	private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initLogin()
  }

  initLogin(){
		this.loginForm = new UntypedFormGroup({
			'email': new UntypedFormControl(null,[Validators.required,Validators.email]),
			'password': new UntypedFormControl(null,[Validators.required])
		})
	}

  onSubmitLogin(event:Event){
		if(this.loginForm.valid){
			this.authService.login(this.loginForm.value).subscribe(res =>{
				if(res.userInfo && res.userInfo.userId){
					this.isLoggedin = true;
				}else{
					this.isLoggedin = false;
				}
			})
		}else{

			if(this.loginForm.get('password').invalid){
				this.toastr.error('Please make sure you entered a valid password')
			}
			
			if(this.loginForm.get('email').invalid){
				this.toastr.error('Please make sure you entered a valid email address')
			}
			
		}
		
		
	}

}
