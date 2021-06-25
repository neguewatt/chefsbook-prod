import { Notification } from './../models/notification';
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

  constructor(private dataService: AuthFirebaseService,) {
    this.getBadgeNotif();
  }

  handleTabClick = (event: MouseEvent) => {
    const { tab } = event.composedPath().find((element: any) =>
      element.tagName ===  'ION-TAB-BUTTON') as EventTarget & { tab: string };
    let deep = 1;
    let canGoBack = false;
    const deepFn = () => {
      if (this.tabs.outlet.canGoBack(deep, tab)) {
        canGoBack = true;
        deep++;
        deepFn();
      }
    };
    deepFn();
    if (this.resetStackTabs.includes(tab) && canGoBack) {
      event.stopImmediatePropagation();
      return this.tabs.outlet.pop(1, tab);
    }
  };

  getBadgeNotif() {
    this.dataService.getNotificationBadge().subscribe((res: Notification[]) => {
      if (res.length > 0) {
        this.disabled = false;
        this.notifNumber = res.length;
        this.notifDisabled = true;
      }else {
        this.disabled = true;
        this.notifNumber = res.length;
        this.notifDisabled = false;
      }
    });
  }
}
