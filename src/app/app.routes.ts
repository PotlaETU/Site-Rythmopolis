import { Routes } from '@angular/router';
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ConnexionComponent } from "./components/connexion/connexion.component";
import { RegisterComponent } from "./components/register/register.component";
import { AccueilComponent } from './components/accueil/accueil.component';

export const routes: Routes = [
  { path: "", pathMatch: "full", component: AccueilComponent },
  { path: "login", component: ConnexionComponent },
  { path: "register", component: RegisterComponent },
  { path: "**", component: PageNotFoundComponent }
];
