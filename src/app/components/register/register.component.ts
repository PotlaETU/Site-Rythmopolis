import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthentificationService} from "../../services/authentification.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
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
    this.authService.register({ email: this.email?.value, name: this.name?.value, password: this.password?.value}).subscribe(res => {
      if (res.id) {
        this.router.navigateByUrl('/dashboard')
      }
    })
  }
}

