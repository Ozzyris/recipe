import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RECIPES } from '../../../assets/json/demo_recipe';

@Component({
	selector: 'app-recipe',
	templateUrl: './recipe.component.html',
	styleUrls: ['./recipe.component.scss']
})

export class RecipeComponent implements OnInit {
	recipe_content: any;

	constructor( private route: ActivatedRoute ){}
	ngOnInit(){
		this.route.params.subscribe( params => {
			this.get_recipe_from_all_recipes( params.url )
		})
	}

	get_recipe_from_all_recipes( url ){
		let all_recipes = RECIPES;
		for (var i = all_recipes.length - 1; i >= 0; i--) {
			if( all_recipes[i].url == url){
				this.recipe_content = all_recipes[i];
				console.log(this.recipe_content);
			}
		}
	}

}
