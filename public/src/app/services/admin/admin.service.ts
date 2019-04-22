import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class AdminService {
	base_url = environment.api_url + 'admin/';
	httpOptions: any;

	constructor( private http: HttpClient ){
		this.get_session_from_storage()
			.then( session => {
				if( !session ){
					// Logout
				}else{
					this.httpOptions = {
						headers: new HttpHeaders({
							'Content-Type':  'application/json',
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

	create_recipe( payload ):Observable<any>{
		let url = this.base_url + 'create-recipe';
		return this.http.put(url, payload, this.httpOptions);
	}
	update_title( payload ):Observable<any>{
		let url = this.base_url + 'update-title';
		return this.http.post(url, payload, this.httpOptions);
	}
	update_url( payload ):Observable<any>{
		let url = this.base_url + 'update-url';
		return this.http.post(url, payload, this.httpOptions);
	}
	update_summary( payload ):Observable<any>{
		let url = this.base_url + 'update-summary';
		return this.http.post(url, payload, this.httpOptions);
	}
	update_time( payload ):Observable<any>{
		let url = this.base_url + 'update-time';
		return this.http.post(url, payload, this.httpOptions);
	}
	update_yield( payload ):Observable<any>{
		let url = this.base_url + 'update-yield';
		return this.http.post(url, payload, this.httpOptions);
	}
	update_tips( payload ):Observable<any>{
		let url = this.base_url + 'update-tips';
		return this.http.post(url, payload, this.httpOptions);
	}
	add_tag( payload ):Observable<any>{
		let url = this.base_url + 'add-tag';
		return this.http.post(url, payload, this.httpOptions);
	}
	delete_tag( payload ):Observable<any>{
		let url = this.base_url + 'delete-tag';
		return this.http.post(url, payload, this.httpOptions);
	}
	add_ingredient( payload ):Observable<any>{
		let url = this.base_url + 'add-ingredient';
		return this.http.post(url, payload, this.httpOptions);
	}
	update_ingredient( payload ):Observable<any>{
		let url = this.base_url + 'update-ingredient';
		return this.http.post(url, payload, this.httpOptions);
	}
}
