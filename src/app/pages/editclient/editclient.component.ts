import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PosterService } from '../../services/poster.service';
import { StorageService } from '../../services/storage.service';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-editclient',
  templateUrl: './editclient.component.html',
  styleUrls: ['./editclient.component.css']
})
export class EditclientComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  _clientData: any;

  clientData: any = { name: '', address: '', tel: '', contactName: '', contactEmail: '', website: '' };

  clientEdited = false;

  errorMessage = '';

  constructor(
    private poster: PosterService,
    private storer: StorageService,
    public spinner: NgxSpinnerService,
    public router: Router) { }

  ngOnInit(): void {

    this._clientData = this.storer.getClientToEdit();

    if (this._clientData === null) {

      this.router.navigate(['clients']);

    } else {
      this._clientData = JSON.parse(this._clientData);
      this.clientData.name = this._clientData.name;
      this.clientData.address = this._clientData.address;
      this.clientData.tel = this._clientData.tel;
      this.clientData.contactName = this._clientData.contactName;
      this.clientData.contactEmail = this._clientData.contactEmail;
      this.clientData.website = this._clientData.website;

    }
  }

  editClient(): void {
    this.spinner.show().then(() => {
      this.poster.updateClient(this._clientData._id, this.clientData).subscribe((response) => {
        this.spinner.hide();
        console.log(response);
        if (response.CODE === 'CSU') {
          this.clientEdited = true;
          this.storer.removeClientToEdit();
        } else {
          this.displayError('Une erreur est survenue lors de la modification du client, veuillez revoir les données rentrées et réssayer');
          this.clientEdited = false;
        }
      },
        err => {
          this.spinner.hide();
          this.displayError('Une erreur est survenue lors de la connexion à nos serveurs, veuillez vérifier votre connexion à Internet et réessayer');
          this.clientEdited = false;
        });
    });
  }

  displayError(message: string): void {

    this.errorMessage = message;

    const errorDiv = document.getElementById('err') as HTMLElement;

    errorDiv.style.display = 'block';

  }

}
