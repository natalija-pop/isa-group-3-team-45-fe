import { Component, Output } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { StakeholdersModule } from '../../stakeholders/stakeholders.module';
import { StakeholdersService } from '../../stakeholders/stakeholders.service';
import { CompanyService } from '../company.service';
import { Company } from '../model/company.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-company-profile',
  templateUrl: './edit-company-profile.component.html',
  styleUrls: ['./edit-company-profile.component.css']
})
export class EditCompanyProfileComponent {
  editMode: boolean = false;
  changePassword: boolean = false;

  constructor(private route: ActivatedRoute, private companyService: CompanyService) { }

  companyId: number = 0;
  company: Company = {
    id: 0,
    name: '',
    description: '',
    rating: 0,
    workingHours: {
      openingHours: '',
      closingHours: '',
      weekends: false
    },
    address: {
      street: '',
      number: 0,
      city: '',
      country: '',
      longitude: 0,
      latitude: 0,
    },
    workCalendar: []
  }

  ngOnInit() {
    this.editMode = false;
    this.route.params.subscribe(params => {
      this.companyId = +params['id'];
    });
    this.getCompanyById(this.companyId);

  }

  switchMode(newMode: boolean) {
    this.getCompanyById(this.companyId);
  }

  getCompanyById(id: number): void {
    this.companyService.getCompanyById(id).subscribe((result: any) => {
      console.log(result);
      this.company = result;
    })
  }

  saveChanges() {
    this.companyService.updateCompany(this.company).subscribe({
      next: () => { }
    })
  }


  GetLatitude(latitude: number) {
    this.company.address.latitude = latitude;
  }


  GetLongitude(longitude: number) {
    this.company.address.longitude = longitude;
  }
}
