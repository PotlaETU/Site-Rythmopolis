import { Component, inject } from '@angular/core';
import { AuthentificationService } from '../../services/authentification.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {

  authService:AuthentificationService = inject(AuthentificationService);

  loading:boolean = false;

  constructor(private http:HttpClient) { }

  isLogged():boolean {
    let isLogged:boolean = false;
    this.authService.isLoggedIn$.subscribe((value) => {
      isLogged = value;
    });
    return isLogged;
  }

  modifUser() {
    this.loading = true;
    this.http.post(environment.apiURL + '/user', this.authService.userValue).subscribe((response) => {
      this.loading = false;
    });
  }

}
