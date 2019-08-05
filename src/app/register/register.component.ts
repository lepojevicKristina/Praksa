import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthenticationService } from '../authentication/authentication.service'
import { User } from '../user';
import { GlobalConstantService } from '../global-constant.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent 
{
  private newUser: User = null;
  private data: string;

  constructor(private authenticationService: AuthenticationService,
              private global: GlobalConstantService)
  { }


  onSubmit(f: NgForm) 
  {
    let user = f.value;

    if(f.invalid)
      return;
    
    this.authenticationService.register(user.first, user.last, user.email, user.password)
    .subscribe(
      response => { console.log(response);
                            if(!response.success)
                            {
                              this.data = response.token;
                              console.log(this.data);
                            }
                            else
                              this.data = "success";

                  }
      )


  }


}