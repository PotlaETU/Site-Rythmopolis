import { Component, inject } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Evenement } from '../../models/evenement';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-event-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './event-edit.component.html',
  styleUrl: './event-edit.component.css'
})
export class EventEditComponent {
  route = inject(ActivatedRoute);
  eventService = inject(EventService);

  evenement: Evenement = this.getEvent();

  form = new FormGroup({
    titre: new FormControl(this.evenement.titre, [Validators.required]),
    date_event: new FormControl(this.evenement.date_event, [Validators.required]),
    description: new FormControl(this.evenement.description, [Validators.required]),
  });
  
  router = inject(Router);

  
  loading: boolean = false;

  constructor(private http: HttpClient) {

  }

  get titre() {
    return this.form.get('titre')
  }

  get date_event() {
    return this.form.get('titre')
  }
  get description() {
    return this.form.get('titre')
  }



  getEvent() {
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

  updateEvent() {
    this.loading = true
    const token = JSON.parse(localStorage.getItem('user') || '{}').token
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': `bearer ${token}` })
    };
    const eventsUrl = `${environment.apiURL}/evenements/${this.evenement.id}`;
    this.http.put(eventsUrl, this.form.value, httpOptions)
    this.loading = false
    this.router.navigateByUrl(`/evenements/${this.evenement.id}`)
  }

}
