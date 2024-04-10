import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {EventService} from "../../services/event.service";
import {PrixService} from "../../services/prix.service";
import {Prix} from "../../models/prix";
import {AuthentificationService} from "../../services/authentification.service";
import {Evenement} from '../../models/evenement';

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
  loadingSuppr = false;
  loading = false;
  evenement: Evenement | undefined;

  constructor(private router: Router) {
    this.evenement = undefined
    this.getEvent()
  }

  ngOnInit() {
    const id: number = +(this.route.snapshot.paramMap.get('id') || 0);
    this.prixService.getEvenementById(id).subscribe(
      prix => {
        prix.forEach(p => {
          this.prix?.push(p);
        });
      }
    );
  }

  getEvent() {
    let evenementLoad: Evenement
    this.eventService.getFutureEvents().subscribe(
      e => {
        e.forEach(ev => {
          if (ev.id === +(this.route.snapshot.paramMap.get('id') || 0)) {
            evenementLoad = ev;
          }
        });
      }
    );
    this.loading = true
    setTimeout(()=>{
      this.evenement = evenementLoad
      this.loading = false
      console.log(this.evenement)
    }, 2000)
  }

  supprEvent() {
    this.loadingSuppr = true;
    if(this.evenement?.id){
      this.eventService.deleteEvent(this.evenement.id);
    }
    this.loadingSuppr = false;
    this.router.navigateByUrl('/evenements');
  }
}
