import {Component, inject} from '@angular/core';
import { RouterLink } from '@angular/router';
import {EventService} from "../../services/event.service";
import {Evenement} from "../../models/evenement";

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {

  event:EventService = inject(EventService);
  selectedEvent: Evenement | null = null;

  eventAleatoire(){
    this.event.events().subscribe((e)=>{
      let index = Math.floor(Math.random() * e.length);
      this.selectedEvent = e[index];
    })
  }
}
