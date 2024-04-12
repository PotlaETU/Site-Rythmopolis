import {Component, inject, OnInit} from '@angular/core';
import {Reservation} from "../../models/reservation";
import {AuthentificationService} from "../../services/authentification.service";
import {ReservationService} from "../../services/reservation.service";
import {Router, RouterLink} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {Observable} from "rxjs";

@Component({
  selector: 'app-liste-reservation',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './liste-reservation.component.html',
  styleUrl: './liste-reservation.component.css'
})
export class ListeReservationComponent implements OnInit{
  reservations: Reservation[] = [];
  authService:AuthentificationService = inject(AuthentificationService)
  loading =  false;

  constructor(private reservationsService: ReservationService, private router: Router){
  }

  ngOnInit(): void {
    this.getReservations()
  }

  getReservations(){
    this.loading = true;
    this.reservationsService.getRservations().subscribe(reservations => {
      console.log(reservations)
      this.reservations = reservations;
    })
    this.loading = false
  }

  dateFinDeValidite(date: string){
    let reservationDate = new Date(date);
    reservationDate.setHours(reservationDate.getHours() + 12);
    return reservationDate.toISOString().slice(0, 16).replace('T', ' ')
  }

  getDate(int: Date){
    return new Date(int).toISOString().slice(0, 16).replace('T', ' ')
  }

  setPaye(reservation: Reservation){
    this.reservationsService.updateReservation(reservation.id, "payé").subscribe(
      updateReservation => {
        console.log(updateReservation)
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/reservations']).then(r => console.log(r));
        })
      }
    )
  }

  setBilletEdite(reservation: Reservation){
    this.reservationsService.updateReservation(reservation.id, "billet édité").subscribe(
      updateReservation => {
        console.log(updateReservation)
      }
    )
  }
}
