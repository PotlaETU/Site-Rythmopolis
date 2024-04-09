import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {EventService} from "../../services/event.service";
import {Evenement} from "../../models/evenement";
import {PrixService} from "../../services/prix.service";
import {Prix} from "../../models/prix";
import {AuthentificationService} from "../../services/authentification.service";
import {Role} from "../../models/role";

@Component({
  selector: 'app-detail-event',
  standalone: true,
  imports: [
    RouterLink,
  ],
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
