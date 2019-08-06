import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent},
  
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], 
    children: [
      { path: 'usersettings', component: UserSettingsComponent, canActivate: [AuthGuard]},
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
    ]},

  { path: '***', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const appRoutingModule = RouterModule.forRoot(routes);
