import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';

export interface IResponse {
  success: boolean;
  data?: [] | {};
  pagination?: {};
  error?: string;
  count?: number;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BootcampsService {
  constructor(private http: HttpClient) { }

  getBootcamps(queryString = '') {
    return this.http.get<IResponse>(environment.API_URL + `/bootcamps${queryString}`);
  }

  getBootcamp(slug: string) {
    return this.http.get<IResponse>(environment.API_URL + `/bootcamps/${slug}`);
  }
}
