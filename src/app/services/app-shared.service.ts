import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class AppSharedService {

    isAsideExpanded:boolean = true;

	appShortenName:string =  environment.appName[0] + environment.appName[1];

	appName:string =  environment.appName;


	constructor(private http:HttpClient) {
		
	}




} 