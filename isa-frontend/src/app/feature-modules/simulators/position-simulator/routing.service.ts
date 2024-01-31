import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';import { ActivationMessage } from './activationMessage.model';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private http: HttpClient) {}

  activateSimulator(activationMessage: ActivationMessage): Observable<string> {
    return this.http.post<string>(environment.apiHost + 'activate-simulator', activationMessage);
  }

}
