import { ThemeService } from './../../../service/theme.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fond',
  templateUrl: './fond.page.html',
  styleUrls: ['./fond.page.scss'],
})

export class FondPage implements OnInit {

  darkMode = false;


  constructor(private theme: ThemeService) {
  }

  ngOnInit(){
  }

  updateDarkMode(){
    this.theme.toggleAppTheme();
  }


}
