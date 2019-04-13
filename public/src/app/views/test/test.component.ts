import { Component, OnInit } from '@angular/core';
import { RECIPES } from '../../../assets/json/demo_recipe';

//Services
import { LoginModalService } from '../../services/login_modal/login-modal.service';
import { PublicApiService } from '../../services/public/public-api.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})

export class TestComponent implements OnInit {
	all_recipes: any = [];
	search_input: string;
	is_search_active: boolean = false;
	is_modal_actice: boolean = true;

	constructor( public loginModal_service: LoginModalService, public publicApi_service: PublicApiService ){}
	ngOnInit(){
		// this.all_recipes = this.publicApi_service.get_all_recipes();
		this.all_recipes = this.publicApi_service.get_recipe( {recipe_url: 'pasta-with-fresh-herbs'} );
	}

	display_search(){
		if(this.search_input != ''){
			this.is_search_active = true;
		}else{
			this.is_search_active = false;
		}
	}
}
