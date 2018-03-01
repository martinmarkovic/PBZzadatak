import  {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import {Http, Response} from '@angular/http';
import { HttpModule } from '@angular/http';
import  'rxjs/Rx';
import {AuthenService} from '../../service/index';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from "rxjs/Observable";



@Component({
  selector: 'signin',
  moduleId: module.id,
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})


export class SigninComponent implements OnInit
{
 
  result: any;
  response: any;
  data: Object = {};
  isLoggedIn : boolean = false;
  errorMessage: string;
  model: any = {};
  message : string;

  loading = false;
    constructor(private router: Router,
                private route: ActivatedRoute,
                private _http: Http,
                private authenservice: AuthenService,

                ) {}
    ngOnInit()
    {
          //  this.authenservice.logout();

    } 
  
  login() {
         this.loading = true;
         this.authenservice.login(this.model.username, this.model.password)
           .subscribe(result => this.result = console.log(result) ,            
                      err => this.errorMessage = err               
                  );                    
    }

    onLogout() {

  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("isAdmin");
  localStorage.removeItem("note");
  this.router.navigate(['/login']); 
    
}

}

