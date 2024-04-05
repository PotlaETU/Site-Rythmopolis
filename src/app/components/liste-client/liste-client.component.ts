import {Component, inject} from '@angular/core';
import {ClientService} from "../../services/client.service";
import {Observable} from "rxjs";
import {Client} from "../../models/client";
import {AsyncPipe} from "@angular/common";
import {GuardClients} from "../../services/acces-control.guard.ts.service";

@Component({
  selector: 'app-liste-client',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './liste-client.component.html',
  styleUrl: './liste-client.component.css'
})
export class ListeClientComponent {

  clientService: ClientService = inject(ClientService);
  clients$!: Observable<Client[]>;

  constructor() {
  }

  ngOnInit() {
    this.clients$ = this.clientService.getClients();

  }





}
