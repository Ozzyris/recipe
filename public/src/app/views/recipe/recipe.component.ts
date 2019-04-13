import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Services
import { PublicApiService } from '../../services/public/public-api.service';

@Component({
	selector: 'app-recipe',
	templateUrl: './recipe.component.html',
	styleUrls: ['./recipe.component.scss'],
	providers: [PublicApiService]
})

export class RecipeComponent implements OnInit {
	recipe_content: any = {};

	constructor( private route: ActivatedRoute, public publicApi_service: PublicApiService ){}
	ngOnInit(){
		this.route.params.subscribe( params => {
			this.get_recipe( params.url )
		})
	}

	get_recipe( url ){
		this.publicApi_service.get_recipe( {recipe_url: url} )
			.subscribe( recipe_detail => {
				this.recipe_content = recipe_detail[0];
			})	
	}

}
