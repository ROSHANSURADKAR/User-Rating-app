import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReviewComponent } from './review/review.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { AdminDashbordComponent } from './admin-dashbord/admin-dashbord.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';





@NgModule({
  declarations: [
    AppComponent,
    ReviewComponent,
   UserComponent,
    LoginComponent,
    RegisterComponent,
    AdminLoginComponent,
    AdminRegisterComponent,
    AdminDashbordComponent,
    HomeComponent,
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
