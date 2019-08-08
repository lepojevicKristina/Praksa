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

  onSubmitName(f: NgForm)
  {
    const user = f.value;

    console.log(f.value);

    this.authenticationService.change(user.first, user.last)
      .subscribe(
        (response) => { 
                        
                      }
      )

  }


  // onSubmitPlace(f: NgForm)
  // {
  //   let place = f.value;
  //   console.log(f.value);

  //   this.authenticationService.changePlace(place)
  //   .subscribe (
  //     (response) => {

  //     }
  //   )
  // }


  logout()
  {
    this.authenticationService.logout();
  }
}
