import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'
import { SignupComponent } from "app/auth/signup/signup.component";
import { SigninComponent } from "app/auth/signin/signin.component";
import { AdminComponent } from "app/admin/admin.component";
import { AuthGuard } from './guards/auth.guard';
import { HomepageComponent } from "app/homepage/homepage.component";
import { UserComponent } from "app/user/user.component";
import { UserService } from './service/users.service';
import { Authuserguard } from "app/guards/authuser.guard";


 const appRoutes: Routes = [
{path: '', component: HomepageComponent},
{path: 'login' ,  component: SigninComponent},
{path: 'signup' , component: SignupComponent},
{path: 'admin', component: AdminComponent, canActivate : [AuthGuard]},

{path: 'user', component: UserComponent},

] 

export const routing = RouterModule.forRoot(appRoutes,{useHash: true});

