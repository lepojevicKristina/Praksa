import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../authentication/authentication.service';
import { DomSanitizer } from '@angular/platform-browser';

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
  fullname: string = 'undefined';
  success: boolean = false;
  images = [];

  constructor(private formBuilder: FormBuilder, 
              private authenticationService: AuthenticationService, 
              private sanitizer: DomSanitizer) 
  { }

  ngOnInit() 
  {
    this.authenticationService.userInfo()
    .subscribe 
    (
      response =>
      {
        this.fullname = response.name;
        this.images = response.images;
      }
    )

    
  }

  onSubmit(form) 
  {
    //console.log(this.selectedImage);

    var reader = new FileReader();
    reader.readAsArrayBuffer(this.selectedImage);
    reader.onloadend = (evt: any) => 
    {
      let imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });

      console.log(imgBlob);

      this.authenticationService.uploadImage(imgBlob);
    }
  }




  imageToUpload(file: FileList)
  {
    this.selectedImage = file.item(0);

    var reader = new FileReader();
    reader.onload = (event: any) => 
    {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.selectedImage);

    console.log(this.selectedImage);
  }

}
