import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Client} from "../models/client";
import {map, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {environment} from "../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(protected http : HttpClient) { }

  getClients() {
    const url = `${environment.apiURL}/clients`;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.get<{data: Client[]}>(url, httpOptions).pipe(
      map(res => res.data),
      catchError(err => {
        console.log('Erreur http : ', err);
        return of([]);
      }),
    );
  }
}
