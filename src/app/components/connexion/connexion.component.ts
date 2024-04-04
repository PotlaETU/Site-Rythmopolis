import { Component } from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl("robert.duchmol@domain.fr", [Validators.required, Validators.email]),
    password: new FormControl("GrosSecret", [Validators.required]),
  });

  constructor(private authService: AuthService,
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
        this.router.navigateByUrl('/dashboard')
      }
    })
  }

  logout() {
    this.authService.logout();
  }
}
