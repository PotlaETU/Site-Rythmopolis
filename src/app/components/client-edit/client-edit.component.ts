import {Component, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {environment} from "../../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  updateUser(data: any): Observable<any> {
    const url = `${environment.apiURL}/clients`;
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
  editForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    adresse: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    role: ['', Validators.required]
  }, {validator: this.checkPasswords });

  roles: string[] = ['Gestionnaire', 'Admin', 'Actif'];

  constructor(private fb: FormBuilder, private userService: UserService) { }


  checkPasswords(group: FormGroup) {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  onSubmit() {
    if (this.editForm.valid) {
      this.userService.updateUser(this.editForm.value).subscribe();
    }
  }
}
