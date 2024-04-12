import { Component, ElementRef, inject, input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { AuthentificationService } from "../../services/authentification.service";
import { catchError, EMPTY } from 'rxjs';
import { MatError } from "@angular/material/form-field";
import { HttpClient } from "@angular/common/http";
import { AddressSuggestion, AdresseService } from "../../services/adresse.service";
import { AsyncPipe, NgForOf } from "@angular/common";
import { getRootDirs } from "@angular/compiler-cli/src/ngtsc/util/src/typescript";
import { data } from "autoprefixer";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatError,
    AsyncPipe,
    NgForOf,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
    nom: new FormControl("", [Validators.required]),
    prenom: new FormControl("", [Validators.required]),
    adresse: new FormControl("", [Validators.required]),
    code_postal: new FormControl("", [Validators.required]),
    passwordverif: new FormControl("", [Validators.required]),
    ville: new FormControl("", [Validators.required])
  });

  loading = false;
  error = false;

  adresses: AddressSuggestion[] = [];

  code_postal: string = '';

  adresseAPI: AdresseService = inject(AdresseService)

  cp: string = '';
  errorPassword: boolean = false;

  constructor(private authService: AuthentificationService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient) {
    this.errorPassword = false;
    this.adresses = [];
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
    return this.form.get('nom');
  }

  get surname(): any {
    return this.form.get('prenom');
  }

  get passwordverif(): any {
    return this.form.get('passwordverif')
  }

  get ville(): any {
    return this.form.get('ville')
  }

  get codePostal(): any {
    return this.form.get('code_postal')
  }

  register() {
    this.loading = true;
    if (this.password?.value != this.passwordverif?.value) {
      this.errorPassword = true;
      this.loading = false;
      return;
    }
    this.authService.register(this.form.value)
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
          this.router.navigateByUrl('/');
        }
      });
  }

  /*
  * Test de suggestion d'adresse lorsque l'utilisateur tape dans l'input Adresse*/

  /*
    * Test de suggestion d'adresse lorsque l'utilisateur tape dans l'input Adresse*/
  getAddresses() {
    // document.getElementById("addresse_list")?.removeChild(option)
    const input: HTMLInputElement = document.getElementById('ville') as HTMLInputElement
    const datalist: HTMLDataListElement = document.getElementById('adresse_sugg') as HTMLDataListElement
    // this.adresses = []
    if (input.value.length >= 3) {
      this.adresseAPI.onSearchChange(input.value).then(r => {
        datalist.childNodes.forEach(child => {
          datalist.removeChild(child)
        })
        r?.forEach(ad => {
          this.adresses.push(ad)
          let option = document.createElement('option')
          option.setAttribute('value', ad.ville)
          // option.addEventListener('click', ev => {
          //   let optionSelect = ev.target as HTMLOptionElement
          //   console.log(optionSelect.getAttribute('value'))
          // })
          datalist.appendChild(option)
          document.getElementById("adresse_sugg")?.appendChild(option)
        })
      })
    }
  }

  /**
   * Fonction qui permet de remplir le code postal lorsque l'utilisateur clique sur une suggestion d'adresse (grâce à l'api du gouvernement)
   * @param vileClick string : la ville sur laquelle l'utilisateur a cliqué
   */
  onSelected(vileClick: string) {
    this.adresses.forEach(ad => {
      if (ad.ville == vileClick) {
        console.log(ad.code_postal);
        this.codePostal.setValue(ad.code_postal);
      }
    })
  }

}

