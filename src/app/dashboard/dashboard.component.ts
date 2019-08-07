import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '../user';
import { Post } from '../post';
import { DomSanitizer } from '@angular/platform-browser';

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
  converted = new Array<Post>();

  constructor(private authenticationService: AuthenticationService, private _sanitizer: DomSanitizer) 
  { }

  ngOnInit() 
  {
    this.authenticationService.showPosts()
      .subscribe(
        (response) => 
        {

          this.posts = response.postsArray;
          //console.log(this.posts);

          for(let i=0; i < this.posts.length; i++)
          {
            let a = response.postsArray[i].file;
            console.log("aaaaa " + a);
            console.log(this.posts[i].name );
            //this.posts[i].file = window.URL.createObjectURL(response.postsArray[i].file);
            this.posts[i].file = 'data:image/png;base64,' + response.postsArray[i].file
            //this.posts[i].file = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + );
            //console.log(this.posts[i].file);
          }

/*
          let i = 0;
          for(let item of message.postsArray)
          {

            console.log(item.id);
            //let post = new Post();
            //post.name = item.name;
            //this.converted.push(post);
            
            //post.image = this.convert(item.image, i);

            console.log(i);
            i++;



            this.ImageSource = window.URL.createObjectURL(blob);
          }
*/

        }
      )
  }

/*  convert(p, i)
  {
    
      var reader = new FileReader();
      reader.onload = function() {
          var dataUrl = reader.result;
          var base64 = dataUrl.split(',')[1];

          //this.converted[i].image = base64;
      };
      reader.readAsDataURL(p);

  
  }
*/


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
