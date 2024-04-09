import {Component, inject} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ClientService} from "../../services/client.service";
import {Client} from "../../models/client";
import {Reservation} from "../../models/reservation";
import {EventService} from "../../services/event.service";
import {Evenement} from "../../models/evenement";
import {PrixService} from "../../services/prix.service";
import {Prix} from "../../models/prix";
import {AuthentificationService} from "../../services/authentification.service";

@Component({
  selector: 'app-detail-event',
  standalone: true,
  imports: [],
  templateUrl: './detail-event.component.html',
  styleUrl: './detail-event.component.css'
})
export class DetailEventComponent {
  route = inject(ActivatedRoute);
  eventService = inject(EventService);
  prixService = inject(PrixService);
  authService = inject(AuthentificationService);
  prix?: Prix;
  evenement?: Evenement
  user = this.authService.userValue;


  ngOnInit() {
    const id: number = +(this.route.snapshot.paramMap.get('id') || 0);
    this.prixService.getEvenementById(+id).subscribe(prix => {
      this.prix = prix;
      if (this.prix)
        this.evenement = this.prix.evenement;
    });
  }
}
