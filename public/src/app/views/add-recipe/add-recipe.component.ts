import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

// Service
import { ValidatorService } from '../../services/validator/validator.service';
import { AdminService } from '../../services/admin/admin.service';
import { AdminUploadService } from '../../services/admin_upload/admin-upload.service';
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
		id: '',
		title: '',
		url: '',
		illustration: '',
		summary: '',
		time: 0,
		yield: '',
		tips: '',
		edit_time: 0,
		tags: [],
		ingredients: [],
		preparations: []
	};
	feedback: any = {
		title: '',
		url: '',
		illustration: '',
		summary: '',
		time: '',
		yield: '',
		tips: '',
		edit_time: '',
		tags: '',
		ingredients: '',
		preparations: ''
	}
	is_recipe_created: boolean = false;
	recipe_id: string = '';
	is_loading: boolean = false;
	tag_temporary_input: string = '';
	illustration_process: any = {
    	is_file_uploaded: false,
    	is_icon_rotating: 'icon', 
    	icon: '',
    	gauge_width: 0
  	};
	ingredient_temporary_input: any = {
		name: '',
		order: 0,
	};
	preparation_temporary_input: any = {
		step: '',
		order: 0,
	};

	constructor( private route: ActivatedRoute, private validator_service: ValidatorService, private admin_service: AdminService, private admin_upload_service: AdminUploadService, private location: Location, public publicApi_service: PublicApiService ){}
	ngOnInit(){
    	this.route.params.subscribe( params => {
			this.get_recipe( params.url )
		})
	}

	//COMMON
	get_recipe( url ){
		this.publicApi_service.get_recipe( {recipe_url: url} )
			.subscribe( recipe_detail => {
				localStorage.setItem('recipe_id', recipe_detail[0]._id);
				this.recipe.id = recipe_detail[0]._id;
				this.recipe.title = recipe_detail[0].title;
				this.recipe.url = recipe_detail[0].url;
				this.recipe.summary = recipe_detail[0].summary;
				this.recipe.time = recipe_detail[0].time;
				this.recipe.yield = recipe_detail[0].yield;
				this.recipe.tips = recipe_detail[0].tips;
				this.recipe.tags = recipe_detail[0].tags;
				this.recipe.illustration  = recipe_detail[0].illustration;
				this.recipe.edit_time  = recipe_detail[0].edit_date;
				this.ingredient_temporary_input.order = recipe_detail[0].ingredients.length;
				this.recipe.ingredients = recipe_detail[0].ingredients;
				this.preparation_temporary_input.order = recipe_detail[0].preparations.length;
				this.recipe.preparations = recipe_detail[0].preparations;
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
							this.location.go('add-recipe/' + payload.url);
						})
				})
		}else{
			this.feedback.url = '<span class="icon"></span>This field is required';
		}
	}

	prepare_file( file ): Promise<any>{
		return new Promise((resolve, reject)=>{
			const formData: FormData = new FormData();
			formData.append('illustration_file', file);
			resolve( formData );
		})
	}
	upload_illustration( event: any ){
		if( event.target.files && event.target.files[0] && event.target.files.length == 1 ){
			this.feedback.illustration = '';
			let open_door = true;
			this.illustration_process.is_file_uploaded = true;
			this.illustration_process.is_icon_rotating = 'icon rotate';
			this.illustration_process.icon = '';
			this.illustration_process.gauge_width = '1px';
	
			if( event.target.files[0].size > 2500000 ){
				open_door = false;
				this.feedback.illustration = '<span class="icon"></span>The header picture is too heavy. it must be less than 1mb';
			}else if( event.target.files[0].type != 'image/jpeg' ){
				open_door = false;
				this.feedback.illustration = '<span class="icon"></span>The header picture must be in jpg';
			}
	
			if(open_door){
				this.prepare_file( event.target.files[0] )
					.then( form => {
						this.admin_upload_service.upload_illustration( form, this.recipe.id )
							.subscribe(is_picture_updated => {
								this.illustration_process.is_file_uploaded = false;
								this.illustration_process.icon = '';
								this.illustration_process.is_icon_rotating = 'icon';
								this.recipe.illustration  = is_picture_updated.new_illustration;
							}, error => {
								this.feedback.illustration = '<span class="icon"></span>' + error;
								console.log(error);
								this.illustration_process.is_icon_rotating = 'icon';
								this.illustration_process.icon = '';
								let timer = setTimeout(() => {  
									this.illustration_process.is_file_uploaded = false;
									clearTimeout(timer);
								}, 1000);
							 
							})
				})
			}else{
				this.illustration_process.is_file_uploaded = false;
				this.illustration_process.is_icon_rotating = 'icon';
				this.illustration_process.icon = '';
			}
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
					let payload = {
						recipe_id: recipe_id,
						name: this.ingredient_temporary_input.name,
						order: this.ingredient_temporary_input.order
					}
					this.admin_service.add_ingredient( payload )
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
			this.ingredient_temporary_input.name = '';
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

	//PREPARATION
	add_preparation(){
		this.is_loading = true;
		if( this.preparation_temporary_input.step != '' && this.preparation_temporary_input.step.replace(/\s/g, '').length != 0 ){
		this.get_recipe_id_from_storage()
				.then( recipe_id => {
					let payload = {
						recipe_id: recipe_id,
						step: this.preparation_temporary_input.step,
						order: this.preparation_temporary_input.order
					}
					this.admin_service.add_preparation( payload )
						.subscribe(is_preparation_added => {
							let new_ingredient = {
								id: is_preparation_added.id,
								step: is_preparation_added.step,
								order: is_preparation_added.order
							}
							this.recipe.preparations.push( new_ingredient );
							this.is_loading = false;
							this.preparation_temporary_input.step = '';
							this.preparation_temporary_input.order = this.preparation_temporary_input.order+1;
							this.recipe.edit_time = is_preparation_added.edit_date;
						})
				})
		}else{
			this.is_loading = false;
			this.feedback.preparations = '<span class="icon"></span>This field is required';
			this.preparation_temporary_input.step = '';
		}
	}
	update_preparation( preparation, index ){
		this.is_loading = true;
		if( preparation.step != '' && preparation.step.replace(/\s/g, '').length != 0 ){
			this.get_recipe_id_from_storage()
				.then( recipe_id => {
					let payload = {
						recipe_id: recipe_id,
						preparation_id: preparation._id,
						step: preparation.step,
						order: preparation.order
					}
					this.admin_service.update_preparation( payload )
						.subscribe( is_preparation_updated => {
							this.recipe.preparations[ index ] = {
								id: payload.preparation_id,
								step: payload.step,
								order: payload.order
							}
							this.is_loading = false;
							this.recipe.edit_time = is_preparation_updated.edit_date;
						})
				})
		}else{
			this.is_loading = false;
			this.feedback.preparations = '<span class="icon"></span>This field is required';
			this.preparation_temporary_input.step = '';
		}
	}
}
