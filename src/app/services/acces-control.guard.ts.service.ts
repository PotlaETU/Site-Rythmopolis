import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {ANONYMOUS_USER} from "../models/Auth";
import {AuthentificationService} from "./authentification.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MessageService} from "./message.service";

export function GuardClients(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  const router = inject(Router);
  const authService = inject(AuthentificationService);
  const snackBar = inject(MatSnackBar);
  const message: MessageService = inject(MessageService);
  const user = authService.userValue;
  if (user.role == 'ADMIN' || user.role == 'GESTIONNAIRE') {
    return true;
  }

  // l'Utilisateur non connecté est redirigé vers la page d'acceuil
  message.setMessage('Vous n\'avez pas les droits pour accéder à cette page');
  router.navigate(['/']);
  return false;
}

