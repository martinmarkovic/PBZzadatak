import { Injectable } from '@angular/core';
import { Users } from './users';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
// import { AuthenService } from '../service/Authen.service';
import { Observable } from "rxjs/Rx";
import { User } from "app/models";
import 'rxjs/add/operator/map'
import { Router } from "@angular/router";


@Injectable()
//    private authenservice: AuthenService,

export class UserService {
    options: any;
    users: any = [];
    isAdmin: boolean;
    constructor(private http: Http,
        private router: Router) {

    }


    getUsers() {
        let headers = new Headers();
        headers.append('token', localStorage.getItem('token'));
        let options = new RequestOptions({ headers: headers });
        return this.http.get('http://localhost:1337/api/administration', options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    getUser() {
        let headers = new Headers();
        headers.append('token', localStorage.getItem('token'));
        let options = new RequestOptions({ headers: headers });
        return this.http.get("http://localhost:1337/api/user/userProfile", options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    spremanjeNote(user, note) {
        let headers = new Headers();
        headers.append('token', localStorage.getItem('token'));
        let options = new RequestOptions({ headers: headers });
        let body = { user, note }
        return this.http.post('http://localhost:1337/api/saveNote', body, options)
            .map((response: Response) => localStorage.setItem('note', response.json().note));
    }

    promjenaMaila(email) {
        let headers = new Headers();
        headers.append('token', localStorage.getItem('token'));
        let options = new RequestOptions({ headers: headers });
        let body = { email }
        console.log(localStorage.token);
        return this.http.post('http://localhost:1337/api/changeMail', body, options)
            .map((response: Response) => localStorage.setItem('email', response.json().email));
    }
}






