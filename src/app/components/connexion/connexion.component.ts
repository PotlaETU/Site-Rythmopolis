import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AuthentificationService} from "../../services/authentification.service";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

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
    MatButton
  ],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl("robert.duchmol@domain.fr", [Validators.required, Validators.email]),
    password: new FormControl("GrosSecret", [Validators.required]),
  });

  constructor(private authService: AuthentificationService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  login() {
    this.authService.login({ email: this.email?.value, password: this.password?.value }).subscribe(res => {
      if (res.id) {
        this.router.navigateByUrl('/')
      }
    })
  }

  logout() {
    this.authService.logout();
  }
}
