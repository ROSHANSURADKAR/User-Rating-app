import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewComponent } from './review/review.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'user', component: UserComponent,canActivate: [AuthGuard] },
  { path: 'reviews', component:ReviewComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' } ,// Default to User Page

{ path: 'admin-register', component: AdminRegisterComponent },
{ path: 'admin-login', component: AdminRegisterComponent },
{ path: '', redirectTo: '/admin-login', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
