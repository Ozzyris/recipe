import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class LoginModalService {
    private $is_modal_open = new Subject<any>();
    private $is_user_loggedin = new Subject<any>();

	constructor(){}

    //opening observable
    open_modal(){
        console.log('alex');
        this.$is_modal_open.next({status: true});
    }
    close_modal(){
        this.$is_modal_open.next({status: false});
    }
    get_modal_status(): Observable<any> {
        console.log('alex2');
        return this.$is_modal_open;
    }

    //Loggedin observable
    loggedin_user(){
        this.$is_user_loggedin.next({status: true});
    }
    get_login_status(): Observable<any> {
        return this.$is_user_loggedin;
    }

}