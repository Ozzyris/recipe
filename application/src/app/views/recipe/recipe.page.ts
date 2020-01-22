import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Services
import { PublicApiService } from '../../services/public/public-api.service';

@Component({
	selector: 'app-recipe',
	templateUrl: './recipe.page.html',
	styleUrls: ['./recipe.page.scss'],
	providers: [PublicApiService]
})
export class RecipePage implements OnInit {
	recipe_content: any = {};

	constructor( private activatedRoute: ActivatedRoute, public publicApi_service: PublicApiService  ){}
	ngOnInit(){
		this.activatedRoute.params.subscribe( params => {			
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
