import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthenticationService } from '../authentication/authentication.service'
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent 
{
  private newUser: User = null;

  constructor(private authenticationService: AuthenticationService)
  {
    
  }


  onSubmit(f: NgForm) 
  {
    let user = f.value;

    //console.log(user);
    if(f.invalid)
      return;
    
    this.authenticationService.register(user.first, user.last, user.email, user.password, this.newUser);

  }
}