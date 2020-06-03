import { HostListener, Component, OnInit } from '@angular/core';
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
	is_user_logged_in: boolean = false;
	weeks_number: any = moment().format('W');
	nb_of_day_to_display: any;
	weekdays : any = [];
	current_displayed_date: any;
	menu_active: boolean = false;

	constructor( private router: Router, private planning_service: PlanningService ){}
	ngOnInit(){
		this.check_session();
		const width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		this.check_screen_type( width );
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

	check_screen_type( width ){
		let first_date, last_date;

		if( width < 768 ){
			this.nb_of_day_to_display = 1;
			first_date = moment().hours(2).minutes(0).seconds(0);
			last_date = moment(first_date).add(1, 'day');
		}else if( width > 768 && width < 992 ){
			this.nb_of_day_to_display = 4;
			first_date = moment().hours(2).minutes(0).seconds(0);
			last_date = moment(first_date).add(4, 'day');
		}else{
			this.nb_of_day_to_display = 7;
			first_date = moment().startOf('isoWeek').hours(2);
			last_date = moment(first_date).add(7, 'day');
		}

		this.build_day( moment() );
		this.get_tasks( first_date, last_date );
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.check_screen_type( event.target.innerWidth );
	}

	get_tasks( first_date, last_date ){
		console.log(first_date, last_date);
		this.planning_service.get_tasks( {first_date: first_date, last_date: last_date} )
			.subscribe( tasks => {
				console.log( tasks );
				this.insert_task( tasks );
			})
	}

	build_day( today ){
		this.weekdays = [];

		switch( this.nb_of_day_to_display ){
			case 1:
				this.current_displayed_date = moment(today).hours(2).minutes(0).seconds(0);
				let this_date = moment(today),
					day = {
					date: {
						moment: this_date,
						weekday: this_date.format('dddd'),
						day: this_date.format('D'),
						class: ''
					},
					breakfast: {},
					lunch: {},
					dinner: {}
				}
				if( this_date.isSame(moment(), 'day') ){
					day.date.class = 'active';
				}
				this.weekdays.push( day );
				this.weeks_number = this_date.format('W');
				break;
			case 4:
				this.current_displayed_date = moment(today).hours(2).minutes(0).seconds(0);

				for (var i = 0; i < 4; i++) {
					let this_date = moment(today).add(i, 'day'),
						day = {
							date: {
								moment: this_date,
								weekday: this_date.format('dddd'),
								day: this_date.format('D'),
								class: '',
							},
							breakfast: {},
							lunch: {},
							dinner: {}
						};
					if( this_date.isSame(moment(), 'day') ){
						day.date.class = 'active';
					}
					this.weeks_number = this_date.format('W');
					this.weekdays.push( day );
				}
				break;
			case 7:
				this.current_displayed_date = moment(today).startOf('isoWeek').hours(2);

				for (var i = 0; i < 7; i++) {
					let this_date = moment( moment(today).startOf('isoWeek') ).add(i, 'day'),
						day = {
							date: {
								moment: this_date,
								weekday: this_date.format('dddd'),
								day: this_date.format('D'),
								class: '',
							},
							breakfast: {},
							lunch: {},
							dinner: {}
						};
					if( this_date.isSame(moment(), 'day') ){
						day.date.class = 'active';
					}
					this.weeks_number = this_date.format('W');
					this.weekdays.push( day );
				}
				break;
			default:
				break;
		}
	}
	update_date( action ){
		switch( this.nb_of_day_to_display ){
			case 1:
				if( action == 'next' ){
					this.build_day( moment( this.current_displayed_date ).add(1, 'day') );
					this.get_tasks( moment( this.current_displayed_date ), moment( this.current_displayed_date ).add(1, 'day') );
				}
				if( action == 'back' ){
					this.build_day( moment( this.current_displayed_date ).subtract(1, 'day') );
					this.get_tasks( moment( this.current_displayed_date ), moment( this.current_displayed_date ).add(1, 'day') );
				}
				break;
			case 4:
				if( action == 'next' ){
					this.build_day( moment( this.current_displayed_date ).add(4, 'day') );
					this.get_tasks( moment( this.current_displayed_date ), moment( this.current_displayed_date ).add(4, 'day') );
				}
				if( action == 'back' ){
					this.build_day( moment( this.current_displayed_date ).subtract(4, 'day') );
					this.get_tasks( moment( this.current_displayed_date ), moment( this.current_displayed_date ).add(4, 'day') );
				}
				break;
			case 7:
				if( action == 'next' ){
					this.build_day( moment( this.current_displayed_date ).add(7, 'day') );
					this.get_tasks( moment( this.current_displayed_date ), moment( this.current_displayed_date ).add(7, 'day') );
				}
				if( action == 'back' ){
					this.build_day( moment( this.current_displayed_date ).subtract(7, 'day') );
					this.get_tasks( moment( this.current_displayed_date ), moment( this.current_displayed_date ).add(7, 'day') );

				}
				break;
			default:
				break;
		}
	}

	insert_task( tasks ){
		for (var i = tasks.length - 1; i >= 0; i--){
			for (var j = this.weekdays.length - 1; j >= 0; j--) {
				if( moment(tasks[i].date).isSame(this.weekdays[j].date.moment, 'day') ){
					this.weekdays[j][tasks[i].meal] = tasks[i];

				}
			}
		}
		this.add_placeholder_task();
	}

	add_placeholder_task(){
		console.log(this.weekdays.length);
		for (var i = this.weekdays.length - 1; i >= 0; i--) {
			if( !this.weekdays[i].lunch.content ){
				let task = {
					content: '<span class="icon"></span>Add a meal',
					url: this.weekdays[i].date.moment.format('DDMMYYYY') + 'l',
				}
				this.weekdays[i].lunch = task;
			}
			if( !this.weekdays[i].dinner.content ){
				let task = {
					content: '<span class="icon"></span>Add a meal',
					url: this.weekdays[i].date.moment.format('DDMMYYYY') + 'd',
				}
				this.weekdays[i].dinner = task;
			}
		}
	}
	// get_date( last_monday ){
	// 	for (var i = 0; i < 7; i++) {
	// 		let day,
	// 			this_date = moment(last_monday).add(i, 'day');

	// 		if( this_date.isSame(moment(), 'day') ){
	// 			day = '<span class="date active">' + this_date.format('D') + '</span>'
	// 		}else{
	// 			day = '<span class="date">' + this_date.format('D') + '</span>'
	// 		}
	// 		this.weekdays.push( this_date.format('dddd') + day );
	// 	}
	// }

	// build_placeholder_events( last_monday ){
	// 	for (var i = 0; i < 7; i++) {
	// 		let this_date = moment(last_monday).add(i, 'day');
	// 		let task = {
	// 			content: '<span class="icon"></span>Add a meal',
	// 			url: this_date.format('DDMMYYYY') + 'l',
	// 		};
	// 		this.tasks.push( task );
	// 	}
	// 	for (var i = 0; i < 7; i++) {
	// 		let this_date = moment(last_monday).add(i, 'day');
	// 		let task = {
	// 			content: '<span class="icon"></span>Add a meal',
	// 			url: this_date.format('DDMMYYYY') + 'd',
	// 		};
	// 		this.tasks.push( task );
	// 	}
	// 	this.get_event(last_monday);
	// }

	// get_event(last_monday){
	// 	this.planning_service.get_weekly_tasks( {first_date: last_monday, last_date: moment(last_monday).add(7, 'day')} )
	// 		.subscribe( tasks => {
	// 			console.log(tasks);
	// 			for (var i = 0; i < tasks.length; i++) {
	// 				console.log(tasks[i]);
	// 				let isoday,
	// 					meal_calibrator = 0;
	// 				if( parseInt(moment(tasks[i].date).format('d')) == 0 ){ //dimanche
	// 					isoday = 6;
	// 				}else{
	// 					isoday = parseInt(moment(tasks[i].date).format('d')) - 1;
	// 				}
	// 				if( tasks[i].meal == "Dinner" ){
	// 					meal_calibrator = 7;
	// 				}
	// 				this.tasks[(isoday + meal_calibrator)] = tasks[i];
	// 			}

	// 		})
	// }

	logout(){
		localStorage.clear();
		this.is_user_logged_in = false;
		this.router.navigate(['/recipes']);
	}
}
