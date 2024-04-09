import { Injectable } from '@angular/core';
import {environment} from "../../environments/environments";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {Prix} from "../models/prix";

@Injectable({
  providedIn: 'root'
})
export class PrixService {

  constructor(protected http : HttpClient) { }

  getAllPrix(eventId: number) {
    const url = `${environment.apiURL}/evenements/${eventId}/prix`;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.get<{prix: Prix[]}>(url, httpOptions).pipe(
      map(res => res.prix),      
      catchError(err => {
        console.log('Erreur http : ', err);
        return of([]);
      }),
    );
  }

  getEvenementById(id: number) {
    const prix = this.getAllPrix(id);
    return prix
  }
}
