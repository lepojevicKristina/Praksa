import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '../user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit 
{
  public data : any;
  fullname: string;
  email: string;
  posts = [];

  constructor(private authenticationService: AuthenticationService) 
  { }

  ngOnInit() 
  {
    this.authenticationService.userInfo()
      .subscribe(
        response =>
        {
          this.fullname = response.user.name;
          this.email = response.user.email;
        }
      )

    this.authenticationService.showPosts()
      .subscribe(
        response => 
        {
          this.posts = response.postsArray;
        }
      )
  }





  createImageFromBlob(image: Blob) 
  {
    let reader = new FileReader();
    reader.addEventListener("load", () => 
    {
      //this.imageBlobUrl = reader.result;
    }, false);
    if (image) 
    {
      reader.readAsDataURL(image);
    }
  }

  logout()
  {
    this.authenticationService.logout();
  }
}
