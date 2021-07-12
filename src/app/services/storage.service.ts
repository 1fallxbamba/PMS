import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setConnectedUserInfo(userData: any): void {
    localStorage.setItem('pmsConnectedUser', userData);
  }

  getConnnectedUserInfo(): any  {
    return localStorage.getItem('pmsConnectedUser');
  }

  setProjectToEdit(projectData: any): void {
    return localStorage.setItem('pmsProjectToEdit', projectData);
  }

  getProjectToEdit(): any {
    return localStorage.getItem('pmsProjectToEdit');
  }

  removeProjectToEdit(): void {
    localStorage.removeItem('pmsProjectToEdit');
  }

  setClientToEdit(projectData: any): void {
    return localStorage.setItem('pmsClientToEdit', projectData);
  }

  getClientToEdit(): any {
    return localStorage.getItem('pmsClientToEdit');
  }

  removeClientToEdit(): void {
    localStorage.removeItem('pmsClientToEdit');
  }

  setUserToEdit(projectData: any): void {
    return localStorage.setItem('pmsUserToEdit', projectData);
  }

  getUserToEdit(): any {
    return localStorage.getItem('pmsUserToEdit');
  }

  removeUserToEdit(): void {
    localStorage.removeItem('pmsUserToEdit');
  }

}
