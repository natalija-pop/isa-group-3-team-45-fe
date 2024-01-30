import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Appointment } from '../model/company.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'users-scheduled-reservations',
  templateUrl: './users-scheduled-reservations.component.html',
  styleUrls: ['./users-scheduled-reservations.component.css']
})
export class UsersScheduledReservationsComponent implements OnInit{

  constructor(private companyService: CompanyService, private authService: AuthService) { }

  Appointments: Appointment[] = [];
  user: User = {
    id: 0,
    role: 0,
    email: "",
    password: "",
    name: "",
    surname: "",
    isActivated: false,
    penaltyPoints: 0
  };
  selectedAppointment: Appointment | undefined;

  sortDirection: string = '';

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });

    this.getProcessedAppointments();
  }

  getProcessedAppointments(): void {
    this.companyService.getCustomerScheduledAppointments(this.user.id).subscribe({
      next :(data) => {
        this.Appointments = data;
      },
      error: (error) => {
        console.error('Error fetching barcode images:', error);
      }
    });
  }

  cancelAppointmentConfirm(){
    //this.selectedAppointment = appointment;
    if(this.selectedAppointment != null){
      this.selectedAppointment.customerName = undefined;
      this.selectedAppointment.customerSurname = undefined;
      this.selectedAppointment.customerId = undefined;
      this.selectedAppointment.status = 0;

      console.log(this.selectedAppointment);
      this.companyService.cancelAppointment(this.selectedAppointment, this.user.id).subscribe({
        next: () => { 
          this.getProcessedAppointments();
        }
      })

    }

  }

  cancelAppointment(appointment: Appointment){
    this.selectedAppointment = appointment;
  }


  getPenaltyPoints(): number {
    if(this.selectedAppointment){
      const appointmentDate = new Date(this.selectedAppointment.start);
      const currentDate = new Date();
      const timeDifference = appointmentDate.getTime() - currentDate.getTime();
      const hoursDifference = Math.abs(timeDifference / (1000 * 3600));
    
      return hoursDifference <= 24 ? 2 : 1;
    }
    return 0;
  }
}
