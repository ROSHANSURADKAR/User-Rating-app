import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewComponent } from './review/review.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { AdminAuthGuard } from './admin-auth.guard';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashbordComponent } from './admin-dashbord/admin-dashbord.component';
import { HomeComponent } from './home/home.component';

import { SubmitratingComponent } from './submitrating/submitrating.component';
import { UsernameComponent } from './username/username.component';
import { PasswordComponent } from './password/password.component';
import { PhonenumberComponent } from './phonenumber/phonenumber.component';
import { AddressComponent } from './address/address.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserComponent },
 
  { path: 'reviews', component: ReviewComponent },
 
 { path: '', redirectTo: 'submitrating', pathMatch: 'full' },

  { path: 'submitrating', component: SubmitratingComponent, canActivate: [AuthGuard] },
  { path: 'admin-dashboard', component: AdminDashbordComponent,  canActivate: [AdminAuthGuard]},
  { path: 'admin-register', component: AdminRegisterComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  {path:'username',component:UsernameComponent},
  {path:'password', component:PasswordComponent},
  {path:'phonenumber', component:PhonenumberComponent},
  {path:'address', component:AddressComponent},
 
 { path: 'forgot-password', component: ForgotPasswordComponent }

  
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
