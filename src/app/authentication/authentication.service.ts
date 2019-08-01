import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {User} from '../user'
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  SERVER_URL = 'http://localhost/';

  constructor(private http: HttpClient) 
  { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string, newUser: User)
  {
console.log('aut log');



    return this.http.post<any>(this.SERVER_URL + `/api/login`, { username, password })

      .subscribe(
        data =>
        {
          newUser.token = data;

          console.log(data);
        }
      )

     /*       .pipe(map(user => {
                // login successful if there's a jwt token in the response

                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes

                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));*/
  }
}
