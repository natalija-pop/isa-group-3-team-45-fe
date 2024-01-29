import { Component, OnInit } from '@angular/core';
import { CompanyAdmin, User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { StakeholdersService } from '../../stakeholders/stakeholders.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User = {
    id: 0,
    role: 0,
    email: "",
    password: "",
    name: "",
    surname: "",
    isActivated: false
  };
  companyAdmin: CompanyAdmin = {
    id: 0,
    role: 0,
    email: "",
    password: "",
    name: "",
    surname: "",
    isActivated: false,
    penaltyPoints: 0,
    companyId: 0
  };

  constructor(private authService: AuthService, private stakeholdersService: StakeholdersService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });

    if (this.user && this.user.role === 1) {
      this.stakeholdersService.getCompanyAdmin(this.user.id).subscribe({
        next: (result: CompanyAdmin) => {
          if (this.companyAdmin.companyId !== null) {
            this.companyAdmin = result;
            console.log(result);
          }
        },
        error: () => {
        }
      })
    }

  }

  onLogout(): void {
    this.authService.logout();
  }
}
