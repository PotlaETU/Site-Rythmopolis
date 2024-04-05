import {Component, Injectable, NgModule, OnInit} from '@angular/core';
import { EventService } from '../../services/event.service';
import { Evenement } from '../../models/evenement';
import { Role } from '../../models/role';

@Component({
  selector: 'app-event-list',
  standalone: true,
  templateUrl: './evenements.component.html',
  styleUrl: './evenements.component.css'
})
export class EventListComponent implements OnInit {
  events: Evenement[] = [];
  selectedEvent: Evenement | null = null;
  userRole: Role = Role.ACTIF;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.events().subscribe(events => this.events = events);
  }

  onSelect(event: Evenement): void {
    this.selectedEvent = event;
  }

  canEdit(): boolean {
    return this.userRole === Role.GESTIONNAIRE || this.userRole === Role.ADMIN;
  }

  canDelete(): boolean {
    return this.userRole === Role.ADMIN;
  }
}
