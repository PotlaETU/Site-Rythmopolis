import {Component, inject} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Lieu} from "../../models/lieu";
import {LieuService} from "../../services/lieu.service";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {Artiste} from "../../models/artiste";
import {Evenement} from "../../models/evenement";
import {EventService} from "../../services/event.service";
import {Type} from "../../models/type";
import {Router} from "@angular/router";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-create-evenement',
  standalone: true,
  imports: [
    ReactiveFormsModule, AsyncPipe
  ],
  templateUrl: './create-evenement.component.html',
  styleUrl: './create-evenement.component.css'
})
export class CreateEvenementComponent {
  lieuService: LieuService = inject(LieuService);
  eventService = inject(EventService);
  router = inject(Router);

  form = new FormGroup({
    titre: new FormControl(''),
    description: new FormControl(''),
    date_event: new FormControl(''),
    lieu_id: new FormControl(''),
    artistes: new FormArray([])
  });

  lieux: Lieu[] = [];
  events: Evenement[] = []
  artistesList: Artiste[] = [];
  types: Type[] = Object.values(Type);

  messageService = inject(MessageService)
  loading:boolean = false


  get titre() {
    return this.form.get('titre');
  }

  get description() {
    return this.form.get('description');
  }

  get date_event() {
    return this.form.get('date_event');
  }

  get lieu_id() {
    return this.form.get('lieu_id');
  }

  get artistes() {
    return this.form.get('artistes');
  }

  ngOnInit() {
    this.lieuService.getLieux().subscribe(
      lieux => {
        lieux.forEach(l => {
          this.lieux.push(l);
        });
      }
    );
    this.eventService.getFutureEvents().subscribe(events => {
      this.events = events;
      let artistesMap: any = {};
      this.events.forEach(e => {
        e.artistes.forEach(a => {
          if (!artistesMap[a.id]) {
            this.artistesList.push(a);
            artistesMap[a.id] = true;
          }
        })
      });
    });
  }

  onCheckboxChange(e: any) {
    const artistes: FormArray = this.form.get('artistes') as FormArray;

    if (e.target.checked) {
      artistes.push(new FormControl(e.target.value));
    } else {
      // let i: number = 0;
      // artistes.controls.forEach((item: FormControl) => {
      //   if (item.value == e.target.value) {
      //     artistes.removeAt(i);
      //     return;
      //   }
      //   i++;
      // });
    }
  }

  getArtiste(): Artiste[] {
    let artisteListe: Artiste[] = []
    console.log(this.events)
    this.events.forEach(e => {
      e.artistes.forEach(a => {
        artisteListe.push(a)
      })
    })
    return artisteListe
  }

  onSubmit() {
    this.loading = true
    console.log(this.form.value);
    this.eventService.createEvenement(this.form).subscribe(e => {
      console.log('Evenement créé');
    });
    this.loading = false
    this.messageService.setMessage("Evenement créé !")
    this.router.navigateByUrl('/liste-event')
  }


}
