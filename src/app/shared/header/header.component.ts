import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../pages/auth/auth.service';

export interface IUser {
  name?: string;
  role?: string;
  exp?: string | number;
  token?: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: IUser;
  s1$: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.s1$ = this.authService.currentUser.subscribe(result => {
      this.user = result;
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
