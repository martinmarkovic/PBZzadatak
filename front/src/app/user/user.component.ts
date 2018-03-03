import { Component, OnInit } from '@angular/core';
import { UserService } from "app/service/users.service";
import { User } from "app/models";
import { FormBuilder, Validators, FormGroup} from "@angular/forms";
import { Http } from "@angular/http/http";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
user: User;
rForm : FormGroup;
email=localStorage.email;
  constructor(private _userservice: UserService,
              private fb: FormBuilder){
  if(this.user){this.rForm = fb.group({
    'username':[localStorage.username],
    'email':[this.user.email]
  }) }else{
    this.rForm = fb.group({
    'username':[null],
    'email':[null]
  })
  }
   
}

  ngOnInit() {
    //ovo loada email
    this._userservice.getUser()
    .subscribe(result=>{
      this.user = result
      console.log(this.user)})
        // if(this.user){
        // localStorage.setItem('user', this.user.username)
        // } 
  //  })
  //ovo loada usera iz localstorage
  
 
  console.log(this.user.email);
  console.log(this.user.username); //ovo ispise smo username
    
  }
  editUser(form){
    return this._userservice.editUser(form).subscribe(res =>{console.log('User has been edited')})
    
  }
  
 
}
