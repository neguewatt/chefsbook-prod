import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from '../service/auth-firebase.service';
import { map } from 'rxjs/operators';
import { Livres } from '../models/livres';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab1-library',
  templateUrl: 'tab1-library.page.html',
  styleUrls: ['tab1-library.page.scss']
})
export class Tab1LibraryPage implements OnInit {

  fichesBoolean: boolean;
  livreBoolean: boolean;
  comBoolean: boolean;
  livrePerso: Livres[];
  dataReturned: any;
  chosen = 'border-bottom: 5px solid #fff;';
  notChosen = 'margin-bottom: 5px;';
  textChosen = 'color:white';
  textNotChosen = 'color:#ccc';

  constructor(
    private dataService: AuthFirebaseService,
    private activRoute: ActivatedRoute,
    private route: Router) {
    this.activRoute.queryParams.subscribe(params => {
      if (this.route.getCurrentNavigation().extras.state) {
        this.fichesBoolean = this.route.getCurrentNavigation().extras.state.fichesBoolean;
        this.livreBoolean = this.route.getCurrentNavigation().extras.state.livreBoolean;
        this.comBoolean = this.route.getCurrentNavigation().extras.state.comBoolean;
      }
    });
    this.livreBoolean = true;
  }

  ngOnInit() {

  }

  segmentChanged(page: string) {
    console.log(page);
    this.fichesBoolean = false;
    this.comBoolean = false;
    this.livreBoolean = false;
    switch (page) {
      case 'livreBoolean':
        this.livreBoolean = true;
        break;
      case 'comBoolean':
        this.comBoolean = true;
        break;
      case 'fichesBoolean':
        this.fichesBoolean = true;
        break;
    }
  }



}
