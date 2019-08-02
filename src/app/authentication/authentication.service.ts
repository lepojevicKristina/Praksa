import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {User} from '../user'
import { ConfigService } from '../config.service';
import { GlobalConstantService } from '../global-constant.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  

  constructor(private http: HttpClient, private url: GlobalConstantService) 
  { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() : User
  {
    return this.currentUserSubject.value;
  }


  login(email: string, password: string, newUser: User)
  {
    console.log('aut log');

    return this.http.post<any>(this.url.SERVER_URL + `/api/login`, { email, password })

      .subscribe(
        data =>
        {
          newUser.token = data;

          console.log(data);
        }
      )
  }

  register(first: string, last: string, email: string, password: string, newUser: User)
  {
    console.log('registracija');
    let fullname = first + ' ' + last;

    return this.http.post<any>(this.url.SERVER_URL + `/register`, { fullname, email, password})
      .subscribe(
        data =>
        {
          newUser.token = data;
          console.log(data);
        }
      )
  }
}
