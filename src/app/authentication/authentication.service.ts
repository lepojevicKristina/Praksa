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
    localStorage.removeItem("token");
  }

  register(first: string, last: string, email: string, password: string)
  {
    const fullname: string = first + ' ' + last;

    return this.http.post<any>(this.global.SERVER_URL + `/api/register`, { fullname, email, password })
  }


  change(first: string, last: string)
  {
    const fullname: string = first + ' ' + last;

    return this.http.post<any>(this.global.SERVER_URL + `/api/usersettings`, { fullname });
  }


  showPosts()
  {
    return this.http.get<any>(this.global.SERVER_URL + 'api/showposts');
  }


  public uploadFile(data)
  {
    return this.http.post<any>(this.global.SERVER_URL + '/api/upload', data);
  }

}