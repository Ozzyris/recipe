import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

//services
import { LoginModalService } from '../../services/login_modal/login-modal.service';
import { ValidatorService } from '../../services/validator/validator.service';

@Component({
	selector: 'login-modal',
	templateUrl: './login-modal.directive.html',
	styleUrls: ['./login-modal.directive.scss']
})

export class LoginModalDirective implements OnInit, OnDestroy{
	active_article: any = '';
	is_modal_active: Boolean = false;
	modal_subscription: Subscription;
	credential: any = {
		email: '',
		password: ''
	};
	feedback: any = {
		email: '',
		password: ''
	};

	constructor( public loginModal_service: LoginModalService, private validator_service: ValidatorService ){}
	ngOnInit(){
		this.modal_subscription = this.loginModal_service.get_modal_status().subscribe(
			is_modal_open => {
				this.is_modal_active = is_modal_open.status;
			});
	}
	ngOnDestroy(){
		this.modal_subscription.unsubscribe();
	}

	login(){
		let open_door = true;
		this.feedback.email = this.feedback.password = '';

		if( !this.validator_service.email_test( this.credential.email ) ){
			open_door = false;
			this.feedback.email = '<span class="icon""></span> Your email is incorrect';
		}
		if( this.credential.email == '' ){
			open_door = false;
			this.feedback.email = '<span class="icon""></span> Your email is required';
		}
		if( this.credential.password == '' ){
			open_door = false;
			this.feedback.password = '<span class="icon""></span> Your password is required';
		}

		if(open_door == true){
			console.log( this.credential, this.feedback );
		}
		
	}
}
