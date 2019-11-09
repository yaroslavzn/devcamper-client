import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IResponse } from '../bootcamps/bootcamps.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private logoutTimer: any;

  constructor(private http: HttpClient, private router: Router) {
    const storageUser = JSON.parse(localStorage.getItem('currentUser'));
    let currentUser = null;

    if (storageUser && Date.now() < storageUser.exp * 1000) {
      currentUser = storageUser;
    }

    this.currentUserSubject = new BehaviorSubject<any>(currentUser);
    this.currentUser = this.currentUserSubject.asObservable();

    if (this.currentUserValue) {
      this.autoLogout();
    }
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(environment.API_URL + '/auth/login', {email, password})
      .pipe(map(result => {
        const decoded = jwt_decode(result.token);
        const user = {
          ...decoded,
          token: result.token
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return result.token;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['']);
  }

  autoLogout() {
    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, (this.currentUserValue.exp * 1000) - Date.now());
  }

  register(userData) {
    return this.http.post<IResponse>(environment.API_URL + '/auth/register', userData).pipe(
      map(result => {
        const decoded = jwt_decode(result.token);
        const user = {
          ...decoded,
          token: result.token
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return result;
      })
    );
  }
}
