import { Component, OnInit } from '@angular/core';

//Services
import { LoginModalService } from '../../services/login_modal/login-modal.service';
import { PublicApiService } from '../../services/public/public-api.service';

@Component({
	selector: 'app-recipes',
	templateUrl: './recipes.component.html',
	styleUrls: ['./recipes.component.scss']
})

export class RecipesComponent implements OnInit {
	all_recipes: any = [];
	is_user_logged_in: boolean = false;
	search_input: string;
	is_search_active: boolean = false;
	is_modal_actice: boolean = true;

	constructor( public loginModal_service: LoginModalService, public publicApi_service: PublicApiService ){}
	ngOnInit(){
		this.all_recipes = this.publicApi_service.get_all_recipes();
		this.check_session();
	}

	check_session(){
		this.get_session_from_storage()
			.then( session => {
				if(session != null){
					this.is_user_logged_in = true;
				}
			})
	}
	display_search(){
		if(this.search_input != ''){
			this.is_search_active = true;
		}else{
			this.is_search_active = false;
		}
	}
	logout(){
		localStorage.clear();
		this.is_user_logged_in = false;
	}
	get_session_from_storage(): Promise<any>{
		return new Promise((resolve, reject)=>{
			resolve( localStorage.getItem('user_session') );
		})
	}
	
}
