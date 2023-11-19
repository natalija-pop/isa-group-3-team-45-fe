import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Company } from '../model/company.model';
import { Equipment, EquipmentType } from '../model/equipment.model';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  selectedNavItem: 'description' | 'companyInfo' | 'equipment' = 'description';
  company: Company | undefined;
  equipmentList: Equipment[] = [];

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.getCompanyById(1);
    this.getEquipment(1);
  }

  getCompanyById(id: number): void {
    this.companyService.getCompanyById(id).subscribe((result: any) => {
      console.log(result);
      this.company = result;
    })
  }

  getEquipment(id: number): void {
    this.companyService.getEquipmentByCompanyId(id).subscribe((result: any) => {
      this.equipmentList = result;
    })
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

  showDescription() {
    this.selectedNavItem = 'description';
  }

  showCompanyInfo() {
    this.selectedNavItem = 'companyInfo';
  }

  showEquipment() {
    this.selectedNavItem = 'equipment';
  }
}
