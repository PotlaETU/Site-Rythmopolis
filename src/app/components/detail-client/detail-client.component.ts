import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClientService} from "../../services/client.service";
import {Client} from "../../models/client";
import {Reservation} from "../../models/reservation";
import {AuthentificationService} from "../../services/authentification.service";
import {Role} from "../../models/role";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {waitForAsync} from "@angular/core/testing";

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
  router = inject(Router)
  clientService = inject(ClientService);
  client?: Client;
  user?: User;
  authService = inject(AuthentificationService);
  reservations? : Reservation[];
  loading = false;
  id: number = 0

  form: FormGroup = new FormGroup({
    nom: new FormControl("", ),
    prenom: new FormControl("", ),
    email: new FormControl("", ),
    avatar: new FormControl("", ),
    adresse: new FormControl("", ),
    ville: new FormControl(""),
    code_postal: new FormControl(""),
  });

  get nom(): any {
    return this.form.get('nom');
  }

  get prenom(): any {
    return this.form.get('prenom');
  }

  get email(): any {
    return this.form.get('email');
  }

  get avatar(): any {
    return this.form.get('avatar');
  }

  get adresse(): any {
    return this.form.get('adresse');
  }

  get ville(): any {
    return this.form.get('ville');
  }

  get code_postal(): any {
    return this.form.get('code_postal');
  }


  ngOnInit() {
    this.id = +(this.route.snapshot.paramMap.get('id') || 0);
    this.clientService.getClient(this.id.toString()).subscribe(client => { this.client = client; this.form.patchValue(client); });
    this.clientService.getUser(this.id.toString()).subscribe(user => { this.user = user;});
    this.clientService.getReservation(this.id.toString()).subscribe(reservations => { this.reservations = reservations});
  }

  modifUser() {
    this.loading = true;
    if (!(this.authService.userValue.role === Role.ADMIN)){
      this.loading = false;
      return;
    }
    this.clientService.setClient(this.id, this.form)
  }

  onModif(){
    this.router.navigate([`/clients/${this.user?.id}/edit`]);
  }

}
