import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {User} from "../models/user";
import {environment} from "../../environments/environments";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Lieu} from "../models/lieu";

@Injectable({
  providedIn: 'root'
})
export class LieuService {

  constructor(protected http : HttpClient) { }

  getLieux():Observable<Lieu[]>{
    const url = `${environment.apiURL}/lieux`;
    const token = JSON.parse(localStorage.getItem('user') || '{}' ).token;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'authorization': `bearer ${token}`})
    };
    return this.http.get<{lieux: Lieu[]}>(url, httpOptions).pipe(
      map(res => res.lieux)
    );
  }

}


