import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms/src/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {Http} from '@angular/http';
import { HttpModule } from '@angular/http';
import  'rxjs/Rx';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import {EmailValidator} from './email.validator'


@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})

export class SignupComponent implements OnInit {
  response: any;
  info = '';
  model: any = {};
  signupForm : FormGroup;
  constructor(private _route: ActivatedRoute,
              private _http: Http,
              private router: Router,
              fb : FormBuilder,
              ) { 

                 this.signupForm = fb.group( {
                  username : new FormControl('', [Validators.required, Validators.minLength(6)]),
                  password : new FormControl('', [Validators.minLength(6)]),
                  email: new FormControl('', [Validators.required, EmailValidator.isValidMailFormat, this.checkEmail.bind(this)]),
                  confirmpass: new FormControl('', [Validators.required, this.checkPassword.bind(this)])
                 
              })
              }

  ngOnInit() {}
  

result;
onSubmit(signupForm){ 

   console.log(this.signupForm)
  //  this.signupForm.reset();
   console.log(JSON.stringify(signupForm.value))
    return this._http.post('http://localhost:1337/api/signup', JSON.stringify(signupForm.value)).map(response => response.json())
                       .subscribe(result => {this.result = this.response
                         this.info = 'You are Signin now.Go to Login Page and login!!!';
                        // if we want to navigate to login page
                        this.router.navigate(['/login'])

                      });           
}

 checkPassword(control: FormControl)  {
     if(this.signupForm) {
      return control.value === this.signupForm.get('password').value ? null : { notSame: true}
    } 
}

 checkEmail(control: FormControl) {
   if (this.signupForm){
       return control.value === this.signupForm.get('email').value ? null : {IncorrectMailFormat: true }
            
         }

     }

}
