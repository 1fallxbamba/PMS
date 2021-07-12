import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FetcherService } from '../../services/fetcher.service';
import { StorageService } from '../../services/storage.service';

import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projectData: any;

  isSecretary = false;

  errorMessage = '';

  constructor(
    private fetcher: FetcherService,
    private storer: StorageService,
    private spinner: NgxSpinnerService,
    public router: Router,
    public route: ActivatedRoute) { }

  ngOnInit(): void {

    if (JSON.parse(this.storer.getConnnectedUserInfo()).profile === 'Secrétaire') {
      this.isSecretary = true;
    } else {
      this.isSecretary = false;
    }

    // tslint:disable-next-line: variable-name
    const _projectID = this.route.snapshot.params.id;

    this.fetchProjectInfo(_projectID);

  }

  fetchProjectInfo(projectID: string): void {
    this.spinner.show().then(() => {
      this.fetcher.getProject(projectID).subscribe((response) => {
        this.spinner.hide();
        if (response.CODE === 'PDF') {
          this.projectData = response.DATA;
        } else {
          this.displayError('Une erreur est survenue lors de la recupération des données du projet, veuillez réessayer.');
          this.router.navigate(['projects']);
        }
      },
        err => {
          this.spinner.hide().then(() => {
            this.displayError('Une erreur est survenue lors de la connexion à nos serveurs, veuillez vérifier votre connexion à Internet et réessayer');
          });
        });
    });
  }

  displayError(message: string): void {

    this.errorMessage = message;

    const errorDiv = document.getElementById('err') as HTMLElement;

    errorDiv.style.display = 'block';

  }

}
