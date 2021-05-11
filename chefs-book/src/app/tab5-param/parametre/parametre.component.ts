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
    // routage vers la page avec le nom qui va bien 
    // routage de page ou appel de page (ngif)
    // exemple :  this.route.navigate(['/'+ page])
    this.route.navigate(['tabs/tab5-param/'+page]);

  }

}
