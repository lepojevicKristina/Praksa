import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { NgModule } from "@angular/core";
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '../user';
import { Post } from '../post';
import { DomSanitizer, SafeHtml, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

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
  i: number [] = [];
  myColor: string = "white";
  comments = [];
  
  constructor(private authenticationService: AuthenticationService, 
              private sanitizer: DomSanitizer) 
  { }

  ngOnInit() 
  {
    console.log("ngoninit");

    this.authenticationService.showPosts()
      .subscribe(
        (response) => 
        {

          this.posts = response.postsArray;

          let j;
          for(j = 0; j < this.posts.length; j++)
          {
            this.i.push(0);
            //let id = this.posts[j].id;
            //document.getElementById('like' + this.posts[j].id).style.background = this.myColor;
          }
          this.i.push(0);
          //for(let i=0; i < response.postsArray.length; i++)
          //{
            //let a = response.postsArray[i].file;
            
            //this.posts[i].file = 'data:image/png;base64, ' + this.sanitizer.bypassSecurityTrustResourceUrl(response.postsArray[i].file);
            //this.posts[i].file = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + response.postsArray[i].file);
            //this.posts[i].file =this.transform('data:image/png;base64, ' +  a, 'resourceUrl');

          //}


          for(j = 0; j < this.posts.length; j++)
          {
            if( this.posts[j].liked )
            {
              this.i[this.posts[j].id] = 1;
            }
          }
        }
      )
  }


  setColor(item)
  {

    console.log("set color : ");
    // let j;
    // for(j = 0; j < this.i.length; j++)
    // {
    //   if(this.posts[j].liked == 0)
    //   {
    //     document.getElementById('like' + this.posts[j].id).style.background = "white";
    //   }
    //   else
    //   {
    //     this.i[this.posts[j].id] = 1;
    //     document.getElementById('like' + this.posts[j].id).style.background = "red";
    //   }
    // }

    if(item.liked == 0)
    {
      document.getElementById('like' + item.id).style.background = "white";
    }
    else
    {
      this.i[item.id] = 1;
      document.getElementById('like' + item.id).style.background = "red";
    }
  }

  onSubmit(f: NgForm, item)
  {
    let com = f.value;
    console.log(com.comment);

    this.authenticationService.comment(com.comment, item.id, item.userId)
      .subscribe (
        (response) => {

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


  changeColor(id)
  {

    console.log(this.myColor);
    if(this.i[id]%2 == 1)
    {
      this.myColor = "red";
    }
    else
    {
      this.myColor = "white";
      this.i[id] = 0;
    }
  }


  like(item)
  {
    console.log("**** item id " + this.i[item.id]);

    console.log("like " + item.userId);
    //this.iterator = this.iterator + 1;
    this.i[item.id] = this.i[item.id] + 1; 
//debugger;
    console.log("item id " + this.i[item.id]);

    this.changeColor(item.id);

    console.log(this.myColor);

    document.getElementById('like' + item.id).style.background = this.myColor;
    //document.getElementById('like').style.backgroundImage = "'url(' + this.myColor +')'";

    this.authenticationService.like(item.id, item.userId)
      .subscribe (
        (response) =>
        {

        }
      )

  }

  deletePost(item)
  {
    const id = item.id;
    this.authenticationService.deletePost(id)
      .subscribe (
        (response) => {
          
        }
      )
  }


  logout()
  {
    this.authenticationService.logout();
  }
}
