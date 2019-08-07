import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {User} from '../user'
import { ConfigService } from '../config.service';
import { GlobalConstantService } from '../global-constant.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private message : string;
  private route: Router;


  constructor(private http: HttpClient, 
              private global: GlobalConstantService) 
  { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentMessage() : string
  {
    return this.message;
  }

  public get currentUserValue() : User
  {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string)
  {
    return this.http.post<any>(this.global.SERVER_URL + `/api/login`, { email, password })
  }

  logout()
  {

    const token = localStorage.getItem('token');
    // localStorage.removeItem("token");
    this.http.post<any>(this.global.SERVER_URL + '/api/logout', {token})
      .subscribe (
        response => {
          if(response.success)
            localStorage.removeItem('token');
          else
          this.route.navigateByUrl('index/dashboard')
        }
      )
  }

  register(first: string, last: string, email: string, password: string)
  {
    const fullname: string = first + ' ' + last;

    return this.http.post<any>(this.global.SERVER_URL + `/api/register`, { fullname, email, password })
  }

  userInfo()
  {
    console.log('user info');

    const token = localStorage.getItem("token");
    return this.http.post<any>(this.global.SERVER_URL + "/api/dashboard/profile", { token });
  }  

  change(first: string, last: string, password: string)
  {
    const fullname: string = first + ' ' + last;
    const token = localStorage.getItem('token');

    return this.http.post<any>(this.global.SERVER_URL + `/api/usersettings`, { token, fullname, password });
  }









  showPosts()
  {
    const token = localStorage.getItem('token');
    return this.http.post<any>(this.global.SERVER_URL + '/api/dashboard', {token});
  }


  public uploadImage(image: FormData)
  {
    console.log("upload");
    console.log(image);
    const token = localStorage.getItem('token');
    return this.http.post<any>(this.global.SERVER_URL + `/api/image`, {token, image});
  }




}