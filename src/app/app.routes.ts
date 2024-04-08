import {Routes} from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {ConnexionComponent} from "./components/connexion/connexion.component";
import {RegisterComponent} from "./components/register/register.component";
import {AccueilComponent} from './components/accueil/accueil.component';
import {AProposComponent} from "./components/a-propos/a-propos.component";
import {ContactComponent} from "./components/contact/contact.component";
import {ListeClientComponent} from "./components/liste-client/liste-client.component";
import {GuardClients} from "./services/acces-control.guard.ts.service";
import {DetailClientComponent} from "./components/detail-client/detail-client.component";
import {EventListComponent} from "./components/evenements/evenements.component";
import {ClientEditComponent} from "./components/client-edit/client-edit.component";
import {DetailEventComponent} from "./components/detail-event/detail-event.component";

export const routes: Routes = [
  {path: "", pathMatch: "full", component: AccueilComponent},
  {path: "login", component: ConnexionComponent},
  {path: "register", component: RegisterComponent},
  {path: "about", component: AProposComponent},
  {path: "contact", component: ContactComponent},
  {path: "clients", component: ListeClientComponent},
  {path: "clients/:{id}", component: DetailClientComponent},
  {path: "evenements", component: EventListComponent},
  {path: "evenements/:{id}", component: DetailEventComponent},
  {path: "clients/:{id}/edit", component: ClientEditComponent},

  // { path: "clients/:{id}", component: ListeClientComponent, canActivate: [GuardClients]},
  // { path: "clients", component: ListeClientComponent, canActivate: [GuardClients]},
  {path: "**", component: PageNotFoundComponent}
];
