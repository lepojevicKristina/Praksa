import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { GlobalConstantService } from './global-constant.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthenticationService } from './authentication/authentication.service';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    UserSettingsComponent,
    ProfileComponent,
    IndexComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    GlobalConstantService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
