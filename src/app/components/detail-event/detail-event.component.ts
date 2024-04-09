import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {EventService} from "../../services/event.service";
import {PrixService} from "../../services/prix.service";
import {Prix} from "../../models/prix";
import {AuthentificationService} from "../../services/authentification.service";
import { Evenement } from '../../models/evenement';

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
  prix: Prix[] = [];
  user = this.authService.userValue;
  evenement:Evenement = this.getEvent();
  loadingSuppr = false;
  loading = false;

  constructor(private router:Router){

  }

  ngOnInit() {
    this.loading = true;
    const id: number = +(this.route.snapshot.paramMap.get('id') || 0);
    this.prixService.getEvenementById(id).subscribe(
      prix => { 
        prix.forEach(p => {
          console.log(p);
          this.prix?.push();
        });
      }
    );
    console.log(this.prix);
    this.loading = false;
  }

  getEvent(): Evenement {
    this.eventService.getFutureEvents().subscribe(
      e => {
        e.forEach(ev => {
          if (ev.id === +(this.route.snapshot.paramMap.get('id') || 0)) {
            this.evenement = ev;
          }
        });
      }
    );
    return this.evenement;
  }

  supprEvent(){
    this.loadingSuppr = true;
    this.eventService.deleteEvent(this.evenement.id);
    this.loadingSuppr = false;
    this.router.navigateByUrl('/evenements');
  }
}
