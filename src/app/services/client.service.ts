import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Client} from "../models/client";
import {map, Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {environment} from "../../environments/environments";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {User} from "../models/user";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(protected http : HttpClient) { }

  getClients():Observable<Client[]> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user.token;
    const url = `${environment.apiURL}/clients`;

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'authorization': `bearer ${token}`})
    };

    // const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
    // headers.set('Content-Type', 'application/json');
    // console.log(headers.get('Authorization'))

    this.http.get<{clients: Client[]}>(url, httpOptions).pipe(
      map(res =>
        res.clients
      )).subscribe(clients => console.log(clients));

    return this.http.get<{clients: Client[]}>(url, httpOptions).pipe(
      map(res =>
        res.clients
      ),catchError(err => {
        console.log('Erreur http : ', err);
        return of([]);
      }),
    );
  }

  getClient(id: string): Observable<Client> {
    const url = `${environment.apiURL}/clients/${id}`;
    const token = JSON.parse(localStorage.getItem('user') || '{}').token;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'authorization': `bearer ${token}`})
    };
    return this.http.get<{clients: Client}>(url, httpOptions).pipe(
      map(res => res.clients)
    );
  }

  setClient(id:string, form: FormGroup):Observable<Client>{
    const url = `${environment.apiURL}/clients/${id}`;
    const token = JSON.parse(localStorage.getItem('user') || '{}').token;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'authorization': `bearer ${token}`})
    };
    return this.http.put<{clients: Client}>(url, form.value ,httpOptions).pipe(
      map(res => res.clients),catchError(err => {
        console.log('Erreur SetClients : ', err);
        return of();
      })
    );
  }
}
