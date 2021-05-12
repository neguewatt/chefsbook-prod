import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-assistance',
  templateUrl: './assistance.page.html',
  styleUrls: ['./assistance.page.scss'],
})
export class AssistancePage implements OnInit {
  @Input() titre: string;

  constructor() { }

  ngOnInit() {
    this.titre = "Assistance";
  }

}
