import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ConnexionComponent } from "./components/connexion/connexion.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ConnexionComponent, NgOptimizedImage, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularSite';
  image = 'assets/avatar.png'
  connection: string = 'Se connecter';
  logo: string = 'assets/logo.png';
  pseudo: string = '';


}
