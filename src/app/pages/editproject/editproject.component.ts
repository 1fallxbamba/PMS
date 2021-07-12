import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FetcherService } from '../../services/fetcher.service';
import { PosterService } from '../../services/poster.service';
import { StorageService } from '../../services/storage.service';

import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-editproject',
  templateUrl: './editproject.component.html',
  styleUrls: ['./editproject.component.css']
})
export class EditprojectComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  _projectData: any;

  projectData: any = { name: '', description: '', starting: '', ending: '', client: '', amount: 0, documents: {}, manager: { code: '', name: '' } };

  clientNames = [];

  managerInfo: any = [{}];

  projectEdited = false;

  noClients = false;

  noManagers = false;

  isSecretary = false;

  errorMessage = '';

  constructor(
    private fetcher: FetcherService,
    private poster: PosterService,
    private storer: StorageService,
    public spinner: NgxSpinnerService,
    public router: Router) { }

  ngOnInit(): void {

    this._projectData = this.storer.getProjectToEdit();

    if (this._projectData === null) {

      this.router.navigate(['projects']);

    } else {

      this._projectData = JSON.parse(this._projectData);
      this.projectData.name = this._projectData.name;
      this.projectData.description = this._projectData.description;
      this.projectData.starting = this._projectData.starting;
      this.projectData.ending = this._projectData.ending;
      this.projectData.client = this._projectData.client;
      this.projectData.amount = this._projectData.amount;
      this.projectData.documents = this._projectData.documents;
      this.projectData.manager = this._projectData.manager;
      this.fetchClientNames();
      this.fetchManagersInfo();
      if (JSON.parse(this.storer.getConnnectedUserInfo()).profile === 'Secrétaire') {
        this.isSecretary = true;
      } else {
        this.isSecretary = false;
      }

    }
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

  setManager(m: any): void {

    this.managerInfo.forEach((el: any) => {
      const name = el.fName + ' ' + el.lName;
      if (name === m) {
        this.projectData.manager.code = el._id.$oid;
        this.projectData.manager.name = name;
      }
    });

  }

  editProject(): void {
    this.spinner.show().then(() => {
      this.poster.updateProject(this._projectData._id, this.projectData).subscribe((response) => {
        this.spinner.hide();
        if (response.CODE === 'PSU') {
          this.projectEdited = true;
          this.storer.removeProjectToEdit();
        } else {
          this.displayError('Une erreur est survenue lors de la modification du project, veuillez revoir les données rentrées et réssayer');
          this.projectEdited = false;
        }
      },
        err => {
          this.spinner.hide();
          this.displayError('Une erreur est survenue lors de la connexion à nos serveurs, veuillez vérifier votre connexion à Internet et réessayer');
          this.projectEdited = false;
        });
    });
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

  displayError(message: string): void {

    this.errorMessage = message;

    const errorDiv = document.getElementById('err') as HTMLElement;

    errorDiv.style.display = 'block';

  }

}
