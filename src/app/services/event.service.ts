import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from "../../environments/environments";
import {Client} from "../models/client";
import {Evenement} from "../models/evenement";


@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventsUrl = `${environment.apiURL}/evenements`;

  constructor(private http: HttpClient) { }

  getFutureEvents(): Observable<Evenement[]> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.get<{evenements: Evenement[]}>(this.eventsUrl, httpOptions).pipe(
      map(res => res.evenements),
      catchError(err => {
        console.log('Erreur http : ', err);
        return of([]);
      }),
    );
  }

  getEvent(id: number): Observable<Evenement> {
    const url = `${environment.apiURL}/evenements/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.get<{data: Evenement}>(url, httpOptions).pipe(
      map(res => res.data)
    );
  }

}
