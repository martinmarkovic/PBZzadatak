import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {UserService} from '../service/users.service';
import 'rxjs/add/operator/toPromise';
import {Injectable} from '@angular/core';
import {Users} from '../service/users';
import {Http} from '@angular/http';
import { User } from "app/models";



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  isLoggedIn: boolean = true;
  response: any;
   user:any;
   users: User[] = [];
   isAdmin : boolean = false;

  constructor(private router: Router,
                private route: ActivatedRoute,
                private http: Http,
                private userservice: UserService) {

  }

  ngOnInit() {
    this.user = localStorage.getItem('user');
    console.log(localStorage.token)
    console.log(localStorage.note)
  }

  OnLogout() {
    localStorage.removeItem('user');
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("note");
    this.router.navigate(['']); 
    this.isLoggedIn = false;  
  }

    getUsers()
      {
         this.userservice.getUsers()
          .subscribe(users => {
             this.users = users
             console.log(this.users)
             
           });
      }
}
