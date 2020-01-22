import { Component, OnInit } from '@angular/core';

//Services
import { PublicApiService } from '../../services/public/public-api.service';

@Component({
	selector: 'app-recipes',
	templateUrl: './recipes.page.html',
	styleUrls: ['./recipes.page.scss'],
})

export class RecipesPage implements OnInit {
	all_recipes: any = [];
	is_user_logged_in: boolean = false;
	is_search_active: boolean = false;
	search_input: string;

	constructor( public publicApi_service: PublicApiService ){}
	ngOnInit(){
		this.all_recipes = this.publicApi_service.get_all_recipes();
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

}
