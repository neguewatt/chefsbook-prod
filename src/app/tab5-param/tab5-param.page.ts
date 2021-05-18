import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from '../service/auth-firebase.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5-param.page.html',
  styleUrls: ['./tab5-param.page.scss'],
})
export class Tab5ParamPage implements OnInit {

  idUser: string;


  constructor( private dataservice: AuthFirebaseService ) { }

  ngOnInit() {
  }


  deleteUser(){
    this.dataservice.deleteUser(this.idUser);
  }




}
