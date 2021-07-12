import { Component, OnInit } from '@angular/core';

import { FetcherService } from '../../services/fetcher.service';
import { PosterService } from '../../services/poster.service';
import { StorageService } from '../../services/storage.service';

import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {

  projectData = { name: '', description: '', starting: '', ending: '', client: '', amount: 0, documents: {}, manager: {code: '', name:''} };

  clientNames = [];

  managerInfo: any = [{}];

  projectAdded = false;

  noClients = false;

  noManagers = false;

  isSecretary = false;

  errorMessage = '';

  constructor(
    private fetcher: FetcherService,
    private poster: PosterService,
    private storer: StorageService,
    public spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.fetchClientNames();
    this.fetchManagersInfo();

    if (JSON.parse(this.storer.getConnnectedUserInfo()).profile === 'Secrétaire') {
      this.isSecretary = true;
    } else {
      this.isSecretary = false;
    }

  }

  fetchClientNames(): void {
    this.fetcher.getClientNames().subscribe((response) => {
      if (response.CODE === 'CF') {
        this.noClients = false;
        this.clientNames = response.DATA;
      } else if (response.CODE === 'NCF') {
        this.noClients = true;
      } else {
        this.noClients = true;
        // this.displayError('Une erreur est survenue lors de la recupération de vos projets, veuillez réessayer.');
      }
    },
      err => {
        this.noClients = true;
      }
    );
  }

  fetchManagersInfo(): void {

    this.fetcher.getManagersInfo().subscribe((response) => {
      if (response.CODE === 'MDF') {
        this.noManagers = false;
        this.managerInfo = response.DATA;
      } else if (response.CODE === 'NMF') {
        this.noManagers = true;
      } else {
        this.noManagers = true;
        // this.displayError('Une erreur est survenue lors de la recupération de vos projets, veuillez réessayer.');
      }
    },
      err => {
        this.noManagers = true;
      }
    );

  }

  setClientName(cn: string): void {
    this.projectData.client = cn;
  }

  setStartingDate(sd: string): void {
    this.projectData.starting = sd;
  }

  setEndingDate(ed: string): void {
    this.projectData.ending = ed;
  }

  setManager(m: any): void {

    this.managerInfo.forEach((el: any) => {
      const name = el.fName + ' ' + el.lName;
      if (name === m) {
        this.projectData.manager.code = el._id.$oid;
        this.projectData.manager.name = name;
      }
    });

  }

  createProject(): void {
    this.spinner.show().then(() => {
      this.poster.postNewProject(this.projectData).subscribe((response) => {
        this.spinner.hide();
        if (response.CODE === 'PSA') {
          this.projectAdded = true;
        } else {
          this.displayError('Une erreur est survenue lors de l\'ajout du project, veuillez revoir les données rentrées et réssayer');
          this.projectAdded = false;
        }
      },
        err => {
          this.spinner.hide();
          this.displayError('Une erreur est survenue lors de la connexion à nos serveurs, veuillez vérifier votre connexion à Internet et réessayer');
          this.projectAdded = false;
        });
    });
  }

  displayError(message: string): void {

    this.errorMessage = message;

    const errorDiv = document.getElementById('err') as HTMLElement;

    errorDiv.style.display = 'block';

  }

}
