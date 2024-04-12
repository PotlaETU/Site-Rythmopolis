import {Injectable} from "@angular/core";
import {environment} from "../../environments/environments";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Reservation} from "../models/reservation";
import {catchError, map} from "rxjs/operators";
import {Evenement} from "../models/evenement";
import {Client} from "../models/client";

@Injectable({
  providedIn: 'root'
})

export class ReservationService{

  eventsUrl = `${environment.apiURL}/reservations/client`;

  constructor(private http: HttpClient) {
  }

  getRservations() : Observable<Reservation[]>{
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user.token;

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'authorization': `bearer ${token}`})
    };

    return this.http.get<{data: Reservation[]}>(this.eventsUrl, httpOptions).pipe(
      map(res =>
        res.data
      ), catchError(err => {
        console.log(err)
        return of([])
      }))
    };

  updateReservation(id: number, statut: string){
    const url = `${environment.apiURL}`+'/reservations/'+ id + '/statut'
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const token = user.token

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'authorization': `bearer ${token}`})
    }

    const body = {
      statut: statut
    }

    console.log(id)

    return this.http.put(url, body, httpOptions).pipe(
      map(res => res), catchError(err => {
        console.log(err)
        return of([])
      }))
  }

}
