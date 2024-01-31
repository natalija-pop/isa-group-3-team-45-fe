import { Component} from '@angular/core';
import { Position } from '../position.model';
import { RoutingService } from '../routing.service';
import { ActivationMessage } from '../activationMessage.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-position-simulator',
  templateUrl: './position-simulator.component.html',
  styleUrls: ['./position-simulator.component.css']
})
export class PositionSimulatorComponent{
  
  constructor(private routingService: RoutingService) {}
  
  private map: any;
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
        next: (result: any) => {
            if(result.message === 'Activation started'){
              this.showMap = true;
              return;
            }
        },
        error: (err) => alert('Error: ' + err.message)
      });
  }
}