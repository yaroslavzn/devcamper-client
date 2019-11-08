import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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

  getBootcamps() {
    return this.http.get<IResponse>(environment.API_URL + '/bootcamps');
  }
}
