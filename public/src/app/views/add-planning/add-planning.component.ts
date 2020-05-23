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
		id: '',
		content: '',
		author: '',
		date: '',
		meal: '',
		edit_time: ''
	};
	feedback: any = {
		content: '',
		author: '',
		date: '',
		meal: '',
	};
	is_loading: boolean = false;

	constructor( private route: ActivatedRoute, private planning_service: PlanningService ){}
	ngOnInit(){
		this.route.params.subscribe( params => {
			console.log( params.id);
			this.task.id = params.id;
			this.get_task( params.id );
		})
	}

	get_task( id ){
		this.task.date = moment(id.substring(0, 8), 'DDMMYYYY').format('dddd, MMMM Do YYYY');
		if(id.substring(8, 9) == 'b'){
			this.task.meal = 'Breakfast'
		}else if(id.substring(8, 9) == 'l'){
			this.task.meal = 'Lunch'
		}else if(id.substring(8, 9) == 'd'){
			this.task.meal = 'Dinner'
		}

		this.get_author();
	}

	get_author(){
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
			this.planning_service.create_task( this.task )
				.subscribe( is_task_created=> {
					this.is_loading = false;
					this.task.edit_time = is_task_created.edit_date;
				})
		}else{
			this.feedback.content = '<span class="icon"></span>This field is required';
		}
	}
}
