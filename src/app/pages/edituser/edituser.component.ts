import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PosterService } from '../../services/poster.service';
import { StorageService } from '../../services/storage.service';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  _userData: any;

  userData: any = { fName: '', lName: '', email: '', tel: '', profile: '', login: '', shadow: '' };

  userEdited = false;

  errorMessage = '';

  constructor(
    private poster: PosterService,
    private storer: StorageService,
    public spinner: NgxSpinnerService,
    public router: Router) { }

  ngOnInit(): void {

    this._userData = this.storer.getUserToEdit();

    if (this._userData === null) {

      this.router.navigate(['users']);

    } else {

      this._userData = JSON.parse(this._userData);
      this.userData.fName = this._userData.fName;
      this.userData.lName = this._userData.lName;
      this.userData.email = this._userData.email;
      this.userData.ending = this._userData.ending;
      this.userData.tel = this._userData.tel;
      this.userData.profile = this._userData.profile;
      this.userData.login = this._userData.login;
      this.userData.shadow = this._userData.shadow;
    }

  }

  setUserProfile(up: string): void {
    this.userData.profile = up;
  }

  editUser(): void {
    this.spinner.show().then(() => {
      this.poster.updateEmployee(this._userData._id, this.userData).subscribe((response) => {
        this.spinner.hide();
        if (response.CODE === 'USU') {
          this.userEdited = true;
          this.storer.removeUserToEdit();
        } else {
          this.displayError('Une erreur est survenue lors de la modification de l\'utilisateur, veuillez revoir les données rentrées et réssayer');
          this.userEdited = false;
        }
      },
        err => {
          this.spinner.hide();
          this.displayError('Une erreur est survenue lors de la connexion à nos serveurs, veuillez vérifier votre connexion à Internet et réessayer');
          this.userEdited = false;
        });
    });
  }

  displayError(message: string): void {

    this.errorMessage = message;

    const errorDiv = document.getElementById('err') as HTMLElement;

    errorDiv.style.display = 'block';

  }

}
