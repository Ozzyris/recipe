import { Component, OnInit } from '@angular/core';
import { RECIPES } from '../../../assets/json/demo_recipe';

@Component({
	selector: 'app-recipes',
	templateUrl: './recipes.component.html',
	styleUrls: ['./recipes.component.scss']
})

export class RecipesComponent implements OnInit {
	all_recipes: any = RECIPES;
	search_input: string;
	is_search_active: boolean = false;

	constructor(){}
	ngOnInit(){}

	display_search(){
		if(this.search_input != ''){
			this.is_search_active = true;
		}else{
			this.is_search_active = false;
		}
	}

}
