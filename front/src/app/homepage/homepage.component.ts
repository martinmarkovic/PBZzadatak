import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Http } from "@angular/http";
import { UserService } from "app/service/users.service";
import {AuthenService} from '../service/index';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private _router: Router,
              private _http: Http,
              private userservice: UserService,
              private authenservice: AuthenService) { }
  user:any;
  note = localStorage.note;
  result:any;
  response:any;
  
  
  ngOnInit() {
    this.user = localStorage.getItem("user");
    console.log("NOTE KORISNIKA: " + this.note)
    
  }
  
  onLogout() {

  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("isAdmin");
  localStorage.removeItem("note");
  this._router.navigate(['/login']); 
    
}

  getUser(){
    this._router.navigate(["user"]);
   
  } 
  handleSpremanjeNote(event){
    console.log (event);
    this.note=event;
    // localStorage.setItem('note', (this.note));

    this.userservice.spremanjeNote(this.user, this.note)                   
        .subscribe(result => this.result = console.log(result)) 
    
  }

}
