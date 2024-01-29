import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Appointment } from '../model/company.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'users-processed-reservations',
  templateUrl: './users-processed-reservations.component.html',
  styleUrls: ['./users-processed-reservations.component.css']
})
export class UsersProcessedReservationsComponent implements OnInit{
  constructor(private companyService: CompanyService, private authService: AuthService) { }

  Appointments: Appointment[] = [];
  sortedAppointments: Appointment[] = [];
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

  sortDirectionDate: string = '';
  sortDirectionPrice: string = '';


  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });

    this.getProcessedAppointments();
  }

  getProcessedAppointments(): void {
    this.companyService.getCustomerProcessedAppointments(this.user.id).subscribe({
      next :(data) => {
        this.Appointments = data;
        this.getAppointmentsPrice(this.Appointments);
        this.sortedAppointments = this.Appointments;
        console.log(this.sortedAppointments); 
      },
      error: (error) => {
        console.error('Error fetching barcode images:', error);
      }
    });
  }

  getAppointmentsPrice(appointments: Appointment[]): void {
    appointments.forEach(appointment => {
      appointment.price = this.calculateAppointmentPrice(appointment);
    });
  }
  
  calculateAppointmentPrice(appointment: Appointment): number {
    let totalPrice = 0;
    appointment.equipment?.forEach(equipment => {
      totalPrice += equipment.price;
    });
    return totalPrice;
  }

  sortAppointmentsDate(): void {
    this.sortedAppointments = [...this.Appointments];
    this.sortedAppointments.sort((a, b) => {
      const dateA = new Date(a.start).getTime();
      const dateB = new Date(b.start).getTime();
      return (this.sortDirectionDate === 'asc') ? dateA - dateB : dateB - dateA;
    });
  }

  onSortDateChange(): void {
    this.sortAppointmentsDate();
  }

  sortAppointmentsPrice(): void {
    this.sortedAppointments = [...this.Appointments];

    if (this.sortDirectionPrice === 'asc') {
      this.sortedAppointments.sort((a, b) => a.price - b.price);
    } else if (this.sortDirectionPrice === 'desc') {
      this.sortedAppointments.sort((a, b) => b.price - a.price);
    }
  }

  onSortPriceChange(): void {
    this.sortAppointmentsPrice();
  }

}
