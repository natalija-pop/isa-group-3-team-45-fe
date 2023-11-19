import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { StakeholdersService } from '../stakeholders.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
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
  category: string = 'Silver';
  penaltyPoints: number = 4;
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
