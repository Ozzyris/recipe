import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class auth_service {
	private base_url = environment.api_url + 'auth/';
	httpOptions: any;

	constructor( private http: HttpClient ){
		this.httpOptions = {
			headers: new HttpHeaders({
				'Content-Type':  'application/json'
			})
		};
	}

	// SIGN IN
	login( payload ): Observable<any>{
		let url = this.base_url + 'signin';
		return this.http.post(url, payload, this.httpOptions);
	}
}
