import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppSharedService } from '../../../services/app-shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  appShortenName:string = environment.appName[0] + environment.appName[1]

	appName:string =  environment.appName;

	constructor(private adminshared:AppSharedService) { }

	ngOnInit(): void {

    }

	isExpanded(){
		return this.adminshared.isAsideExpanded
	}

}
