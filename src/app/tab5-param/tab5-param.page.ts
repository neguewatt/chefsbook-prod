import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseService } from '../service/auth-firebase.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5-param.page.html',
  styleUrls: ['./tab5-param.page.scss'],
})
export class Tab5ParamPage implements OnInit {

  idUser: string;


  constructor( public route: Router ) { }

  ngOnInit() {
  }

  buttonClick(page: string){
    this.route.navigate(['tabs/tab5-param/'+page]);
  }




}
