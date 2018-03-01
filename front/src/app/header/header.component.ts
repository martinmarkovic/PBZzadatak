import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenService } from '../service/index';
import { Http } from "@angular/http";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnChanges {

  constructor(
    private router: Router,
    private http: Http,    
    private authenservice: AuthenService
  ) { }

  user = localStorage.getItem('user')
  admin = localStorage.getItem('isAdmin')
  
  ngOnChanges() {
    

  }
  getUser(){
    this.router.navigate(["user"]);
   
  }

  onLogout() {

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("note");
    this.router.navigate(['/login']);

  }

}
