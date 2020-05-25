import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class PlanningService {
	base_url = environment.api_url + 'planning/';
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

	create_task( payload ):Observable<any>{
		let url = this.base_url + 'create-task';
		return this.http.put(url, payload, this.httpOptions);
	}

	update_content( payload ):Observable<any>{
		let url = this.base_url + 'update-content';
		return this.http.post(url, payload, this.httpOptions);
	}

	get_task( payload ):Observable<any>{
		let url = this.base_url + 'get-task';
		return this.http.post(url, payload, this.httpOptions);
	}

	get_weekly_tasks( payload ):Observable<any>{
		let url = this.base_url + 'get-weekly-tasks';
		return this.http.post(url, payload, this.httpOptions);
	}
}
