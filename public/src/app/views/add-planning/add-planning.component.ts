import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//external package
import * as moment from 'moment';

// Service
import { PlanningService } from '../../services/planning/planning.service';

@Component({
	selector: 'app-add-planning',
	templateUrl: './add-planning.component.html',
	styleUrls: ['./add-planning.component.scss']
})

export class AddPlanningComponent implements OnInit {
	task: any = {
		author: '',
		content: '',
		date: '',
		edit_date: '',
		meal: '',
		url: '',
	};
	feedback: any = {
		content: '',
		author: '',
		date: '',
		meal: '',
	};
	is_loading: boolean = false;
	is_task_created: boolean = false;

	constructor( private route: ActivatedRoute, private planning_service: PlanningService ){}
	ngOnInit(){
		this.route.params.subscribe( params => {
			console.log( params.url);
			this.task.url = params.url;
			this.get_task( params.url );
		})
	}

	get_task( url ){
		this.planning_service.get_task( {task_url: url} )
			.subscribe( task_detail => {

				if(task_detail == null){
					this.task.date = moment(url.substring(0, 8), 'DDMMYYYY').format('DDMMYYYY');//
					if(url.substring(8, 9) == 'b'){
						this.task.meal = 'Breakfast'
					}else if(url.substring(8, 9) == 'l'){
						this.task.meal = 'Lunch'
					}else if(url.substring(8, 9) == 'd'){
						this.task.meal = 'Dinner'
					}
					this.get_author_from_storage();
				}else{
					console.log(task_detail);
					this.task.author = task_detail.author;
					this.task.content = task_detail.content;
					this.task.date = task_detail.date;
					this.task.edit_date = task_detail.edit_date;
					this.task.meal = task_detail.meal;
					this.task.url = task_detail.url;
				}
			})	
	}

	get_author_from_storage(){
		this.get_user_details_from_storage()
			.then( user_details => {
				let json = JSON.parse(user_details);
				this.task.author = json.given_name;
			})
	}

	get_user_details_from_storage(): Promise<any>{
		return new Promise((resolve, reject)=>{
			resolve( localStorage.getItem('user_details') );
		})
	}

	create_task(){
		if( this.task.content != '' ){
			this.feedback.content = '';
			this.is_loading = true;
			if( this.task.edit_date == '' ){ // new task
				if( this.is_task_created == false ){
					console.log(this.task);
					this.planning_service.create_task( this.task )
						.subscribe( is_task_created=> {
							this.is_loading = false;
							this.task.edit_date = is_task_created.edit_date;
						})
						this.is_task_created = true;
				}
			}else{ // update task
				let payload = {
					content: this.task.content,
					task_url: this.task.url
				}
				this.planning_service.update_content( payload )
					.subscribe( is_content_updated => {
						this.is_loading = false;
						this.task.edit_date = is_content_updated.edit_date;
					})
			}
		}else{
			this.feedback.content = '<span class="icon"></span>This field is required';
		}
	}
}
