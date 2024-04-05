import { Routes } from '@angular/router';
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ConnexionComponent } from "./components/connexion/connexion.component";
import { RegisterComponent } from "./components/register/register.component";
import { AccueilComponent } from './components/accueil/accueil.component';
import {AProposComponent} from "./components/a-propos/a-propos.component";
import {ContactComponent} from "./components/contact/contact.component";
import {ListeClientComponent} from "./components/liste-client/liste-client.component";
import {GuardClients} from "./services/acces-control.guard.ts.service";

export const routes: Routes = [
  { path: "", pathMatch: "full", component: AccueilComponent },
  { path: "login", component: ConnexionComponent },
  { path: "register", component: RegisterComponent },
  { path : "about", component: AProposComponent },
  { path : "contact", component: ContactComponent },
  { path: "clients", component: ListeClientComponent},
  // { path: "clients", component: ListeClientComponent, canActivate: [GuardClients]},
  { path: "**", component: PageNotFoundComponent }
];
