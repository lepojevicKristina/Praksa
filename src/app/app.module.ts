//import { LoginService } from './login.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { GlobalConstantService } from './global-constant.service';
import { UserHomeComponent } from './user-home/user-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserHomeComponent,
    DashboardComponent,
    UserSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    //LoginService,
    GlobalConstantService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
