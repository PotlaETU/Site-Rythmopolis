import {inject, Injectable} from '@angular/core';
import {
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthentificationService} from "../services/authentification.service";
import {environment} from "../../environments/environments";
import {User} from "../models/user";

export function jwtInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
  const authService = inject(AuthentificationService);
  const user: User = authService.userValue;
  const isLoggedIn = !!user.id && !!user.token;
  const isApiUrl = request.url.startsWith(environment.apiURL);
  if (isLoggedIn && isApiUrl) {
    request = request.clone({
      setHeaders: {Authorization: `Bearer ${user.token}`}
    });
  }

  return next(request);
}
