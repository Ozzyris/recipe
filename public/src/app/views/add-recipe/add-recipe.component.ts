import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

// Service
import { ValidatorService } from '../../services/validator/validator.service';
import { AdminService } from '../../services/admin/admin.service';
import { PublicApiService } from '../../services/public/public-api.service';


//Interface
import { recipe_interface } from '../../interfaces/recipe';

@Component({
	selector: 'app-add-recipe',
	templateUrl: './add-recipe.component.html',
	styleUrls: ['./add-recipe.component.scss']
})

export class AddRecipeComponent implements OnInit {
	recipe: recipe_interface = {
		title: '',
		url: '',
		summary: '',
		time: 0,
		yield: '',
		tips: '',
		edit_time: 0,
		tags: [],
		ingredients: [],
		preparation:[]
	};
	feedback: any = {
		title: '',
		url: '',
		summary: '',
		time: '',
		yield: '',
		tips: '',
		edit_time: '',
		tags: '',
		ingredients: ''
	}
	is_recipe_created: boolean = false;
	recipe_id: string = '';
	is_loading: boolean = false;
	tag_temporary_input: string = '';
	ingredient_temporary_input: any = {
		name: '',
		order: 0,
	};

	constructor( private route: ActivatedRoute, private validator_service: ValidatorService, private admin_service: AdminService, private location: Location, public publicApi_service: PublicApiService ){}
	ngOnInit(){
		this.route.queryParams.subscribe(params => {
        	this.get_recipe( params['url'] )
    	});
	}

	//COMMON
	get_recipe( url ){
		this.publicApi_service.get_recipe( {recipe_url: url} )
			.subscribe( recipe_detail => {
				this.recipe.title = recipe_detail[0].title;
				this.recipe.url = recipe_detail[0].url;
				this.recipe.summary = recipe_detail[0].summary;
				this.recipe.time = recipe_detail[0].time;
				this.recipe.yield = recipe_detail[0].yield;
				this.recipe.tips = recipe_detail[0].tips;
				this.recipe.tags = recipe_detail[0].tags;
				this.ingredient_temporary_input.order = recipe_detail[0].ingredients.length;
				this.recipe.ingredients = recipe_detail[0].ingredients;
			})	
	}

	get_recipe_id_from_storage(): Promise<any>{
		return new Promise((resolve, reject)=>{
			resolve( localStorage.getItem('recipe_id') );
		})
	}
	autogrow( id ){
		let textArea = document.getElementById(id)       
		textArea.style.overflow = 'hidden';
		textArea.style.height = '0px';
		textArea.style.height = textArea.scrollHeight + 'px';
	}

	update_title(){
		if( this.recipe.title != '' ){
			this.feedback.title = '';
			this.is_loading = true;
			//create new recipe
			if( this.is_recipe_created == false ){
				let payload = {
					title: this.recipe.title
				}
				this.admin_service.create_recipe( payload )
					.subscribe( is_recipe_saved => {
						localStorage.setItem('recipe_id', is_recipe_saved.recipe_id);
						this.recipe.url = this.validator_service.generate_url( this.recipe.title );
						this.update_url();
					})
				this.is_recipe_created = true;

			//Update title
			}else{
				let payload = {
					title: this.recipe.title,
					recipe_id: this.recipe_id
				}
				this.admin_service.update_title( payload )
					.subscribe( is_recipe_saved => {
						this.is_loading = false;
						this.recipe.edit_time = is_recipe_saved.edit_date;
					})
			}
		}else{
			this.feedback.title = '<span class="icon"></span>This field is required';
		}
	}
	update_url(){
		if( this.recipe.url != '' ){
			this.feedback.url = '';
			this.is_loading = true;
			this.get_recipe_id_from_storage()
				.then( recipe_id => {
					let payload = {
						url: this.recipe.url,
						recipe_id: recipe_id
					}
					
					this.admin_service.update_url( payload )
						.subscribe( is_url_updated=> {
							this.is_loading = false;
							this.recipe.edit_time = is_url_updated.edit_date;
							this.location.go('add-recipe?url=' + payload.url);
						})
				})
		}else{
			this.feedback.url = '<span class="icon"></span>This field is required';
		}
	}
	update_summary(){
		if( this.recipe.summary != '' ){
			this.feedback.summary = '';
			this.is_loading = true;
			this.get_recipe_id_from_storage()
				.then( recipe_id => {
					let payload = {
						summary: this.recipe.summary,
						recipe_id: recipe_id
					}
					
					this.admin_service.update_summary( payload )
						.subscribe( is_introduction_updated=> {
							this.is_loading = false;
							this.recipe.edit_time = is_introduction_updated.edit_date;
						})
				})
		}else{
			this.feedback.summary = '<span class="icon"></span>This field is required';
		}
	}
	update_time(){
		if( this.recipe.time != null ){
			this.feedback.time = '';
			this.is_loading = true;
			this.get_recipe_id_from_storage()
				.then( recipe_id => {
					let payload = {
						time: this.recipe.time,
						recipe_id: recipe_id
					}
					
					this.admin_service.update_time( payload )
						.subscribe( is_time_updated=> {
							this.is_loading = false;
							this.recipe.edit_time = is_time_updated.edit_date;
						})
				})
		}else{
			this.feedback.time = '<span class="icon"></span>This field is required';
		}
	}
	update_yield(){
		if( this.recipe.yield != '' ){
			this.feedback.yield = '';
			this.is_loading = true;
			this.get_recipe_id_from_storage()
				.then( recipe_id => {
					let payload = {
						yield: this.recipe.yield,
						recipe_id: recipe_id
					}
					
					this.admin_service.update_yield( payload )
						.subscribe( is_yield_updated=> {
							this.is_loading = false;
							this.recipe.edit_time = is_yield_updated.edit_date;
						})
				})
		}else{
			this.feedback.yield = '<span class="icon"></span>This field is required';
		}
	}
	update_tips(){
		if( this.recipe.tips != '' ){
			this.feedback.tips = '';
			this.is_loading = true;
			this.get_recipe_id_from_storage()
				.then( recipe_id => {
					let payload = {
						tips: this.recipe.tips,
						recipe_id: recipe_id
					}
					
					this.admin_service.update_tips( payload )
						.subscribe( is_tips_updated=> {
							this.is_loading = false;
							this.recipe.edit_time = is_tips_updated.edit_date;
						})
				})
		}else{
			this.feedback.tips = '<span class="icon"></span>This field is required';
		}
	}

	//TAGS
	delete_tag( index ){
		this.is_loading = true;
		let tag_to_delete = this.recipe.tags[index];
		console.log(tag_to_delete);
		this.recipe.tags.splice(index, 1);
		this.get_recipe_id_from_storage()
				.then( recipe_id => {
					this.admin_service.delete_tag( {recipe_id: recipe_id, tag: tag_to_delete} )
						.subscribe(is_tag_deleted => {
							this.is_loading = false;
							this.recipe.edit_time = is_tag_deleted.edit_date;
						})
				})
	}
	add_tag(){
		this.is_loading = true;
		if( this.tag_temporary_input != '' && this.tag_temporary_input.replace(/\s/g, '').length != 0 ){
    		this.recipe.tags.push(this.tag_temporary_input);
    		this.get_recipe_id_from_storage()
				.then( recipe_id => {
					this.admin_service.add_tag( {recipe_id: recipe_id, tag: this.tag_temporary_input} )
						.subscribe(is_tag_added => {
							this.is_loading = false;
							this.tag_temporary_input = '';
							this.recipe.edit_time = is_tag_added.edit_date;
						})
				})
		}else{
			this.is_loading = false;
			this.feedback.tags = '<span class="icon"></span>This field is required';
			this.tag_temporary_input = '';
		}

	}

	//INGREDIENTS
	add_ingredient(){
		this.is_loading = true;
		if( this.ingredient_temporary_input.name != '' && this.ingredient_temporary_input.name.replace(/\s/g, '').length != 0 ){
			this.get_recipe_id_from_storage()
				.then( recipe_id => {
					this.admin_service.add_ingredient( {recipe_id: recipe_id, name: this.ingredient_temporary_input.name, order: this.ingredient_temporary_input.order} )
						.subscribe(is_ingredient_added => {
							let new_ingredient = {
								id: is_ingredient_added.id,
								name: is_ingredient_added.name,
								order: is_ingredient_added.order
							}
							this.recipe.ingredients.push( new_ingredient );
							this.is_loading = false;
							this.ingredient_temporary_input.name = '';
							this.ingredient_temporary_input.order = this.ingredient_temporary_input.order+1;
							this.recipe.edit_time = is_ingredient_added.edit_date;
						})
				})
		}else{
			this.is_loading = false;
			this.feedback.ingredients = '<span class="icon"></span>This field is required';
			this.ingredient_temporary_input = '';
		}
	}
	update_ingredient( ingredient, index ){
		this.is_loading = true;
		if( ingredient.name != '' && ingredient.name.replace(/\s/g, '').length != 0 ){
			this.get_recipe_id_from_storage()
				.then( recipe_id => {
					let payload = {
						recipe_id: recipe_id,
						ingredient_id: ingredient._id,
						name: ingredient.name,
						order: ingredient.order
					}
					this.admin_service.update_ingredient( payload )
						.subscribe( is_ingredient_updated => {
							this.recipe.ingredients[ index ] = {
								id: payload.ingredient_id,
								name: payload.name,
								order: payload.order
							}
							this.is_loading = false;
							this.recipe.edit_time = is_ingredient_updated.edit_date;
						})
				})
		}else{
			this.is_loading = false;
			this.feedback.ingredients = '<span class="icon"></span>This field is required';
			this.ingredient_temporary_input = '';
		}
	}
	delete_ingredient( ingredient, index ){
		this.is_loading = true;
		this.get_recipe_id_from_storage()
				.then( recipe_id => {
					let payload = {
						recipe_id: recipe_id,
						ingredient_id: ingredient._id,
						name: ingredient.name,
						order: ingredient.order
					}
					this.admin_service.delete_ingredient( payload )
						.subscribe( is_ingredient_deleted => {
							this.recipe.ingredients.splice( index, 1 );
							this.is_loading = false;
							this.recipe.edit_time = is_ingredient_deleted.edit_date;
						})
				})
	}

}
