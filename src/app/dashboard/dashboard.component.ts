import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '../user';
import { Post } from '../post';

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
  posts = new Array<Post>();
  converted = new Array<Post>();

  constructor(private authenticationService: AuthenticationService) 
  { }

  ngOnInit() 
  {
    this.authenticationService.userInfo()
      .subscribe(
        response =>
        {
          console.log("response dashboard");
          console.log(JSON.parse(response))
          let message = JSON.parse(response);
          this.fullname = message.user.name;
        }
      )

    this.authenticationService.showPosts()
      .subscribe(
        response => 
        {
          console.log("response showPosts");
          this.posts = response.postsArray;

          let i = 0;
          for(let item in this.posts)
          {
            let post = new Post();
            //post.name = item.name;
            this.converted.push(post);
            
            //post.image = this.convert(item.image, i);

            i++;
          }


        }
      )
  }

  convert(p, i)
  {
    
      var reader = new FileReader();
      reader.onload = function() {
          var dataUrl = reader.result;
          var base64 = dataUrl.split(',')[1];

          //this.converted[i].image = base64;
      };
      reader.readAsDataURL(p);

  
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
