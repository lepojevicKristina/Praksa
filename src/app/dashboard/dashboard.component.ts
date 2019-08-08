import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { NgModule } from "@angular/core";
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
  iterator: number = 0
  myColor: string = "white";

  
  constructor(private authenticationService: AuthenticationService, 
              private sanitizer: DomSanitizer) 
  { }

  ngOnInit() 
  {
    this.authenticationService.showPosts()
      .subscribe(
        (response) => 
        {

          this.posts = response.postsArray;

          //for(let i=0; i < response.postsArray.length; i++)
          //{
            //let a = response.postsArray[i].file;
            
            //this.posts[i].file = 'data:image/png;base64, ' + this.sanitizer.bypassSecurityTrustResourceUrl(response.postsArray[i].file);
            //this.posts[i].file = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + response.postsArray[i].file);
            //this.posts[i].file =this.transform('data:image/png;base64, ' +  a, 'resourceUrl');

          //}//kraj for petlje

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
    const blob = new Blob([int8Array], { type: 'image/png' });    
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


  changeColor()
  {
    //let elem = document.getElementById('like');
    if(this.iterator%2 == 1)
    {
      console.log(this.myColor);
      this.myColor = "red";
     // this.iterator = 0;
    }
    else
    {
      this.myColor = "white";
      this.iterator = 0;
    }
  }


  like(item)
  {
    console.log("like " + item.id);
    this.iterator = this.iterator + 1;

    this.changeColor();

    console.log(this.myColor);

    document.getElementById('like').style.color = this.myColor;

    this.authenticationService.like(item.id, item.userId)
      .subscribe (
        (response) =>
        {

        }
      )

  }



  logout()
  {
    this.authenticationService.logout();
  }
}
