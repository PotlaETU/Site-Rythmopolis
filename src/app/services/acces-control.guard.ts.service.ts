import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {AuthentificationService} from "./authentification.service";
import {MessageService} from "./message.service";
import {Role} from "../models/role";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private router: Router, private authService:AuthentificationService) {}

  canActivate(): boolean {
    const user = this.authService.userValue
    const message: MessageService = inject(MessageService);
    if (user.role == Role.ADMIN || user.role == Role.GESTIONNAIRE) {
      return true;
    }
    else{
      message.setMessage('Vous n\'avez pas les droits pour accéder à cette page !');
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}

// export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
//   return inject(PermissionsService).canActivate();
// }

// export function GuardClients(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//   const router = inject(Router);
//   const authService = inject(AuthentificationService);
//   const snackBar = inject(MatSnackBar);
//   const message: MessageService = inject(MessageService);
//   const user = authService.userValue;
//   if (user.role == 'ADMIN' || user.role == 'GESTIONNAIRE') {
//     return true;
//   }
//
//   // l'Utilisateur non connecté est redirigé vers la page d'accueil
//   message.setMessage('Vous n\'avez pas les droits pour accéder à cette page !');
//   router.navigate(['/']);
//   return false;
// }

