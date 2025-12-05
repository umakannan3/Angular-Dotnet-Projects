import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  constructor(private httpClient : HttpClient) {}
  private baseUrl : string = "http://localhost:5255/api/Employee"
  
  getEmployeeList() : Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.baseUrl);
  }

  createEmployee(employee : Employee) : Observable<Employee>{
    employee.id = "00000000-0000-0000-0000-000000000000";
    return this.httpClient.post<Employee>(this.baseUrl , employee);
  }

  deleteEmployee(id : string) : Observable<void>{
    return this.httpClient.delete<void>(this.baseUrl + '/' + id);
  }

  ediEmployee(employee : Employee) : Observable<Employee>{
    return this.httpClient.put<Employee>(this.baseUrl + '/' + employee.id , employee);
  }


  
}
