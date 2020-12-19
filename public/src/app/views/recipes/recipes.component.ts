import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

//Services
import { LoginModalService } from '../../services/login_modal/login-modal.service';
import { PublicApiService } from '../../services/public/public-api.service';

@Component({
	selector: 'app-recipes',
	templateUrl: './recipes.component.html',
	styleUrls: ['./recipes.component.scss']
})

export class RecipesComponent implements OnInit, OnDestroy {
	all_recipes: any = [];
	is_user_logged_in: boolean = false;
	search_input: string;
	is_search_active: boolean = false;
	is_user_loggin_succeded: Subscription;
	menu_active: boolean = false;
	user_details: any ={
		given_name: '',
		family_name: '',
		email: '',
		avatar: '',
	};

	constructor( public loginModal_service: LoginModalService, public publicApi_service: PublicApiService ){}
	ngOnInit(){
		this.all_recipes = this.publicApi_service.get_all_recipes();

		this.is_user_loggin_succeded = this.loginModal_service.get_login_status()
			.subscribe( is_user_loggedin => {
				this.is_user_logged_in = is_user_loggedin.status;
			});

		this.get_player_info();
		this.check_session();
	}
	ngOnDestroy(){
		this.is_user_loggin_succeded.unsubscribe();
	}

	check_session(){
		this.get_from_storage( 'user_session' )
			.then( session => {
				if(session != null){
					this.is_user_logged_in = true;
				}
			})
	}
	get_player_info(){
		this.get_from_storage( 'user_details' )
			.then( user_details => {
				if(user_details != null){
					this.user_details = JSON.parse(user_details);
				}else{
					// alert('user detail is null');
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
		this.menu_active = false;
		this.is_user_logged_in = false;
	}

	get_from_storage( key ): Promise<any>{
		return new Promise((resolve, reject)=>{
			resolve( localStorage.getItem( key ) );
		})
	}
	
}
