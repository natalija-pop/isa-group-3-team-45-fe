import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged.results.model';
import { Appointment, Company } from './model/company.model';
import { environment } from 'src/env/environment';
import { CompanyAdmin, User } from 'src/app/infrastructure/auth/model/user.model';
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

  getCompanyAdmins(companyId: number): Observable<CompanyAdmin[]> {
    return this.http.get<CompanyAdmin[]>(environment.apiHost + 'company/get-company-admins/' + companyId);
  }

  createCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(environment.apiHost + 'company', company);
  }

  createCompanyAdmin(companyId: number, admin: CompanyAdmin): Observable<CompanyAdmin> {
    return this.http.post<CompanyAdmin>(environment.apiHost + 'users/register-company-admin', admin);
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

  getCustomerAppointments(customerId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${environment.apiHost}appointment/getCustomerAppointments/${customerId}`);
  }

  getCustomerProcessedAppointments(customerId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${environment.apiHost}appointment/getCustomerProcessedAppointments/${customerId}`);
  }

  getCustomerScheduledAppointments(customerId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${environment.apiHost}appointment/getCustomerScheduledAppointments/${customerId}`);
  }

  reserveEquipment(appointment: Appointment, userEmail: string): Observable<Appointment> {
    return this.http.put<Appointment>(environment.apiHost + `appointment/reserveAppointment?userEmail=${userEmail}`, appointment);
  }

  cancelAppointment(appointment: Appointment, userId: number): Observable<Appointment> {
    return this.http.put<Appointment>(environment.apiHost + `appointment/cancelAppointment?userId=${userId}`, appointment);
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

  markAppointmentAsProcessed(appointment: Appointment, userEmail: string): Observable<Appointment> {
    return this.http.put<Appointment>(environment.apiHost + `appointment/markAppointmentAsProcessed?userEmail=${userEmail}`, appointment);
  }

  checkIfEquipmentCanBeDeleted(equipmentId: number) {
    return this.http.get<boolean>(`${environment.apiHost}appointment/checkIfEquipmentIsReserved/${equipmentId}`);
  }

  checkIfSameAppintment(appointmentId: number, userId : number) {
    return this.http.get<boolean>(`${environment.apiHost}appointment/checkIfSameAppintment/${appointmentId}?userId=${userId}`);
  }

  getBarcodeImages(userId: number): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiHost}appointment/barcode/${userId}`);
  }
}