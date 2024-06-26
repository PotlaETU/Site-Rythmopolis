import {Injectable} from '@angular/core';
import {ANONYMOUS_USER, Identite, RegisterRequest} from "../models/Auth";
import {BehaviorSubject, catchError, map, Observable, shareReplay, tap, throwError} from "rxjs";
import {User} from "../models/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {environment} from "../../environments/environments";
import {Role} from "../models/role";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(ANONYMOUS_USER);
  public user$: Observable<User> = this.userSubject.asObservable();

  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user.id));
  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));

  constructor(private http: HttpClient,
              private snackbar: MatSnackBar,
              private router: Router) {
      this.userSubject.next(JSON.parse(sessionStorage.getItem('user') || '{}'));
      this.user$ = this.userSubject.asObservable();
  }

  login(credential: Identite): Observable<User> {
    return this.http.post<any>(`${environment.apiURL}/login`, credential, httpOptions)
      .pipe(
        map(rep => {
          const user = {...rep.user, role: rep.user.role, token: rep.authorization.token};
          this.userSubject.next(user);
          sessionStorage.setItem('user', JSON.stringify(user));
          return user;
        }),
        shareReplay(),
        tap(() => this.snackbar.open(`Bienvenue, ${this.userValue.name}`, 'Close', {
          duration: 2000, horizontalPosition: 'left', verticalPosition: 'top'
        })),
        catchError(err => {
          this.userSubject.next(ANONYMOUS_USER);
          this.snackbar.open('Connexion invalide', 'Close', {
            duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
          })
          throw new Error(`login result : ${err}`)
        })
      );
  }


  register(request: RegisterRequest): Observable<User> {
    return this.http.post<any>(`${environment.apiURL}/register`, {
      nom: request.nom,
      prenom: request.prenom,
      adresse: request.adresse,
      code_postal: request.code_postal,
      ville: request.ville,
      email: request.email,
      password: request.password,
    }, httpOptions).pipe(
      map(rep => {
        const user = {...rep.user, token: rep.authorization.token};
        this.userSubject.next(user);
        this.snackbar.open(`Bienvenue, ${this.userValue.name}`, 'Close', {
          duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
        })
        sessionStorage.setItem('user', JSON.stringify(user));
        return user;
      }),
      shareReplay(),
      catchError(err => {
        console.log(err);
        this.userSubject.next(ANONYMOUS_USER);
        this.snackbar.open(`Enregistrement invalide ${err.error.message}`, 'Close', {
          duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'
        })
        throw new Error(`register result : ${err}`)
      })
    )
  }

  logout() {
    const oldUser = this.userValue;
    this.http.post<any>(`${environment.apiURL}/logout`, {}, httpOptions)
      .pipe()
      .subscribe(user => {
          this.snackbar.open(`A bientôt, ${oldUser.name}`, 'Close', {
            duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
          })
        }
      );
    this.userSubject.next(ANONYMOUS_USER);
    sessionStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  getProfile(): Observable<User> {
    return this.http.get<any>(`${environment.apiURL}/profil`, httpOptions)
      .pipe(
        map(rep => rep.user),
        catchError(err => throwError(err))
      );
  }

  get userValue(): User {
    return this.userSubject.value;
  }

}
