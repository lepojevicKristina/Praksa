import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthenticationService } from '../authentication/authentication.service'
import { User } from '../user';
import { Router } from '@angular/router';
import { Subscribable, Observable } from 'rxjs';
import { AuthGuard } from '../guards/auth.guard';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
 /* template: `
    <p>moj login</p>
  `*/
})
export class LoginComponent implements OnInit
{
  submited = false;
  loading = false;
  title = 'Kalopsia';

  constructor(
      private authenticationService: AuthenticationService,
      private router : Router,
      private guard: AuthGuard
  ) 
  { }

  onSubmit(f: NgForm)
  {
    let user = f.value;

    console.log(f.value);

    if(f.invalid)
      return;

    this.authenticationService.login(user.email, user.password)
      .subscribe(
        (response) => { 
                        if(response.success)
                        {
                          localStorage.setItem("token", response.token);
                          console.log("token: " + localStorage.getItem("token"));
                          if(this.guard.canActivate())
                            this.router.navigateByUrl('index/dashboard');
                        }
                        else
                          return;

                      }
      )

  }

  ngOnInit()
  {
    
  }
  

}
