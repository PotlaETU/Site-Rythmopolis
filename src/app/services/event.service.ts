import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from "../../environments/environments";
import {Evenement} from "../models/evenement";
import {Client} from "../models/client";
import {Artiste} from "../models/artiste";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventsUrl = `${environment.apiURL}/evenements`;

  constructor(private http: HttpClient) {
  }

  getFutureEvents(): Observable<Evenement[]> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.get<{ evenements: Evenement[] }>(this.eventsUrl, httpOptions).pipe(
      map(res => res.evenements),
      catchError(err => {
        console.log('Erreur http : ', err);
        return of([]);
      }),
    );
  }

  getParticipants(id: number): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user.token;
    const url = `${environment.apiURL}/evenements/${id}`;

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'authorization': `bearer ${token}`})
    };

    console.log('getParticipants')
    return this.http.get<{ evenement: Evenement }>(url, httpOptions).pipe(
      map(res =>
        res.evenement.artistes
      ), catchError(err => {
        console.log('Erreur http : ', err);
        return of([]);
      }),
    );
  }

  deleteEvent(id: number) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user.token;
    const url = `${environment.apiURL}/evenements/${id}`;

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'authorization': `bearer ${token}`})
    };

    console.log('getParticipants')
    return this.http.delete(url, httpOptions).subscribe(
      () => {
        console.log('Evenement supprimé');
      }
    );
  }

  createEvenement(form: FormGroup):Observable<Evenement>{
    const url = `${environment.apiURL}/evenements`;
    const token = JSON.parse(localStorage.getItem('user') || '{}').token;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'authorization': `bearer ${token}`})
    };
    return this.http.post<{evenement: Evenement}>(url, form.value ,httpOptions).pipe(
      map(res => res.evenement),catchError(err => {
        console.log('Erreur SetClients : ', err);
        return of();
      })
    );
  }
}
