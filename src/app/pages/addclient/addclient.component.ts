import { Component, OnInit } from '@angular/core';

import { PosterService } from '../../services/poster.service';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css']
})
export class AddclientComponent implements OnInit {

  clientData: any = { name: '', address: '', tel: '', contactName: '', contactEmail: '', website: '' };

  clientAdded = false;

  errorMessage = '';

  constructor(private poster: PosterService, public spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  addNewClient(): void {
    this.spinner.show().then(() => {
      this.poster.postNewClient(this.clientData).subscribe((response) => {
        this.spinner.hide();
        if (response.CODE === 'CSA') {
          this.clientAdded = true;
        } else {
          this.displayError('Une erreur est survenue lors de l\'ajout du client, veuillez revoir les données rentrées et réssayer');
          this.clientAdded = false;
        }
      },
        err => {
          this.spinner.hide();
          this.displayError('Une erreur est survenue lors de la connexion à nos serveurs, veuillez vérifier votre connexion à Internet et réessayer');
          this.clientAdded = false;
        });
    });
  }

  displayError(message: string): void {

    this.errorMessage = message;

    const errorDiv = document.getElementById('err') as HTMLElement;

    errorDiv.style.display = 'block';

  }

}
