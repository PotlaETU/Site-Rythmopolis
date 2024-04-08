import { Component, inject, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { AuthentificationService } from "../../services/authentification.service";
import { catchError, EMPTY } from 'rxjs';
import { MatError } from "@angular/material/form-field";
import { HttpClient } from "@angular/common/http";
import { AdresseService } from "../../adresse.service";
import { AsyncPipe } from "@angular/common";
import { getRootDirs } from "@angular/compiler-cli/src/ngtsc/util/src/typescript";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatError,
    AsyncPipe
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    surname: new FormControl("", [Validators.required]),
    adresse: new FormControl("", [Validators.required]),
    codePostal: new FormControl("", [Validators.required]),
    passwordverif: new FormControl("", [Validators.required]),
    ville: new FormControl("", [Validators.required])
  });

  loading = false;
  error = false;

  adresseAPI: AdresseService = inject(AdresseService)

  constructor(private authService: AuthentificationService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient) {
  }

  get email(): any {
    return this.form.get('email');
  }

  get password(): any {
    return this.form.get('password');
  }

  get adresse(): any {
    return this.form.get('adresse');
  }

  get name(): any {
    return this.form.get('name');
  }

  get surname(): any {
    return this.form.get('surname');
  }

  get passwordverif(): any {
    return this.form.get('passwordverif')
  }

  get ville(): any {
    return this.form.get('ville')
  }

  get codePostal(): any {
    return this.form.get('codePostal')
  }

  register() {
    this.loading = true;
    this.authService.register({
      email: this.email?.value, name: this.name?.value, password: this.password?.value, adresse: this.adresse?.value,
      ville: this.ville?.value, codePostal: this.codePostal?.value, surname: this.surname?.value
    })
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

  /*
  * Test de suggestion d'adresse lorsque l'utilisateur tape dans l'input Adresse*/
  getAddresses() {
    // document.getElementById("addresse_list")?.removeChild(option)
    const input: HTMLInputElement = document.getElementById('adresse') as HTMLInputElement
    const datalist: HTMLDataListElement = document.getElementById('adresse_sugg') as HTMLDataListElement
    if(input.value.length>=3){
      this.adresseAPI.onSearchChange(input.value).then(r => {
        datalist.childNodes.forEach(child => {
          datalist.removeChild(child)
        })
        r?.forEach(ad => {
          let option = document.createElement('option')
          option.setAttribute('value', ad.ville)
          datalist.appendChild(option)
          document.getElementById("adresse_sugg")?.appendChild(option)
        })
      })
    }
  }
}

