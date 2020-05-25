import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//external package
import * as moment from 'moment';

// Service
import { PlanningService } from '../../services/planning/planning.service';

@Component({
	selector: 'app-planning',
	templateUrl: './planning.component.html',
	styleUrls: ['./planning.component.scss']
})

export class PlanningComponent implements OnInit {
	weekdays : any = [];
	cells: any = Array(28).fill(1).map((x,i)=>i).reverse();
	tasks: any = [];
	is_user_logged_in: boolean = false;
	todays_date: any = parseInt(moment().format('d')); 

	constructor( private router: Router, private planning_service: PlanningService ){}
	ngOnInit(){
		this.check_session();
		this.get_date( moment().startOf('isoWeek') );
		this.build_placeholder_events( moment().startOf('isoWeek') );
	}

	check_session(){
		this.get_session_from_storage()
			.then( session => {
				if(session != null){
					this.is_user_logged_in = true;
				}else{
					this.router.navigate(['/recipes']);
				}
			})
	}
	get_session_from_storage(): Promise<any>{
		return new Promise((resolve, reject)=>{
			resolve( localStorage.getItem('user_session') );
		})
	}

	get_date( last_monday ){
		for (var i = 0; i < 7; i++) {
			let day,
				this_date = moment(last_monday).add(i, 'day');

			if( this_date.isSame(moment(), 'day') ){
				day = '<span class="date active">' + this_date.format('D') + '</span>'
			}else{
				day = '<span class="date">' + this_date.format('D') + '</span>'
			}
			this.weekdays.push( this_date.format('dddd') + day );
		}
	}

	build_placeholder_events( last_monday ){
		for (var i = 0; i < 7; i++) {
			let this_date = moment(last_monday).add(i, 'day');
			let task = {
				content: '<span class="icon"></span>Add a meal',
				url: this_date.format('DDMMYYYY') + 'l',
			};
			this.tasks.push( task );
		}
		for (var i = 0; i < 7; i++) {
			let this_date = moment(last_monday).add(i, 'day');
			let task = {
				content: '<span class="icon"></span>Add a meal',
				url: this_date.format('DDMMYYYY') + 'd',
			};
			this.tasks.push( task );
		}
		this.get_event(last_monday);
	}
	get_event(last_monday){

		this.planning_service.get_weekly_tasks( {first_date: last_monday, last_date: moment(last_monday).add(7, 'day')} )
			.subscribe( tasks => {
				console.log(tasks);
				for (var i = 0; i < tasks.length; i++) {
					console.log(tasks[i]);
					let isoday,
						meal_calibrator = 0;
					if( parseInt(moment(tasks[i].date).format('d')) == 0 ){ //dimanche
						isoday = 6;
					}else{
						isoday = parseInt(moment(tasks[i].date).format('d')) - 1;
					}
					if( tasks[i].meal == "Dinner" ){
						meal_calibrator = 7;
					}
					this.tasks[(isoday + meal_calibrator)] = tasks[i];
				}

			})
	}
	logout(){
		localStorage.clear();
		this.is_user_logged_in = false;
		this.router.navigate(['/recipes']);
	}
}
