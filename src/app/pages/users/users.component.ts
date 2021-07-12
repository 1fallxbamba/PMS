import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FetcherService } from '../../services/fetcher.service';
import { StorageService } from '../../services/storage.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any = [];

  usersFound = false;

  errorMessage = '';

  constructor(
    private fetcher: FetcherService,
    private storer: StorageService,
    public spinner: NgxSpinnerService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.fetchAllUsers();
  }

  fetchAllUsers(): void {
    this.spinner.show().then(() => {

      this.fetcher.getEmployees().subscribe((response) => {
        this.spinner.hide();
        if (response.CODE === 'EF') {
          this.usersFound = true;
          this.users = response.DATA;
        } else if (response.CODE === 'NEF') {
          this.usersFound = false;
        } else {
          this.usersFound = false;
          this.displayError('Une erreur est survenue lors de la recupération des utilisateur, veuillez réessayer.');
        }
      },
        err => {
          this.spinner.hide();
          this.displayError('Une erreur est survenue lors de la connexion à nos serveurs, veuillez vérifier votre connexion à Internet et réessayer');
        });

    });
  }

  deleteUser(user: any): void {

    const wannaDelete = confirm('Voulez-vous vraiment supprimer cet utilisateur ?');

    const userID = user._id.$oid;

    if (wannaDelete) {
      this.spinner.show().then(() => {

        this.fetcher.deleteEmployee(userID).subscribe((response) => {
          this.spinner.hide();
          if (response.CODE === 'USD') {
            this.fetchAllUsers();
            alert('Utilisateur supprimé');
          } else {
            this.displayError('Une erreur est survenue lors de la suppression de cet utilisateur, veuillez réessayer.');
          }
        },
          err => {
            this.spinner.hide();
            this.displayError('Une erreur est survenue lors de la connexion à nos serveurs, veuillez vérifier votre connexion à Internet et réessayer');
          });
      });
    }

  }

  goToEditUser(user: any): void {
    user._id = user._id.$oid;
    this.storer.setUserToEdit(JSON.stringify(user));
    this.router.navigate(['user/edit']);
  }

  displayError(message: string): void {

    this.errorMessage = message;

    const errorDiv = document.getElementById('err') as HTMLElement;

    errorDiv.style.display = 'block';

  }

}
