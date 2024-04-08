import {Component, inject} from '@angular/core';
import {ClientService} from "../../services/client.service";
import {map, Observable} from "rxjs";
import {Client} from "../../models/client";
import {AsyncPipe} from "@angular/common";
import {AuthGuard} from "../../services/acces-control.guard.ts.service";

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

  clients(sort: number = 1 | 2){
    if(sort === 1){
      this.clients$ = this.clientService.getClients().pipe(
        map(clients => clients.sort((a, b) => a.nom > b.nom ? 1 : -1))
      );
    }
    else if(sort === 2){
      this.clients$ = this.clientService.getClients().pipe(
        map(clients => clients.sort((a, b) => a.ville > b.ville ? 1 : -1))
      );
    }
  }







}
