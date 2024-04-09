import {Component, inject, OnInit, Pipe} from '@angular/core';
import {EventService} from '../../services/event.service';
import {Evenement} from '../../models/evenement';
import {Role} from '../../models/role';
import {AuthentificationService} from "../../services/authentification.service";
import {Participant} from "../../models/participant";
import {Artiste} from "../../models/artiste";
import {map, Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './liste-event.component.html',
  styleUrl: './liste-event.component.css'
})
export class EventListComponent implements OnInit {
  events: Evenement[] = [];
  authService:AuthentificationService = inject(AuthentificationService)
  artistesEvent: Artiste[] = [];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getFutureEvents().subscribe(events => {
      this.events = events;
      console.log(this.events)
      this.events.forEach(e=>{
        e.artistes.forEach(a=>{
          this.artistesEvent.push(a)
        })
      })
    });
    console.log(this.events)
  }

  getArtistes(id: number): Artiste[] {
    let artisteListe:Artiste[] = []
    console.log(this.events)
    this.events.forEach(e=>{
      if(e.id == id){
        e.artistes.forEach(a=>{
          artisteListe.push(a)
        })
      }
    })
    console.log(artisteListe)
    return artisteListe
  }

}
