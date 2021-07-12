import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

const apiEndpoint = 'http://localhost/pms/api/core/';

const httpOptions = {

  headers: new HttpHeaders({
    // tslint:disable-next-line: object-literal-key-quotes
    'Accept': '*/*',
    'Content-Type': 'application/x-www-form-urlencoded'
  })

};

@Injectable({
  providedIn: 'root'
})
export class PosterService {

  constructor(private http: HttpClient) { }

  postNewProject(projectData: any): Observable<any> {
    return this.http.post(apiEndpoint + 'secretary/newproject', JSON.stringify(projectData), httpOptions);
  }

  updateProject(projectID: string, projectData: any): Observable<any> {
    return this.http.post(apiEndpoint + 'shared/updateproject?code=' + projectID, JSON.stringify(projectData), httpOptions);
  }

  postNewClient(clientData: any): Observable<any> {
    return this.http.post(apiEndpoint + 'secretary/newclient', JSON.stringify(clientData), httpOptions);
  }

  updateClient(clientID: string, clientData: any): Observable<any> {
    return this.http.post(apiEndpoint + 'secretary/updateclient?code=' + clientID, JSON.stringify(clientData), httpOptions);
  }

  postNewEmployee(userData: any): Observable<any> {
    return this.http.post(apiEndpoint + 'administrator/newemployee', JSON.stringify(userData), httpOptions);
  }

  updateEmployee(userID: string, userData: any): Observable<any> {
    return this.http.post(apiEndpoint + 'administrator/updateemployee?code=' + userID, JSON.stringify(userData), httpOptions);
  }

}
