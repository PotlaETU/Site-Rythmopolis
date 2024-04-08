import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { AuthentificationService } from "../../services/authentification.service";
import { MatError, MatFormField } from "@angular/material/form-field";
import { MatCard, MatCardContent, MatCardTitle } from "@angular/material/card";
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import {NgIf} from "@angular/common";
import { MessageService } from '../../services/message.service';

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
    NgIf,
  ],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  });

  loading = false;
  error = false;

  message:MessageService = inject(MessageService);

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
    if (this.form.invalid){
      this.form.markAllAsTouched()
    }
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
