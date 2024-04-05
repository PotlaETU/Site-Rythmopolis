import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { AuthentificationService } from "../../services/authentification.service";
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
  });

  loading = false;
  error = false;

  constructor(private authService: AuthentificationService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  get email(): any {
    return this.form.get('email');
  }

  get password(): any {
    return this.form.get('password');
  }

  get name(): any {
    return this.form.get('name');
  }

  register() {
    this.loading = true;
    this.authService.register({ email: this.email?.value, name: this.name?.value, password: this.password?.value })
      .pipe(
        catchError(err => {
          this.loading = false;
          console.error('Erreur inscription:', err);
          this.error = true;
          return EMPTY;
        })
      )
      .subscribe(res => {
        if (res.id) {
          this.loading = false;
          this.router.navigateByUrl('/dashboard');
        }
      });
  }
}

