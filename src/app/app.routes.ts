import { Routes } from '@angular/router';
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ConnexionComponent } from "./components/connexion/connexion.component";
import { RegisterComponent } from "./components/register/register.component";
import { AccueilComponent } from './components/accueil/accueil.component';
import {ListeClientComponent} from "./components/liste-client/liste-client.component";
import {GuardClients} from "./services/acces-control.guard.ts.service";
import {DetailClientComponent} from "./components/detail-client/detail-client.component";

export const routes: Routes = [
  { path: "", pathMatch: "full", component: AccueilComponent },
  { path: "login", component: ConnexionComponent },
  { path: "register", component: RegisterComponent },
  { path: "clients", component: ListeClientComponent},
  { path: "clients/:{id}", component: DetailClientComponent},
  // { path: "clients/:{id}", component: ListeClientComponent, canActivate: [GuardClients]},
  // { path: "clients", component: ListeClientComponent, canActivate: [GuardClients]},
  { path: "**", component: PageNotFoundComponent }
];
