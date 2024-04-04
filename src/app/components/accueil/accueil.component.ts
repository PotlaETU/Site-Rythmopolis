import { Component } from '@angular/core';
import {EventService} from "../../services/event.service";

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  events: any[] = [];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.events().subscribe(events => {
      this.events = this.selectRandomEvents(events, 5);
    });
  }

  selectRandomEvents(events: any[], count: number): any[] {
    return events.sort(() => 0.5 - Math.random()).slice(0, count);
  }

  protected readonly event = event;
}
