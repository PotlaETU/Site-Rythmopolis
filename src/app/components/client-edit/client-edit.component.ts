import {Component, inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {environment} from "../../../environments/environments";
import {ActivatedRoute, Router} from "@angular/router";
import {Role} from "../../models/role";
import {User} from "../../models/user";
import {ClientService} from "../../services/client.service";
import {Client} from "../../models/client";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  updateUser(id: number | undefined, data: any): Observable<any> {
    const url = `${environment.apiURL}/clients/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(url, data, httpOptions);
  }
}

@Component({
  selector: 'app-client-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.css'
})
export class ClientEditComponent {
  router = inject(Router);
  clientService = inject(ClientService);
  user? : User;
  id: number = 0
  client?: Client;

  editForm: FormGroup = new FormGroup({
    name: new FormControl([this.user?.name], Validators.required),
    email: new FormControl([this.user?.email], Validators.required),
    password: new FormControl([], Validators.required),
    confirmPassword: new FormControl([''], Validators.required),
    role: new FormControl([this.user?.role], Validators.required),
  });


  get name() {
    return this.editForm.get('name');
  }

  get email() {
    return this.editForm.get('adresse');
  }

  get password() {
    return this.editForm.get('password');
  }

  get confirmPassword() {
    return this.editForm.get('confirmPassword');
  }

  get role() {
    return this.editForm.get('role');
  }

  constructor(private fb: FormBuilder, private userService: UserService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.id = +(this.route.snapshot.paramMap.get('id') || 0);
    this.clientService.getUser(this.id.toString()).subscribe(user => { this.user = user; this.editForm.patchValue(user)});
  }


  checkPasswords(group: FormGroup) {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;

    return pass === confirmPass
  }

  onSubmit() {
    if (this.editForm.valid && this.checkPasswords(this.editForm)){
      this.userService.updateUser(this.user?.id, this.editForm.value).subscribe();
      console.log('User updated successfully');
      this.router.navigate([`/clients/${this.user?.id}`]);
    }
  }
}
