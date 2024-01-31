import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyAdmin, Employee, User } from 'src/app/infrastructure/auth/model/user.model';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root'
})
export class StakeholdersService {

  constructor(private http: HttpClient) { }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(environment.apiHost + 'employee/get-profile/' + id);
  }

  updateEmployee(user: Employee): Observable<Employee> {
    return this.http.put<Employee>(environment.apiHost + 'employee/update-profile', user);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(environment.apiHost + 'user/get/' + id);
  }

  getUsersByIds(userIds: number[]): Observable<User[]> {
    return this.http.post<User[]>(environment.apiHost + 'user/getUsersByIds/', userIds);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(environment.apiHost + 'user/' + user.id, user);
  }

  //brisanje penala svakog 1. u mesecu
  clearPenaltyPoints(): Observable<boolean> {
    return this.http.post<boolean>(environment.apiHost + 'user/clearAll', {});
  }

  //companyAdmin
  getCompanyAdmin(id: number): Observable<CompanyAdmin> {
    return this.http.get<CompanyAdmin>(environment.apiHost + 'user/getCompanyAdmin/' + id);
  }
}