// tslint:disable-next-line: object-literal-key-quotes

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
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  authenticateUser(loginData: any): Observable<any> {
    return this.http.post(apiEndpoint + 'shared/authenticate', JSON.stringify(loginData), httpOptions);
  }

  logUserOut(): void {
    localStorage.removeItem('pmsConnectedUser');
  }

}
