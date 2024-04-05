import {Component, inject} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ClientService} from "../../services/client.service";
import {Client} from "../../models/client";
import {Reservation} from "../../models/reservation";

@Component({
  selector: 'app-detail-client',
  standalone: true,
  imports: [],
  templateUrl: './detail-client.component.html',
  styleUrl: './detail-client.component.css'
})
export class DetailClientComponent {
  route = inject(ActivatedRoute);
  clientService = inject(ClientService);
  client?: Client;
  reservations? : Reservation[];


  ngOnInit() {
    const id: number = +(this.route.snapshot.paramMap.get('id') || 0);
    this.clientService.getClient(+id).subscribe(client => {
      this.client = client;
      this.reservations = client.reservations
    });
  }
}
