import { Component, OnInit } from '@angular/core';
import { RECIPES } from '../../../assets/json/demo_recipe';

@Component({
	selector: 'app-recipes',
	templateUrl: './recipes.page.html',
	styleUrls: ['./recipes.page.scss'],
})

export class RecipesPage implements OnInit {
	all_recipes: any = RECIPES;
	is_user_logged_in: boolean = false;
	is_search_active: boolean = false;

	constructor(){}
	ngOnInit(){}

	logout(){
		// localStorage.clear();
		// this.is_user_logged_in = false;
	}

}
