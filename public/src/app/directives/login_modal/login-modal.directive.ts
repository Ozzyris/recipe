import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

//services
import { LoginModalService } from '../../services/login_modal/login-modal.service';
import { AuthService } from '../../services/auth/auth.service';
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
		password: '',
		keep_session: false
	};
	feedback: any = {
		email: '',
		password: ''
	};

	constructor( public loginModal_service: LoginModalService, private validator_service: ValidatorService, private auth_service: AuthService ){}
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
			this.auth_service.login( this.credential )
				.subscribe( login_details => {
					let user_object = {
						family_name: login_details.family_name,
						given_name: login_details.given_name,
					},
					user_details = JSON.stringify( user_object );
					localStorage.setItem('user_session', login_details.session);
					localStorage.setItem('user_details', user_details);

					//Next if user logged in
					this.loginModal_service.close_modal();
				}, err => {
					this.feedback.password = '<span class="icon""></span> ' + err.error.message;
				});
				
		}
		
	}
}
