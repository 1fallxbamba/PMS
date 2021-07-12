import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';

const apiEndpoint = 'http://localhost/pms/api/core/';

@Injectable({
  providedIn: 'root'
})
export class FetcherService {

  constructor(private http: HttpClient) { }

  getEmployeeInfo(employeeID: string | null | undefined): Observable<any> {
    return this.http.get(apiEndpoint + 'shared/employeeinfo?code=' + employeeID);
  }

  getProjects(): Observable<any> {
    return this.http.get(apiEndpoint + 'shared/projects');
  }

  getProject(projectID: string): Observable<any> {
    return this.http.get(apiEndpoint + 'shared/project?code=' + projectID);
  }

  searchProject(projectName: string): Observable<any> {
    return this.http.get(apiEndpoint + 'shared/searchproject?name=' + projectName);
  }

  getClients(): Observable<any> {
    return this.http.get(apiEndpoint + 'secretary/clients');
  }

  getClientNames(): Observable<any> {
    return this.http.get(apiEndpoint + 'shared/clientnames');
  }

  getEmployees(): Observable<any> {
    return this.http.get(apiEndpoint + 'administrator/employees');
  }

  deleteEmployee(employeeID: string): Observable<any> {
    return this.http.get(apiEndpoint + 'administrator/deleteemployee?code=' + employeeID);
  }

  getManagersInfo(): Observable<any> {
    return this.http.get(apiEndpoint + 'director/managersinfo');
  }

}
