import { Component, OnInit } from '@angular/core';
import { RECIPES } from '../../../assets/json/demo_recipe';

//Services
import { LoginModalService } from '../../services/login_modal/login-modal.service';

@Component({
	selector: 'app-recipes',
	templateUrl: './recipes.component.html',
	styleUrls: ['./recipes.component.scss']
})

export class RecipesComponent implements OnInit {
	all_recipes: any = RECIPES;
	search_input: string;
	is_search_active: boolean = false;
	is_modal_actice: boolean = true;

	constructor( private loginModal_service: LoginModalService ){}
	ngOnInit(){}

	display_search(){
		if(this.search_input != ''){
			this.is_search_active = true;
		}else{
			this.is_search_active = false;
		}
	}

}
