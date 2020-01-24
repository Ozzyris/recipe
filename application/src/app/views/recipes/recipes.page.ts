import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

//Ionic plugin
import { Network } from '@ionic-native/network/ngx';

//Services
import { LoginModalService } from '../../services/login_modal/login-modal.service';
import { PublicApiService } from '../../services/public/public-api.service';

@Component({
	selector: 'app-recipes',
	templateUrl: './recipes.page.html',
	styleUrls: ['./recipes.page.scss']
})

export class RecipesPage implements OnInit, OnDestroy {
	all_recipes: any = [];
	is_user_logged_in: boolean = false;
	search_input: string;
	is_search_active: boolean = false;
	is_modal_actice: boolean = true;
	is_user_loggin_succeded: Subscription;
	no_internet_message: boolean = false;

	constructor( public loginModal_service: LoginModalService, public publicApi_service: PublicApiService, private network: Network ){}
	ngOnInit(){
		this.all_recipes = this.publicApi_service.get_all_recipes();
		// this.check_session();

		//watch for internet connection
		this.check_internet();

		this.is_user_loggin_succeded = this.loginModal_service.get_login_status().subscribe(
			is_user_loggedin => {
				this.is_user_logged_in = is_user_loggedin.status;
			});
	}
	ngOnDestroy(){
		this.is_user_loggin_succeded.unsubscribe();

	}

	check_internet(){
		this.network.onDisconnect().subscribe(() => {
			this.no_internet_message = true;
		});

		this.network.onConnect().subscribe(() => {
  			this.no_internet_message = false;
		});
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
		// localStorage.clear();
		// this.is_user_logged_in = false;
	}
	get_session_from_storage(): Promise<any>{
		return new Promise((resolve, reject)=>{
			resolve( localStorage.getItem('user_session') );
		})
	}
}
