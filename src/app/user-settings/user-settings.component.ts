import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.sass']
})
export class UserSettingsComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm)
  {
    let user = f.value;

    console.log(f.value);

    if(f.invalid)
      return;

    this.authenticationService.change(user.first, user.last)
      .subscribe(
        (response) => { 
                        
                        

                      }
      )

  }

}
