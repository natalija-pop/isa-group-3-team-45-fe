import { Component, OnInit } from '@angular/core';
import { EquipmentService } from '../equipment.service';
import { Equipment, EquipmentType } from '../model/equipment.model';

@Component({
  selector: 'app-all-equipment-page',
  templateUrl: './all-equipment-page.component.html',
  styleUrls: ['./all-equipment-page.component.css']
})
export class AllEquipmentPageComponent implements OnInit{

  constructor(private service: EquipmentService) {}
  
  searchKeyword: string = '';
  equipment: Equipment[] = [];
  searchedEquipment: Equipment[] = [];
  equipmentType: string = '';
  
  ngOnInit(): void {
    this.service.getAll().subscribe(
      (result: any) => {
        this.equipment = result.results;
        this.searchedEquipment = this.equipment;
      }
    )
  }

  searchEquipment() {
    this.service.getSearchResults(this.searchKeyword).subscribe(
      (result: any) => {
        this.equipment = result;
        this.searchedEquipment = this.equipment;
      }  
    )
  }
  
  filterEquipmentByType(){
    if(this.equipmentType == 'All'){
      this.equipment = this.searchedEquipment;
    }
    else{
      this.equipment = this.searchedEquipment.filter(e => this.getEquipmentTypeString(e.type) == this.equipmentType);
    }
  }

  getEquipmentTypeString(type: EquipmentType): string {
    switch (type) {
      case EquipmentType.Instrument: return 'Instrument';
      case EquipmentType.Surgical: return 'Surgical';
      case EquipmentType.Sterile: return 'Sterile';
      case EquipmentType.Mask: return 'Mask';
      default: return '';
    }
  }
}
