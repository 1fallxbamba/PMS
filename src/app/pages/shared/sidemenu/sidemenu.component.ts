import { Component, OnInit } from '@angular/core';

import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  userInfo: any;

  constructor(private storer: StorageService) { }

  ngOnInit(): void {
    this.userInfo = JSON.parse(this.storer.getConnnectedUserInfo());
  }


}
