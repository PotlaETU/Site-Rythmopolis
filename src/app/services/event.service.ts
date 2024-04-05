import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {Evenement} from "../models/evenement";
import {environment} from "../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventsUrl = environment.apiURL + '/events';

  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private http: HttpClient) {
  }

  events(): Observable<Evenement[]> {
    return this.http.get<{
      data: Evenement[]
    }>(this.eventsUrl, this.httpOptions).pipe(map(e => e.data), catchError(err => {
      console.error(err);
      return of([])
    }));
  }

}
