import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isLoggedin: boolean = false;
  registerForm:UntypedFormGroup

  constructor(private authService:AuthService,
	private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initRegister()
  }

  initRegister(){
		this.registerForm = new UntypedFormGroup({
			'name': new UntypedFormControl(null,[Validators.required]),
			'email': new UntypedFormControl(null,[Validators.required,Validators.email]),
			'password': new UntypedFormControl(null,[Validators.required])
		})
	}

  onSubmitRegister(event:Event){
		if(this.registerForm.valid){
			this.authService.register(this.registerForm.value).subscribe(res =>{
				if(res.userInfo && res.userInfo.userId){
					this.isLoggedin = true;
				}else{
					this.isLoggedin = false;
				}
			})
		}else{
			if(this.registerForm.get('name').invalid){
				this.toastr.error('Please make sure you entered your name')
			}
			
			if(this.registerForm.get('password').invalid){
				this.toastr.error('Please make sure you entered a valid password')
			}

			
			
			if(this.registerForm.get('email').invalid){
				this.toastr.error('Please make sure you entered a valid email address')
			}
			
		}
		
		
	}

}
