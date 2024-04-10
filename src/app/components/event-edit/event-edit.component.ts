import { Component, inject } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Evenement } from '../../models/evenement';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import {DetailEventComponent} from "../detail-event/detail-event.component";

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

  evenement: Evenement | undefined = undefined
  form = new FormGroup({
    titre: new FormControl(this.evenement?.titre, [Validators.required]),
    date_event: new FormControl(this.evenement?.date_event, [Validators.required]),
    description: new FormControl(this.evenement?.description, [Validators.required]),
  });

  router = inject(Router);


  loading: boolean = false;

  loadingChange:boolean = false

  constructor(private http: HttpClient) {
    this.getEvent()
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
    //On attends que l'API renvoie les données correctement (undefined sans setTimeout())
    setTimeout(()=>{
      this.evenement = evenementLoad
      console.log('fin : ',this.evenement)
      this.form.patchValue({
        titre:this.evenement?.titre,
        date_event: this.evenement?.date_event,
        description: this.evenement?.description
      })
      this.loading = false
    }, 2000)
  }

  updateEvent() {
    this.loadingChange = true
    const token = JSON.parse(localStorage.getItem('user') || '{}').token
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': `bearer ${token}` })
    };
    const eventsUrl = `${environment.apiURL}/evenements/${this.evenement?.id}`;
    console.log(this.form.value)
    this.http.put<any>(eventsUrl, this.form.value, httpOptions).subscribe(e=>{
      console.log('Update : ' + e.status)
    })
    this.loadingChange = false
    this.router.navigateByUrl(`/evenements/${this.evenement?.id}`)
  }
}
