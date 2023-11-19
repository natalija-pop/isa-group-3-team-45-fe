import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllEquipmentPageComponent } from './all-equipment-page/all-equipment-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AllEquipmentPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    AllEquipmentPageComponent
  ]
})
export class EquipmentModule { }
