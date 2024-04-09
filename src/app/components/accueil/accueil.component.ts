import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventService } from "../../services/event.service";
import { Evenement } from "../../models/evenement";
import { MessageService } from "../../services/message.service";
import { NgIf } from "@angular/common";
import { AuthentificationService } from '../../services/authentification.service';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent implements OnInit {

  message: string | null = null;

  event: EventService = inject(EventService);
  selectedEvent: Evenement | null = null;
  authServ = inject(AuthentificationService);

  isLoggedVar: boolean = false;

  constructor(private messageService: MessageService) {
  }

  eventAleatoire() {
    this.event.events().subscribe((e) => {
      let index = Math.floor(Math.random() * e.length);
      this.selectedEvent = e[index];
    })
  }

  isLogged() {
    this.authServ.isLoggedIn$.subscribe((value) => {
      this.isLoggedVar = value;
    });
    return this.isLoggedVar;
  }

  ngOnInit() {
    this.message = this.messageService.getMessage();
    this.messageService.setMessage('');
    this.isLogged();
  }
}
