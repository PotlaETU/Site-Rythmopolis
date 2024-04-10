import {Injectable} from "@angular/core";
import {environment} from "../../environments/environments";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Reservation, Reservation2} from "../models/reservation";
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

  getRservations() : Observable<Reservation2[]>{
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user.token;

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'authorization': `bearer ${token}`})
    };

    return this.http.get<{data: Reservation2[]}>(this.eventsUrl, httpOptions).pipe(
      map(res =>
        res.data
      ), catchError(err => {
        console.log(err)
        return of([])
      }))
    };

    // this.http.get<{ data: Reservation2[] }>(this.eventsUrl, httpOptions).pipe(
    //   map(res => res.data),
    //   catchError(err => {
    //     console.log('Erreur http : ', err);
    //     return of([]);
    //   }),
    // );

}
