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


}
