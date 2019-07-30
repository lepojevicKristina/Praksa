import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
 /* template: `
    <p>moj login</p>
  `*/
})
export class LoginComponent {
  submited = false;
  loading = false;

  constructor(
      private loginService: LoginService
  ) 
  { }

  onSubmit()
  {
    debugger;
    this.submited = true;

    console.log("kliknuto na submit");
    console.log(this.submited);
  }

  

}
