import {Component, inject, OnInit, Pipe} from '@angular/core';
import {EventService} from '../../services/event.service';
import {Evenement} from '../../models/evenement';
import {Role} from '../../models/role';
import {AuthentificationService} from "../../services/authentification.service";
import {Participant} from "../../models/participant";
import {Artiste} from "../../models/artiste";
import {map, Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './liste-event.component.html',
  styleUrl: './liste-event.component.css'
})
export class EventListComponent implements OnInit {
  events: Evenement[] = [];
  authService:AuthentificationService = inject(AuthentificationService)
  artistesEvent: Artiste[] = [];
  loading =  false;
  messageService = inject(MessageService)

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    console.log(this.messageService.getMessage())
    this.getEvents();
  }

  getEvents(): void {
    this.loading = true;
    this.eventService.getFutureEvents().subscribe(events => {
      this.events = events;
      this.events.forEach(e=>{
        e.artistes.forEach(a=>{
          this.artistesEvent.push(a)
        })
      })
      this.loading = false;
    });
  }

  getArtistes(id: number): Artiste[] {
    this.loading = true;
    let artisteListe:Artiste[] = []
    console.log(this.events)
    this.events.forEach(e=>{
      if(e.id == id){
        e.artistes.forEach(a=>{
          artisteListe.push(a)
        })
      }
    })
    this.loading = false;
    return artisteListe
  }

  sortEvent(sort: number = 1 | 2){
    if(sort === 1){
      this.events.sort(
        (a, b)=>{
          if(a.lieu.adresse>b.lieu.adresse){
            return 1
          }
          else {
            return -1
          }
        }
      )
    }
    else if(sort === 2){
      this.events.sort(
        (a, b)=>{
          if(a.titre>b.titre){
            return 1
          }
          else {
            return -1
          }
        }
      )
    }
  }

}
