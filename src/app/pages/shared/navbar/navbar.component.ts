import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../services/authentication.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private auth: AuthenticationService,
    private storer: StorageService,
    public router: Router) { }

  ngOnInit(): void {
    if (this.storer.getConnnectedUserInfo() === null) {
      this.router.navigate(['']);
    }
  }

  logOut(): void {
    this.router.navigate(['']).then(() => {
      this.auth.logUserOut();
    });
  }

}
