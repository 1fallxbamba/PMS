import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FetcherService } from '../../services/fetcher.service';
import { StorageService } from '../../services/storage.service';

import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: any = [];

  clientsFound = false;

  errorMessage = '';

  constructor(
    private fetcher: FetcherService,
    private storer: StorageService,
    public spinner: NgxSpinnerService,
    public router: Router) { }

  ngOnInit(): void {
    this.fetchAllClients();
  }

  fetchAllClients(): void {
    this.spinner.show().then(() => {

      this.fetcher.getClients().subscribe((response) => {
        this.spinner.hide();
        if (response.CODE === 'CF') {
          this.clientsFound = true;
          this.clients = response.DATA;
        } else if (response.CODE === 'NCF') {
          this.clientsFound = false;
        } else {
          this.clientsFound = false;
          this.displayError('Une erreur est survenue lors de la recupération de vos projets, veuillez réessayer.');
        }
      },
        err => {
          this.spinner.hide();
          this.displayError('Une erreur est survenue lors de la connexion à nos serveurs, veuillez vérifier votre connexion à Internet et réessayer');
        });

    });
  }

  goToEditClient(client: any): void {
    client._id = client._id.$oid;
    this.storer.setClientToEdit(JSON.stringify(client));
    this.router.navigate(['client/edit/' + client._id]);
  }

  displayError(message: string): void {

    this.errorMessage = message;

    const errorDiv = document.getElementById('err') as HTMLElement;

    errorDiv.style.display = 'block';

  }

}
