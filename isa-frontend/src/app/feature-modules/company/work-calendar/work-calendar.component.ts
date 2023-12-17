import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from 'fullcalendar';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Appointment, Company } from '../model/company.model';
import { CompanyService } from '../company.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-work-calendar',
  templateUrl: './work-calendar.component.html',
  styleUrls: ['./work-calendar.component.css']
})
export class WorkCalendarComponent implements OnInit {

  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;


  calendarOptions: CalendarOptions = {
    firstDay: 1,
    height: 600,
    headerToolbar: {
      center: 'dayGridMonth,dayGridYear,dayGridWeek'
    },
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    weekends: true,
    displayEventEnd: true,
    events: [],
    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      meridiem: false,
      hour12: false
    },
    eventDisplay: 'block',
    eventMouseEnter(arg) {
      const description = arg.event.extendedProps['description'];
      alert(description)
    },
  };

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
      longitude: 0,
      latitude: 0,
    },
    workCalendar: []
  };

  constructor(private service: CompanyService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.company.id = +params['id'];
    });
    this.getCompanyById(this.company.id);
  }

  getCompanyById(id: number): void {
    this.service.getCompanyById(id).subscribe((result: any) => {
      console.log(result);
      this.company = result;
      this.insertEvents(this.company.workCalendar);
    })
  }

  insertEvents(appointments: Appointment[]): void {
    let events: any[] = [];
    appointments.forEach(a => {
      var event = {
        title: "Preuzimanje opreme",
        start: new Date(a.start),
        end: new Date(new Date(a.start).getTime() + a.duration * 60000),
        extendedProps: {
          description: "Osoba koja preuzima opremu: " + a.customerName + " " + a.customerSurname
        }
      };
      events.push(event);
    });
    this.calendarOptions.events = events;
  }

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends;
  }
}