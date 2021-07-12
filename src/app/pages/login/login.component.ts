import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { StorageService } from '../../services/storage.service';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = { login: '', passwd: '' };

  userInfo = { id: '', profile: '', fName: '', lName: '', email: '' };

  errorMessage = '';

  constructor(
    private auth: AuthenticationService,
    private storer: StorageService,
    private spinner: NgxSpinnerService,
    public router: Router) { }

  ngOnInit(): void {
  }

  logUserIn(): void {

    this.spinner.show().then(() => {

      this.auth.authenticateUser(this.loginData).subscribe((response) => {

        this.spinner.hide();

        if (response.CODE === 'USA') {

          this.userInfo.id = response.DATA.id.$oid;
          this.userInfo.profile = response.DATA.profile;
          this.userInfo.lName = response.DATA.lName;
          this.userInfo.fName = response.DATA.fName;
          this.userInfo.email = response.DATA.email;

          this.storer.setConnectedUserInfo(JSON.stringify(this.userInfo));
          this.router.navigate(['home']);
        } else if (response.CODE === 'WPWD') {

          this.displayError('Le mot de passe entré est incorrect !');

        } else if (response.CODE === 'UDNE') {
          this.displayError('Le nom d\'utilisateur entré n\'existe pas !. Si vous n\'avez pas de compte, veuillez vous rapprocher de votre administrateur');
        }
        else {
          this.displayError('Une erreur innatendue est survenue, veuillez réessayer !');
        }

      },
        err => {
          this.spinner.hide();
          this.displayError('Erreur de connexion à nos serveurs, veuillez vérifier votre connexion à internet puis réessayer.')
        });

    });

  }

  displayError(message: string): void {

    this.errorMessage = message;

    const errorDiv = document.getElementById('err') as HTMLElement;

    errorDiv.style.display = 'block';

  }

}
