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
//  posts = new Array<Post>();

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

        /*  for(let i=0; i < response.postsArray.length; i++)
          {
            //let a = response.postsArray[i].file;
            
            //this.posts[i].file = 'data:image/png;base64, ' + this.sanitizer.bypassSecurityTrustResourceUrl(response.postsArray[i].file);
            //this.posts[i].file = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64, ' + response.postsArray[i].file);
            //this.posts[i].file =this.transform('data:image/png;base64, ' +  a, 'resourceUrl');

            //let base64 : string = a;
            //string base64="/9j/4AAQSkZJRgABAQE...";
            // Naming the image
            //const date = new Date().valueOf();
            //let text = '';
            //const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            //for (let i = 0; i < 5; i++) {
              //text += possibleText.charAt(Math.floor(Math.random() *    possibleText.length));
            //}
            // Replace extension according to your media type
            //const imageName = date + '.' + text + '.*';
            // call method that creates a blob from dataUri
            //const imageBlob = this.dataURItoBlob(base64);
            //const imageFile = new File([imageBlob], imageName, { type: 'image/*' });
            //this.posts[i].file = imageFile

            
            this.posts[i].name = response.postsArray[i].name;
            



            const base64 = response.postsArray[i].file;
            //string base64="/9j/4AAQSkZJRgABAQE...";
            // Naming the image
            const date = new Date().valueOf();
            let text = '';
            const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (let i = 0; i < 5; i++) {
              text += possibleText.charAt(Math.floor(Math.random() *    possibleText.length));
            }
            // Replace extension according to your media type
            const imageName = date + '.' + text + '.*';
            // call method that creates a blob from dataUri
            const imageBlob = this.dataURItoBlob(base64);
            const imageFile = new File([imageBlob], imageName, { type: 'image/*' });
            this.posts[i].image = imageFile;


          }
*/
        }
      )
  }




dataURItoBlob(dataURI) 
{
  const byteString = window.atob(dataURI);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const int8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) 
  {
    int8Array[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([int8Array], { type: 'image/jpeg' });    
  return blob;
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
