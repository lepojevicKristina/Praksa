import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit 
{
  form: FormGroup;
  uploadResponse;
  fullname: string = 'undefined';

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) 
  { }

  ngOnInit() 
  {
    this.form = this.formBuilder.group({
      avatar: ['']
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) 
    {
      const file = event.target.files[0];
      this.form.get('avatar').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('avatar', this.form.get('avatar').value);

    this.authenticationService.uploadFile(formData)
      .subscribe(
        (response) => {
          this.uploadResponse = response;
            console.log(response);
        },
        (error) => {  
          console.log(error);
        }
      );
  }

}
