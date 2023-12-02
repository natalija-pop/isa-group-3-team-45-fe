import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SysAdminRegistration } from '../model/sys-admin-registration.model';

@Component({
  selector: 'app-sys-admin-registration',
  templateUrl: './sys-admin-registration.component.html',
  styleUrls: ['./sys-admin-registration.component.css']
})
export class SysAdminRegistrationComponent {

  constructor(private authService: AuthService){}

  adminForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
    profession: new FormControl('', [Validators.required]),
    companyInformation: new FormControl('', [Validators.required]),
    })

    registerSysAdmin(): void{
      const admin: SysAdminRegistration = {
        name: this.adminForm.value.name || "",
        surname: this.adminForm.value.surname || "",
        email: this.adminForm.value.email || "",
        city : this.adminForm.value.city || "",
        country: this.adminForm.value.country || "",
        phone: this.adminForm.value.phone || "",
        profession: this.adminForm.value.profession || "",
        companyInformation: this.adminForm.value.companyInformation || "",
      };
      this.authService.registerSysAdmin(admin)
    }

}
