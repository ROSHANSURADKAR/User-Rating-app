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


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'reviews', component: ReviewComponent },
  { path: 'admin-dashboard', component: AdminDashbordComponent,  canActivate: [AdminAuthGuard]},
  { path: 'admin-register', component: AdminRegisterComponent },
  { path: 'admin-login', component: AdminLoginComponent },
 
 
  
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
