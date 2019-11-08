import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (!this.form.invalid) {
      this.loading = true;

      this.authService.login(this.form.value.email, this.form.value.password).subscribe(result => {
        if (result) {
          const returnUrl = this.route.snapshot.queryParams.returnUrl;
          this.loading = false;

          if (returnUrl) {
            this.router.navigate([returnUrl]);
          } else {
            this.router.navigate(['bootcamps',]);
          }
        }
      });
    }
  }
}
