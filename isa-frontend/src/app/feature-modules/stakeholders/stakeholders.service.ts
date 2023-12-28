import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, User } from 'src/app/infrastructure/auth/model/user.model';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root'
})
export class StakeholdersService {

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<Employee>{
    return this.http.get<User>(environment.apiHost + 'employee/get-profile/' + id);
  }

  updateUser(user: Employee): Observable<Employee>{
    return this.http.put<User>(environment.apiHost + 'employee/update-profile', user);
  }
}