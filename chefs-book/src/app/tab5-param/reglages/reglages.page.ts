import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reglages',
  templateUrl: './reglages.page.html',
  styleUrls: ['./reglages.page.scss'],
})
export class ReglagesPage implements OnInit {
  @Input() titre: string;

  constructor(public route: Router) { }

  ngOnInit() {
    this.titre = "Réglages";
  }

  buttonClick(page: string){
    // routage vers la page avec le nom qui va bien 
    // routage de page ou appel de page (ngif)
    // exemple :  this.route.navigate(['/'+ page])
    this.route.navigate(['tabs/tab5-param/reglages/'+page]);

  }

}
