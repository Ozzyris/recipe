import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class AdminUploadService {
	base_url = environment.api_url + 'admin-upload/';
	httpOptions: any;

	constructor( private http: HttpClient ){
		this.get_session_from_storage()
			.then( session => {
				if( !session ){
					// Logout
				}else{
					this.httpOptions = {
						headers: new HttpHeaders({
							'X-Auth-Token': session
						})
					};
				}
			})
	}

	get_session_from_storage(): Promise<any>{
		return new Promise((resolve, reject)=>{
			resolve( localStorage.getItem('user_session') );
		})
	}

	upload_illustration( payload, recipe_id ):Observable<any>{ 
		let url = this.base_url + 'recipe-illustration/' + recipe_id;
		return this.http.post(url, payload, this.httpOptions);
	}
}
