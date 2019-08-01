import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthenticationService } from '../authentication/authentication.service'
import { User } from '../user';


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
  private newUser: User = null;

  constructor(
      private loginService: LoginService,
      private authenticationService: AuthenticationService
  ) 
  { }

  onSubmit(f: NgForm)
  {
    this.submited = true;
    let user = f.value;

    //debugger;

    console.log(f.value);

    if(f.invalid)
      return;

    this.authenticationService.login(user.username, user.password, this.newUser);
      
  }

  ngOnInit()
  {
    
  }
  

}
