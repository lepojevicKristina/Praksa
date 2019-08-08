import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '../user';
import { Post } from '../post';
import { DomSanitizer, SafeHtml, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

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

  constructor(private authenticationService: AuthenticationService, private sanitizer: DomSanitizer) 
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
            
            //this.posts[i].file = 'data:image/png;base64, ' + this.sanitizer.bypassSecurityTrustResourceUrl(response.postsArray[i].file);
            //this.posts[i].file = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64, ' + response.postsArray[i].file);
            //this.posts[i].file =this.transform('data:image/png;base64, ' +  a, 'resourceUrl');

            console.log("name " + this.posts[i].filename);
          }

        }
      )
  }


  public transform(value: any, type: string): SafeHtml | SafeUrl | SafeResourceUrl {
    switch (type) {
			case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
			case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
			case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
			default: throw new Error(`Invalid safe type specified: ${type}`);
		}
  }


  logout()
  {
    this.authenticationService.logout();
  }
}
