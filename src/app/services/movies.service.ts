import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class MoviesService {


	constructor(private http:HttpClient) {
		
	}

	getAllMovies(){
		return this.http.get(environment.SERVER_URL  + 'movies')
	}


	getAllCategoreis(){
		return this.http.get(environment.SERVER_URL  + 'category')
	}

	listByCategory(id){
		return this.http.get(environment.SERVER_URL  + 'moviesByCategory/'+id)
	}

	createMovie(body){
		return this.http.post(environment.SERVER_URL  + 'movies',body)
	}

	updateMovie(id,body){
		return this.http.post(environment.SERVER_URL  + 'movies/'+id,body)
	}

	deleteMovie(id){
		return this.http.post(environment.SERVER_URL  + 'movies/'+id,{_method:'delete'})
	}

	




} 