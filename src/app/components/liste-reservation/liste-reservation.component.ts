import {Component, inject, OnInit} from '@angular/core';
import {Reservation, Reservation2} from "../../models/reservation";
import {AuthentificationService} from "../../services/authentification.service";
import {ReservationService} from "../../services/reservation.service";
import {RouterLink} from "@angular/router";
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
  reservations: Reservation2[] = [];
  authService:AuthentificationService = inject(AuthentificationService)
  loading =  false;

  constructor(private reservationsService: ReservationService) {
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
}
