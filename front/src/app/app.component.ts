import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { FilterPipe} from './filter.pipe';


@Component({
  selector: 'app-root',
  moduleId: module.id,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
 
})
export class AppComponent implements OnInit {
  state: string  = 'small'
  authService: any;
  signupForm : FormGroup;
  
  
  
  ngOnInit() {}


  
}


