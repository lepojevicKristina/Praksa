import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

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

  constructor(
      private loginService: LoginService
  ) 
  { }

  onSubmit(f: NgForm)
  {
    //debugger;
    this.submited = true;

    console.log("kliknuto na submit");
    //console.log(this.submited);
    
  }

  ngOnInit()
  {
    
  }
  

}
