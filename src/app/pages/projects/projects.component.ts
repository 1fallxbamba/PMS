import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FetcherService } from '../../services/fetcher.service';
import { StorageService } from '../../services/storage.service';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: any = [];

  projectsFound = false;

  errorMessage = '';

  constructor(
    private fetcher: FetcherService,
    private storer: StorageService,
    public spinner: NgxSpinnerService,
    public router: Router) { }

  ngOnInit(): void {
    this.fetchAllProjects();
  }

  fetchAllProjects(): void {
    this.spinner.show().then(() => {

      this.fetcher.getProjects().subscribe((response) => {
        this.spinner.hide();
        if (response.CODE === 'PF') {
          this.projectsFound = true;
          this.projects = response.DATA;
        } else if (response.CODE === 'NPF') {
          this.projectsFound = false;
        } else {
          this.projectsFound = false;
          this.displayError('Une erreur est survenue lors de la recupération de vos projets, veuillez réessayer.');
        }
      },
        err => {
          this.spinner.hide();
          this.displayError('Une erreur est survenue lors de la connexion à nos serveurs, veuillez vérifier votre connexion à Internet et réessayer');
        });

    });
  }

  search(projectName: string): void {

    if (projectName.trim() === '') {

      this.fetchAllProjects();

    } else {

      this.spinner.show().then(() => {

        this.fetcher.searchProject(projectName).subscribe((response) => {
          this.spinner.hide();
          if (response.CODE === 'PDF') {
            this.projectsFound = true;
            this.projects = response.DATA;
          } else if (response.CODE === 'NPF') {
            this.projectsFound = false;
          } else {
            this.projectsFound = false;
            this.displayError('Une erreur est survenue lors de la recupération de vos projets, veuillez réessayer.');
          }
        },
          err => {
            this.spinner.hide();
            this.displayError('Une erreur est survenue lors de la connexion à nos serveurs, veuillez vérifier votre connexion à Internet et réessayer');
          });

      });

    }

  }

  goToEditProject(project: any): void {
    project._id = project._id.$oid;
    this.storer.setProjectToEdit(JSON.stringify(project));
    this.router.navigate(['project/edit/' + project._id]);
  }

  displayError(message: string): void {

    this.errorMessage = message;

    const errorDiv = document.getElementById('err') as HTMLElement;

    errorDiv.style.display = 'block';

  }

}
