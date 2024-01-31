import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Appointment, AppointmentStatus } from '../model/company.model';
import { dA } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'barcodes-page',
  templateUrl: './barcodes-page.component.html',
  styleUrls: ['./barcodes-page.component.css']
})
export class BarcodesPageComponent implements OnInit {

  base64ImageStrings: string[] = [];
  dataUri: string[] = [];
  filteredDataUri: string[] = [];
  Appointments: Appointment[] = [];
  AllAppointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  status: string = '';

  user: User = {
    id: 0,
    role: 0,
    email: "",
    password: "",
    name: "",
    surname: "",
    isActivated: false,
    penaltyPoints: 0,
  };
  constructor(private companyService: CompanyService, private authService: AuthService) {}


  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    this.getBarcodeImages();
    this.getAppointments();
  }

  getBarcodeImages(): void {
    this.companyService.getBarcodeImages(this.user.id).subscribe({
      next: (data) => {
        const dataURIs: string[] = [];

      data.forEach((base64ImageString: string) => {
        const dataURI = 'data:image/png;base64,' + base64ImageString;
        dataURIs.push(dataURI);
      });

      this.dataUri = dataURIs;
    },
      error: (error) => {
        console.error('Error fetching barcode images:', error);
      }
    });
  }

  getAppointments() : void {
    this.companyService.getCustomerAppointments(this.user.id).subscribe({
      next :(data) => {
        this.Appointments = data;
        this.AllAppointments = this.Appointments;
        console.log(this.Appointments); 
      },
      error: (error) => {
        console.error('Error fetching barcode images:', error);
      }
    });
  }

  getStatusString(status: AppointmentStatus): string {
    switch (status) {
      case AppointmentStatus.predefined: return 'Predefined';
      case AppointmentStatus.scheduled: return 'Scheduled';
      case AppointmentStatus.canceled: return 'Canceled';
      case AppointmentStatus.processed: return 'Processed';
      default: return 'Unknown';
    }
  }

  filterBarcodesByStatus(){
    this.Appointments = this.getAppointmentsByStatus(this.status);
  }

  getAppointmentsByStatus(status: string): Appointment[] {
    let statusEnum: AppointmentStatus;
  
    switch (status) {
      case '1':
        statusEnum = 1;
        break;
      case '2':
        statusEnum = 2;
        break;
      case '3':
        statusEnum = 3;
        break;
      default:
        return this.Appointments;
    }
    
    const filteredAppointments = this.AllAppointments.filter(appointment => appointment.status === statusEnum);
    
    return filteredAppointments;
  }
}
