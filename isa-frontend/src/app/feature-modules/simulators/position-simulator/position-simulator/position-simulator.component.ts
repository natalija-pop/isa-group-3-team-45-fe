import { AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { Position } from '../position.model';
import { RoutingService } from '../routing.service';
import { ActivationMessage } from '../activationMessage.model';
import { FormControl, FormGroup} from '@angular/forms';
import { SignalRService } from '../signal-r.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-position-simulator',
  templateUrl: './position-simulator.component.html',
  styleUrls: ['./position-simulator.component.css']
})
export class PositionSimulatorComponent implements OnInit, AfterViewInit{
  private carIcon = L.icon({
    iconUrl: 'assets/icons/car.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
 });
 

  private map: any;

  startMarker: L.Marker = L.marker([0, 0]);
  endMarker: L.Marker = L.marker([0, 0]);
  currentPositionMarker: L.Marker = L.marker([0, 0]);

  startPoint: Position = {
    longitude: 0.0,
    latitude: 0.0
  }
  endPoint: Position = {
    longitude: 0.0,
    latitude: 0.0
  }
  currentPosition: Position = this.startPoint;
  frequency: number = -1.0;
  showMap: boolean = false;
  
  constructor(private routingService: RoutingService, private signarRService: SignalRService) {}
  ngOnInit(): void {
    this.signarRService.stopSimulation$.subscribe((message) => {
      console.log('Stopping simulation. Delivery finished: ', message);
      alert('Stopping simulation. Delivery finished: ' +  message);
    });

    this.signarRService.newPosition$.subscribe((message) => {
      console.log('Position updated. Current position: ', message);
      this.currentPosition = message;
      this.move();
    })
  }
  

  ngAfterViewInit(): void {
    this.map = L.map('mapDiv').setView([45.267136, 19.833549], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
    console.log('Map Container:', document.getElementById('mapDiv'));
  }
  
  positionsForm = new FormGroup({
    startLongitude: new FormControl(),
    startLatitude: new FormControl(),
    endLongitude: new FormControl(),
    endLatitude: new FormControl()
  })

  
  activateSimulator(): void{
      if(this.frequency <= 0.0){
        alert("Error! You must enter frequency");
        return;
      }
      if( this.startPoint == this.endPoint){
        alert("Error! Start and End point should be different");
        return;
      }
      this.startPoint.longitude = Number.parseFloat(this.positionsForm.value.startLongitude || '') || 0.0;  
      this.startPoint.latitude = Number.parseFloat(this.positionsForm.value.startLatitude || '') || 0.0;  
      this.endPoint.longitude = Number.parseFloat(this.positionsForm.value.endLongitude || '') || 0.0;  
      this.endPoint.latitude = Number.parseFloat(this.positionsForm.value.endLatitude || '') || 0.0;  

      const activationMessage: ActivationMessage = {
        startPoint: this.startPoint,
        endPoint: this.endPoint,
        frequency: this.frequency
      };
      this.routingService.activateSimulator(activationMessage).subscribe({
        next: (result: string) => {
            if (result == "Activation started") {
                this.showMap = true;
                this.initializeMap();
            } else {
                console.error('Unexpected server response:', result);
            }
        },
        error: (err) => alert('Error: ' + err.message)
    });
  }

  private initializeMap(){
    this.startMarker = L.marker([this.startPoint.latitude, this.startPoint.longitude]).addTo(this.map);
    this.endMarker = L.marker([this.endPoint.latitude, this.endPoint.longitude]).addTo(this.map);
    this.currentPositionMarker = L.marker([this.startPoint.latitude, this.startPoint.longitude]).addTo(this.map);
  }

  private move(){
    if(this.currentPositionMarker != undefined){
      this.map.removeLayer(this.currentPositionMarker);
    }
    this.currentPositionMarker = new L.Marker([this.currentPosition.latitude, this.currentPosition.longitude],
    {
        icon: this.carIcon,
     }
    ).addTo(this.map);
  }
}