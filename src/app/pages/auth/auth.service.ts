import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IResponse } from '../bootcamps/bootcamps.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(environment.API_URL + '/auth/login', {email, password})
      .pipe(map(result => {
        localStorage.setItem('currentUser', JSON.stringify(result.token));
        this.currentUserSubject.next(result.token);
        return result.token;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  register(userData) {
    return this.http.post<IResponse>(environment.API_URL + '/auth/register', userData).pipe(
      map(result => {
        localStorage.setItem('currentUser', JSON.stringify(result.token));
        this.currentUserSubject.next(result.token);
        return result;
      })
    );
  }
}
