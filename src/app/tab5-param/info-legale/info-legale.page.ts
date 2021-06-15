import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-info-legale',
  templateUrl: './info-legale.page.html',
  styleUrls: ['./info-legale.page.scss'],
})
export class InfoLegalePage implements OnInit {
  @Input() titre: string;

  constructor(public sanitizer: DomSanitizer
    ) { }

  ngOnInit() {
    this.titre = 'Information légale';
  }

  openURL() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(localStorage.getItem("url"));
  }

}
