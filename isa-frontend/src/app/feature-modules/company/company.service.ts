import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged.results.model';
import { Appointment, Company } from './model/company.model';
import { environment } from 'src/env/environment';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Equipment } from './model/equipment.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  getCompanyById(companyId: number): Observable<PagedResults<Company>> {
    return this.http.get<PagedResults<Company>>(environment.apiHost + 'company/get/' + companyId);
  }

  getEquipmentByCompanyId(companyId: number): Observable<PagedResults<Company>> {
    return this.http.get<PagedResults<Company>>(environment.apiHost + 'equipment/getCompanyEquipment/' + companyId);
  }

  updateCompany(company: Company): Observable<Company> {
    return this.http.put<Company>(environment.apiHost + 'company/' + company.id, company);
  }

  getSearchResults(name?: string, city?: string): Observable<PagedResults<Company>> {
    return this.http.get<PagedResults<Company>>(`${environment.apiHost}company/getSearchResults?name=${name}&city=${city}`);
  }

  getAllCompanies(): Observable<PagedResults<Company>> {
    return this.http.get<PagedResults<Company>>(environment.apiHost + 'company/getAll');
  }

  getCompanyAdmins(companyId: number): Observable<User[]> {
    return this.http.get<User[]>(environment.apiHost + 'user/getCompanyAdmins/' + companyId);
  }

  createCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(environment.apiHost + 'company', company);
  }

  createCompanyAdmin(companyId: number, admin: User): Observable<User> {
    return this.http.post<User>(environment.apiHost + 'user/createCompanyAdmin/' + companyId, admin);
  }

  getCompanyEquipmentSearchResults(companyId: number, searchKeyword?: string): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${environment.apiHost}company/getCompanyEquipmentSearchResults/${companyId}?searchKeyword=${searchKeyword}`);
  }

  //appointment
  getRecommendedAppointments(companyId: number, selectedDate: Date | null): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${environment.apiHost}appointment/getRecommendedAppointments/${companyId}?selectedDate=${selectedDate}`);
  }

  getCompanyAppointments(companyId: number): Observable<PagedResults<Appointment>> {
    return this.http.get<PagedResults<Appointment>>(`${environment.apiHost}appointment/getCompanyAppointments/${companyId}`);
  }

  reserveEquipment(appointment: Appointment, userEmail: string): Observable<Appointment> {
    return this.http.put<Appointment>(environment.apiHost + `appointment/reserveAppointment?userEmail=${userEmail}`, appointment);
  }

  createAdditionalAppointment(appointment: Appointment, userEmail: string): Observable<Appointment> {
    return this.http.post<Appointment>(environment.apiHost + `appointment/additionalAppointment?userEmail=${userEmail}`, appointment);
  }


  getAllCompanyAppointments(): Observable<PagedResults<Appointment>> {
    return this.http.get<PagedResults<Appointment>>(environment.apiHost + 'appointment/getAll');
  }

  createPredefinedAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(environment.apiHost + 'appointment', appointment);
  }

  checkAppointmentValidity(date: Date, companyId: number, adminName: string, adminSurname: string): Observable<boolean> {
    const requestBody = {
      date,
      companyId,
      adminName,
      adminSurname
    };
    return this.http.post<boolean>(`${environment.apiHost}appointment/checkValidity`, requestBody);
  }

  checkIfEquipmentCanBeDeleted(equipmentId: number) {
    return this.http.get<boolean>(`${environment.apiHost}appointment/checkIfEquipmentIsReserved/${equipmentId}`);
  }
}
