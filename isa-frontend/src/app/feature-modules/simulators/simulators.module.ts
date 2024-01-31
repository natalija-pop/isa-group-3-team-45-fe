import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PositionSimulatorComponent } from './position-simulator/position-simulator/position-simulator.component';


@NgModule({
  declarations: [
    PositionSimulatorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SimulatorsModule { }