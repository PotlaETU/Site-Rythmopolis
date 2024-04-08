import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ConnexionComponent } from "./components/connexion/connexion.component";
import { RegisterComponent } from "./components/register/register.component";
import { AccueilComponent } from './components/accueil/accueil.component';
import { AProposComponent } from "./components/a-propos/a-propos.component";
import { ContactComponent } from "./components/contact/contact.component";
import { ListeClientComponent } from "./components/liste-client/liste-client.component";
import { AuthGuard } from "./services/acces-control.guard.ts.service";
import { DetailClientComponent } from "./components/detail-client/detail-client.component";
import { EventListComponent } from "./components/liste-event/liste-event.component";
import { ClientEditComponent } from "./components/client-edit/client-edit.component";
import { inject } from "@angular/core";

export const routes: Routes = [
  { path: "", pathMatch: "full", component: AccueilComponent },
  { path: "login", component: ConnexionComponent },
  { path: "register", component: RegisterComponent },
  { path: "about", component: AProposComponent },
  { path: "contact", component: ContactComponent },
  // {path: "clients", component: ListeClientComponent},
  // {path: "clients/:{id}", component: DetailClientComponent},
  { path: "liste-event", component: EventListComponent },
  { path: "clients/:{id}/edit", component: ClientEditComponent },
  { path: "clients/:{id}", component: ListeClientComponent, canActivate: [(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate()] },
  { path: "clients", component: ListeClientComponent, canActivate: [(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate()] },
  { path: "**", component: PageNotFoundComponent }
];
// , canActivate: [(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(next, state)]