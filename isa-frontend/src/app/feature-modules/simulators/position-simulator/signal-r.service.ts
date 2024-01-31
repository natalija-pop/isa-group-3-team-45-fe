import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { wss } from 'src/env/environment';
import { Position } from './position.model';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  
  private hubConnection: signalR.HubConnection;
  public stopSimulation$ = new Subject<string>();
  public newPosition$ = new Subject<Position>();

  constructor() { 
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(wss.apiHost +  'position-simulator-hub', { withCredentials: true })
    .build();

    this.hubConnection
    .start()
    .then(() => console.log('SignalR connection started'))
    .catch((err) => console.log('Error while starting SignalR: ' + err));
  
    this.registerStopSimulationEvent();
    this.registerReceiveNewPositionEvent();
  }
 
  private registerReceiveNewPositionEvent() {
    this.hubConnection.on('ReceiveNewPosition', (message: Position) => {
      this.newPosition$.next(message);
    })
  }
  private registerStopSimulationEvent(){
    this.hubConnection.on('StopSimulation', (message: string) => {
      this.stopSimulation$.next(message);
    });
  }
}