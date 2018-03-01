import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {Routes, RouterModule} from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import {Http} from '@angular/http';
import { AuthGuard } from './guards/auth.guard';
import { AuthenService } from "app/service";
import {routing} from './app.routing-model';
import { HomepageComponent } from './homepage/homepage.component';
import { UserService } from './service/users.service';
import { FilterPipe } from './filter.pipe';
import { UserComponent } from './user/user.component';
import { Authuserguard } from "app/guards/authuser.guard";
import { EditComponent } from './edit/edit.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    SignupComponent,
    SigninComponent,
    HomepageComponent,
    FilterPipe,
    UserComponent,
    EditComponent,
    HeaderComponent,


     
  ],

  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    routing,
    RouterModule.forRoot([

    {path:  '', component: HomepageComponent},

    { path: 'signin', component: SigninComponent },
 
    {  path: 'admin', component: AdminComponent},

    { path: 'signup', component: SignupComponent},

    {path: 'user', component: UserComponent}

   
    ], {useHash: true}),
     

  ],

  providers: [HttpModule,AuthGuard,AuthenService,UserService,Authuserguard],
  bootstrap: [AppComponent]
})
export class AppModule { }
