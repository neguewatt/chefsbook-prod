import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.scss'],
})
export class ParametreComponent implements OnInit {
  @Input() titre: string;


  constructor(public route: Router) { }

  ngOnInit() {}

  buttonClick(page: string){
    this.route.navigate(['tabs/tab5-param/'+page]);
  }

}
