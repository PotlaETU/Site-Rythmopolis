import { Routes } from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

export const routes: Routes = [
  {path:"", pathMatch: "full", redirectTo: "/"},
  {path: "**", component: PageNotFoundComponent}
];
