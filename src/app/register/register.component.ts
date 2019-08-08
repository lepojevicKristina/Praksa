import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthenticationService } from '../authentication/authentication.service'
import { User } from '../user';
import { GlobalConstantService } from '../global-constant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent 
{
  private newUser: User = null;
  private data: string;
  title = 'Kalopsia';

  constructor(private authenticationService: AuthenticationService,
              private global: GlobalConstantService,
              private route: Router)
  { }


  onSubmit(f: NgForm) 
  {
    let user = f.value;

    if(f.invalid)
      return;
    
    this.authenticationService.register(user.first, user.last, user.place, user.email, user.password)
    .subscribe(
      response => { console.log(response);
                    if(!response.success)
                    {
                      //error
                      this.data = response.token;
                      console.log(this.data);
                    }
                    else
                    {
                      this.data = "success";
                      this.route.navigate(['/login']);
                    }
                      
                  }
      )


  }


}