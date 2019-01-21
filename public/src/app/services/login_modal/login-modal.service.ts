import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class LoginModalService {
    private $is_modal_open = new Subject<any>();

	constructor(){}

    open_modal(){
        this.$is_modal_open.next({status: true});
    }
    close_modal(){
        this.$is_modal_open.next({status: false});
    }
    get_modal_status(): Observable<any> {
        return this.$is_modal_open;
    }
}