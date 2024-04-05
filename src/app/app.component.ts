import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ConnexionComponent } from "./components/connexion/connexion.component";
import { AuthentificationService } from './services/authentification.service';
import {ListeClientComponent} from "./components/liste-client/liste-client.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ConnexionComponent, NgOptimizedImage, RouterLink, ListeClientComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularSite';
  image = 'assets/avatar.png'
  connection: string = 'Se connecter';
  logo: string = 'assets/logo.png';
  pseudo: string = '';

  authService: AuthentificationService = inject(AuthentificationService);

  isLogged(): boolean {
    let u: boolean = false;
    this.authService.isLoggedIn$.subscribe(
      logged => {
        u = logged;
      }
    );
    return u;
  }

  constructor() {
    this.pseudo = this.authService.userValue.name;
  }
}
