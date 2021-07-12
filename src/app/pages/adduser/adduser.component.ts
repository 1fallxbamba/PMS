import { Component, OnInit } from '@angular/core';

import { PosterService } from '../../services/poster.service';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  userData: any = { fName: '', lName: '', email: '', tel: '', profile: '', login: '', shadow: '' };

  userAdded = false;

  errorMessage = '';

  constructor(
    private poster: PosterService,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  setUserProfile(up: string): void {
    this.userData.profile = up;
  }

  createUser(): void {
    this.spinner.show().then(() => {
      this.poster.postNewEmployee(this.userData).subscribe((response) => {
        this.spinner.hide();
        if (response.CODE === 'ESA') {
          this.userAdded = true;
        } else {
          this.displayError('Une erreur est survenue lors de l\'ajout de l\'employé, veuillez revoir les données rentrées et réssayer');
          this.userAdded = false;
        }
      },
        err => {
          this.spinner.hide();
          this.displayError('Une erreur est survenue lors de la connexion à nos serveurs, veuillez vérifier votre connexion à Internet et réessayer');
          this.userAdded = false;
        });
    });
  }

  displayError(message: string): void {

    this.errorMessage = message;

    const errorDiv = document.getElementById('err') as HTMLElement;

    errorDiv.style.display = 'block';

  }

}
