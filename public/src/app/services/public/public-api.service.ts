import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PublicApiService {
	base_url = environment.api_url + 'public/';
	httpOptions: any;

	constructor( private http: HttpClient ){
		this.httpOptions = {
			headers: new HttpHeaders({
				'Content-Type':  'application/json'
			})
		};
	}

	get_all_recipes(){
		let url = this.base_url + 'get-all-recipes';
		return this.http.get(url, this.httpOptions);
	}

	get_recipe( payload ):Observable<any>{
		let url = this.base_url + 'get-recipe';
		return this.http.post(url, payload, this.httpOptions);
	}
}
