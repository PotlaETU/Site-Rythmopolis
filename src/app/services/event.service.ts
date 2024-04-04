import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventsUrl = 'api/events';  // URL to web api

  constructor(private http: HttpClient) { }

  events(): Observable<any[]> {
    return this.http.get<any[]>(this.eventsUrl);
  }
}
