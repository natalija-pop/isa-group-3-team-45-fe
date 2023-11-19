import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { StakeholdersService } from '../stakeholders.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.css']
})
export class ActivateUserComponent implements OnInit{

  constructor(private route: ActivatedRoute ,private authService: AuthService, private service: StakeholdersService) {}
  user: User = {
    id: 0,
    role: "",
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
  userId: number = 0;
  activateUser(token: string) : number{
    const jwtHelperService = new JwtHelperService();
    const userId = +jwtHelperService.decodeToken(token).id;
    return userId;
  } 

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      this.userId = this.activateUser(token)
      console.log(token);
      console.log(this.userId);
    });
    this.service.getUser(this.userId).subscribe({
      next: (result: User) => {
        this.user = result;
        this.user.isActivated = true;
          console.log(result);
        },
        error: () => {
        }
       })

    this.user.isActivated = true;
    console.log(this.user.isActivated);
    console.log(this.user);
  }

  saveChanges(){
    this.service.updateUser(this.user).subscribe({
       next: () => {}
    })
  }
}
