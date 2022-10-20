import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { AppSharedService } from '../../../services/app-shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private adminshared:AppSharedService,
			  private authService:AuthService) { }

	ngOnInit(): void {
     }
	
	toggleAside(){
		this.adminshared.isAsideExpanded = !this.adminshared.isAsideExpanded
	}

	logOut(){
		this.authService.logout();
	}

}
