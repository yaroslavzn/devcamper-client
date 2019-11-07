import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IResponse } from '../bootcamps/bootcamps.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  register(userData) {
    return this.http.post<IResponse>(environment.API_URL + '/auth/register', userData);
  }
}
