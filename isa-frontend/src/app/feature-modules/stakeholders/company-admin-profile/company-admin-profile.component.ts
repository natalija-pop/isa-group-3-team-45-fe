import { Component } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { StakeholdersService } from '../stakeholders.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'app-company-admin-profile',
  templateUrl: './company-admin-profile.component.html',
  styleUrls: ['./company-admin-profile.component.css']
})
export class CompanyAdminProfileComponent {

  editMode: boolean = false;
  changePassword: boolean = false;

  constructor(private authService: AuthService, private service: StakeholdersService) {}
  
  user: User = {
    id: 0,
    role: 0,
    email: "",
    password: "",
    name: "",
    surname: "",
    city: "",
    country: "",
    phone: "",
    profession: "",
    companyInformation: "",
    isActivated: false
  };
  newPassword: string = '';
  repeatedNewPassword: string = '';
  userId: number = 0;

  ngOnInit() {
    this.editMode = false;

    this.authService.user$.subscribe(user => {
      this.userId = user.id;
    });

     this.service.getUser(this.userId).subscribe({
      next: (result: User) => {
        this.user = result;
          console.log(result);
        },
        error: () => {
        }
       })
  }

  switchMode(newMode: boolean) {
    this.editMode = newMode;
  }

  switchChangePasswordMode(newMode: boolean) {
    this.changePassword = newMode;
  }

  saveChanges(){
    console.log(this.user);
    if(this.newPassword !== '' && (this.newPassword === this.repeatedNewPassword)){
      this.user.password = this.newPassword;
    }
       this.service.updateUser(this.user).subscribe({
         next: () => {}
       })
  }
}
