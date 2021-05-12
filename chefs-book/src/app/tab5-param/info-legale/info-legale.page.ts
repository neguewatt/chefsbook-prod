import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-info-legale',
  templateUrl: './info-legale.page.html',
  styleUrls: ['./info-legale.page.scss'],
})
export class InfoLegalePage implements OnInit {
  @Input() titre: string;

  constructor() { }

  ngOnInit() {
    this.titre = 'Information légale';
  }

}
