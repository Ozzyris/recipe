import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//EXTERNAL PACKAGE
import * as moment from 'moment';


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

	constructor( private router: Router ){}
	ngOnInit(){
		this.check_session();
		this.get_date( moment().startOf('isoWeek') );
		this.get_events( moment().startOf('isoWeek') );
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

	get_events( last_monday ){
		for (var i = 0; i < 7; i++) {
			let this_date = moment(last_monday).add(i, 'day');
			let task = {
				content: '<span class="icon"></span>Add a meal',
				id: this_date.format('DDMMYYYY') + 'l',
				author: 'alexandre',
				creation_date: '',
				last_edit: '',
			};
			this.tasks.push( task );
		}
		for (var i = 0; i < 7; i++) {
			let this_date = moment(last_monday).add(i, 'day');
			let task = {
				content: '<span class="icon"></span>Add a meal',
				id: this_date.format('DDMMYYYY') + 'd',
				author: 'alexandre',
				creation_date: '',
				last_edit: '',
			};
			this.tasks.push( task );
		}
	}
	logout(){
		localStorage.clear();
		this.is_user_logged_in = false;
		this.router.navigate(['/recipes']);
	}
}
