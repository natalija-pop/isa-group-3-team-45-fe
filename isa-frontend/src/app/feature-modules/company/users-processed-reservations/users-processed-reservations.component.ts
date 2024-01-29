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
  scheduledCompanyAppointments: Appointment[] = [];
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

  sortDirection: string = '';

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
        this.sortedAppointments = this.Appointments;
        console.log(this.sortedAppointments); 
      },
      error: (error) => {
        console.error('Error fetching barcode images:', error);
      }
    });
  }

  sortAppointments(): void {
    this.sortedAppointments = [...this.Appointments];
    this.sortedAppointments.sort((a, b) => {
      const dateA = new Date(a.start).getTime();
      const dateB = new Date(b.start).getTime();
      return (this.sortDirection === 'asc') ? dateA - dateB : dateB - dateA;
    });
  }

  onSortChange(): void {
    this.sortAppointments();
  }

}
