import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
=======

>>>>>>> d29f3c82476a56b15527de2716cae33a24af2639
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  HttpClientModule } from '@angular/common/http';
import { ReviewComponent } from './review/review.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
<<<<<<< HEAD
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { AdminDashbordComponent } from './admin-dashbord/admin-dashbord.component';

=======
>>>>>>> d29f3c82476a56b15527de2716cae33a24af2639


@NgModule({
  declarations: [
    AppComponent,
    ReviewComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
<<<<<<< HEAD
    AdminLoginComponent,
    AdminRegisterComponent,
    AdminDashbordComponent,
    
=======
>>>>>>> d29f3c82476a56b15527de2716cae33a24af2639
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
