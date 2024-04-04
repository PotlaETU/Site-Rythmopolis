import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { AuthentificationService } from "../../services/authentification.service";
import { MatError, MatFormField } from "@angular/material/form-field";
import { MatCard, MatCardContent, MatCardTitle } from "@angular/material/card";
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormField,
    MatCardTitle,
    MatCardContent,
    MatCard,
    MatInput,
    MatError,
    MatButton,
  ],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl("HALLAH.WAKBAR@jesuisbougnoul.fr", [Validators.required, Validators.email]),
    password: new FormControl("NiqueLesJuifs", [Validators.required]),
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

  login() {
    this.loading = true;
    this.authService.login({ email: this.email?.value, password: this.password?.value })
      .pipe(
        catchError(err => {
          this.loading = false;
          console.error('Login error:', err);
          this.error = true;
          return EMPTY;
        })
      )
      .subscribe(res => {
        if (res.id) {
          this.loading = false;
          this.router.navigateByUrl('/');
        } 
      });
  }

  logout() {
    this.authService.logout();
  }
}
