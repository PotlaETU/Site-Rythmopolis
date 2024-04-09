import {Component, inject} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ClientService} from "../../services/client.service";
import {Client} from "../../models/client";
import {Reservation} from "../../models/reservation";
import {AuthentificationService} from "../../services/authentification.service";
import {Role} from "../../models/role";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-detail-client',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './detail-client.component.html',
  styleUrl: './detail-client.component.css'
})
export class DetailClientComponent {
  route = inject(ActivatedRoute);
  clientService = inject(ClientService);
  client?: Client;
  authService = inject(AuthentificationService);
  reservations? : Reservation[];
  loading = false;
  id=''

  form: FormGroup = new FormGroup({
    nom: new FormControl("", ),
    prenom: new FormControl("", ),
    adresse: new FormControl("", ),
    ville: new FormControl(""),
  });

  get nom(): any {
    return this.form.get('nom');
  }

  get prenom(): any {
    return this.form.get('prenom');
  }

  get adresse(): any {
    return this.form.get('adresse');
  }

  get ville(): any {
    return this.form.get('ville');
  }


  ngOnInit() {
    this.id = (this.route.snapshot.paramMap.get('id') || '1');
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
        // this.reservations = client.reservations
    });
  }

  modifUser() {
    this.loading = true;
    if (!(this.authService.userValue.role === Role.ADMIN)){
      this.loading = false;
      return;
    }
    this.clientService.setClient(this.id, this.form)
  }
}
