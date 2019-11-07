import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.minLength(6)]],
      repeatPassword: [null, [Validators.minLength(6)]],
      role: ['']
    });
  }

  onFormSubmit() {
    if (!this.form.invalid) {
      this.loading = true;

      this.authService.register(this.form.value).subscribe(result => {
        if (result.success) {
          this.router.navigate(['/bootcamps']);
        }
      });
    }
  }
}
