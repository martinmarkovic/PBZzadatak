import { Injectable, state } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {SigninComponent} from '../auth/signin/signin.component'
import {AuthenService} from '../service/Authen.service';


@Injectable() 

export class Authuserguard implements CanActivate {
    constructor(private router: Router,
                private authenservice: AuthenService,) {}
    canActivate()  {
          if(localStorage.getItem('token') && this.authenservice.isAdmin === false) {
              return true;    
          }else{
              this.router.navigate(['/login']);
              return false;
            }
         }
     }