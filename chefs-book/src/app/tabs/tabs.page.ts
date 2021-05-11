import { Component, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { AuthFirebaseService } from '../service/auth-firebase.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  @ViewChild(IonTabs) tabs: IonTabs;

  disabled = true;
  notifNumber: number;
  notifDisabled = false;

  resetStackTabs = ['tab1-library', 'tab2-notification', 'tab3-search', 'tab4-profil', 'tab5-param'];

  constructor(private dataService: AuthFirebaseService, ) {
    this.getNotification();
  }

  handleTabClick = (event: MouseEvent) => {
    const { tab } = event.composedPath().find((element: any) =>
      element.tagName === 'ION-TAB-BUTTON') as EventTarget & { tab: string };

    let deep = 1;
    let canGoBack = false;

    const deepFn = () => {
      if (this.tabs.outlet.canGoBack(deep, tab)) {
        canGoBack = true;
        deep++;
        deepFn();
      }
    }

    deepFn();

    if (this.resetStackTabs.includes(tab) && canGoBack) {
      event.stopImmediatePropagation();
      return this.tabs.outlet.pop(deep - 1, tab);
    }
  }

  getNotification() {
    this.dataService.getNotification().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(res => {
      if(res.length>0){
        this.disabled = false;
        this.notifNumber = res.length;
        this.notifDisabled = true;
      }
    });
  }
}
