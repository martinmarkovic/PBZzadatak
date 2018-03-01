import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from "@angular/router";

@Injectable()
export class AuthenService {
    public token: string;
    isAdmin: boolean;
    note: string;
    errorinfo: any;
    user = { isAdmin: true };
    res_body: string;
    constructor(private http: Http,
        private router: Router) {
        // set token if saved in local storage      
    }


    login(username, password) {
        return this.http.post('http://localhost:1337/api/login', { username, password })
            .map((response: Response) => {
                if (response.json().token && response.json().isAdmin === true) {
                    localStorage.setItem('token', (response.json().token));
                    localStorage.setItem('user', (response.json().username));
                    localStorage.setItem('note', (response.json().note));
                    this.isAdmin = response.json().isAdmin
                    this.note = response.json().note
                    this.router.navigate(['/admin'])
                }

                else if (response.json().token && response.json().isAdmin === false) {

                    localStorage.setItem('token', (response.json().token))
                    localStorage.setItem('user', (response.json().username))
                    this.isAdmin = response.json().isAdmin
                    localStorage.setItem('note', (response.json().note));
                    this.router.navigate(['']);


                }


                else {
                    this.router.navigate(['/login'])


                }
            })

            .catch((err: Response) => {
                // console.log(err.text())
                return Observable.throw(err.text())

            });
    }

    logout(): void {
        localStorage.removeItem("user");
        localStorage.removeItem("token");

    }

    onLogout() {

        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("note");
        this.router.navigate(['/login']);
    }
}