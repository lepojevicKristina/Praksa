import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../authentication/authentication.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpMethod } from 'blocking-proxy/built/lib/webdriver_commands';
import { GlobalConstantService } from '../global-constant.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit 
{
  uploadResponse;
  imageUrl: string = "/assets/img/default_image.jpg";
  selectedImage: File = null;
  fileToUpload: File = null;
  uploadForm: FormGroup;

  fullname: string = 'undefined';
  email: string = 'undefined';
  success: boolean = false;
  images = [];

  constructor(private formBuilder: FormBuilder, 
              private authenticationService: AuthenticationService, 
              private sanitizer: DomSanitizer,
              private http: HttpClient,
              private global: GlobalConstantService) 
  { }

  ngOnInit() 
  {
    this.authenticationService.userInfo()
      .subscribe(
        (response) =>
        {
          console.log("response profile " + response);
          //console.log(JSON.parse(response));
          this.fullname = response.name;
          this.email = response.email;
        }
      )

      this.uploadForm = this.formBuilder.group({
        avatar: ['']
      });
  }

  

  onSubmit() 
  {
    console.log(this.fileToUpload);
   //const formData = new FormData();
   //formData.append('file', this.fileToUpload, this.fileToUpload.name);

    //console.log("form data  " + formData);

    let formData: FormData = new FormData();
    //formData.append('avatar', this.fileToUpload, this.fileToUpload.name);
    //formData.append('s', JSON.stringify("s"));

    const token = localStorage.getItem('token');

    formData.append('file', this.uploadForm.get('avatar').value);
    formData.append('token', token);

    console.log("formdata   " + formData);

    //this.authenticationService.uploadImage(formData)
   //this.authenticationService.uploadImage(this.fileToUpload)
   this.http.post<any>(this.global.SERVER_URL + '/api/image', {formData})
      .subscribe(
        response =>
        {
          console.log(response + " update response");
        }
      )

  }

  imageToUpload(files: FileList)
  {

    this.selectedImage = files.item(0);
    this.fileToUpload = files.item(0);

    var reader = new FileReader();
    reader.onload = (event: any) => 
    {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.selectedImage);
    //console.log(this.selectedImage);
    const token = localStorage.getItem('token');

    this.fileToUpload = files.item(0); 
    let formData = new FormData(); 
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    formData.append('token', token); 
    this.http.post(this.global.SERVER_URL + '/api/image', formData)
      .subscribe((val) => {

      console.log(val);
      });
      return false; 

  }

  logout()
  {
    this.authenticationService.logout();
  }
}
