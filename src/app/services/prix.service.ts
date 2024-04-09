import { Injectable } from '@angular/core';
import {environment} from "../../environments/environments";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Client} from "../models/client";
import {map, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {Prix} from "../models/prix";

@Injectable({
  providedIn: 'root'
})
export class PrixService {

  constructor(protected http : HttpClient) { }

  getAllPrix() {
    const url = `${environment.apiURL}/prix`;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.get<{data: Prix[]}>(url, httpOptions).pipe(
      map(res => res.data),
      catchError(err => {
        console.log('Erreur http : ', err);
        return of([]);
      }),
    );
  }

  getEvenementById(id: number) {
    const prix = this.getAllPrix();
    return prix.pipe(map(prix => prix.find(p => p.evenement.id === id)));
  }
}
