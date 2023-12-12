import { Component, OnInit } from '@angular/core';
import { Company } from '../model/company.model';
import { CompanyService } from '../company.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-work-calendar',
  templateUrl: './work-calendar.component.html',
  styleUrls: ['./work-calendar.component.css']
})
export class WorkCalendarComponent implements OnInit {
  
  company: Company = {
    id: 0,
    name: '',
    description: '',
    rating: 0,
    workingHours: {
      openingHours: '',
      closingHours: '',
      weekends: false
    },
    address: {
      street: '',
      number: 0,
      city: '',
      country: '',
    }
  };
  
  constructor(private service: CompanyService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.company.id = +params['id'];
    });
    this.getCompanyById(this.company.id);
    console.log(this.company);
  }

  getCompanyById(id: number): void {
    this.service.getCompanyById(id).subscribe((result: any) => {
      console.log(result);
      this.company = result;
    })
  }
}
