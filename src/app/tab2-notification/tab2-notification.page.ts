import { Utilisateurs } from '../models/Utilisateurs';
import { Preparation } from 'src/app/models/preparation';
import { NotificationFiche } from '../models/notification';
import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from '../service/auth-firebase.service';
import { map } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';
import { Plats } from '../models/plats';
import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-tab2-notification',
  templateUrl: 'tab2-notification.page.html',
  styleUrls: ['tab2-notification.page.scss']
})
export class Tab2NotificationPage implements OnInit {

  ficheUpdate = false;
  notifications: NotificationFiche[] = [];
  notificationFiche: NotificationFiche;
  notifBoolean = true;
  userNom: string;
  userPrenom: string;
  toDay: any;




  constructor(
    private dataService: AuthFirebaseService,
    private route: Router,
    private routerOutlet: IonRouterOutlet
  ) {

  }


  ngOnInit() {
    this.routerOutlet.swipeGesture = false;
    this.getNotification();
    this.toDay = Math.round(new Date().getTime() / 1000);
  }

  getNotification() {
    this.dataService.getNotification().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(res => {
      this.notifications = [];
      res.forEach(notification => {
        if ('fiche Préparation' === notification.type) {
          // fiche technique préparation partagé gestion du temps du partage
          const resNotif = new NotificationFiche();
          this.dataService.getPrepaPartageById(notification.idDocPartage).then((prepa: Preparation) => {
            this.dataService.getUtilisateurById(prepa.idUtilisateur).then((user: Utilisateurs) => {
              this.userNom = user.nom;
              this.userPrenom = user.prenom;

              resNotif.idDocPartage = notification.idDocPartage;
              // calcul du temps
              let difference = this.toDay * 1000 - notification.date.seconds * 1000;
              console.log('dif: ', difference);
              const monthDifference = Math.floor(difference / 1000 / 60 / 60 / 24 / 30);
              difference -= monthDifference * 1000 * 60 * 60 * 24 * 30;
              console.log('monthDifference : ', monthDifference);
              const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
              difference -= daysDifference * 1000 * 60 * 60 * 24;
              console.log('daysDifference : ', daysDifference);
              const hoursDifference = Math.floor(difference / 1000 / 60 / 60);
              difference -= hoursDifference * 1000 * 60 * 60;
              console.log('hoursDifference : ', hoursDifference);
              const minutesDifference = Math.floor(difference / 1000 / 60);
              console.log('minuteTotal : ', minutesDifference);
              difference -= minutesDifference * 1000 * 60;
              console.log('minuteTotal 2 : ', minutesDifference);
              const secondsDifference = Math.floor(difference / 1000);
              // Algo pour la gestion du temps
              if (monthDifference > 0) {
                resNotif.date = monthDifference + ' mois';
              } else if (daysDifference > 7) {
                resNotif.date = '1 sem';
                if (daysDifference > 14) {
                  resNotif.date = '2 sem';
                }
                if (daysDifference > 21) {
                  resNotif.date = '3 sem';
                }
                if (daysDifference > 27) {
                  resNotif.date = '4 sem';
                }
              }
              else if (daysDifference > 0) {
                resNotif.date = daysDifference + ' j';
              } else if (hoursDifference > 0) {
                resNotif.date = hoursDifference + ' h';
              } else {
                resNotif.date = minutesDifference + ' min';
              }
              resNotif.key = notification.key;
              resNotif.type = notification.type;
              resNotif.nom = prepa.nom;
              resNotif.notification = notification.notification;
              resNotif.message = notification.message;
              resNotif.nomProprietaire = this.userNom;
              resNotif.prenomProprietaire = this.userPrenom;
              resNotif.notifDisabled = notification.notifDisabled;
              this.notificationFiche = resNotif;
            });
          });
          this.notifications.push(resNotif);
        } else {
          // fiche technique plats partagé gestion du temps du partage
          const resNotif = new NotificationFiche();
          this.dataService.getPlatPartageById(notification.idDocPartage).then((plat: Plats) => {
            this.dataService.getUtilisateurById(plat.idUtilisateur).then((user: Utilisateurs) => {
              this.userNom = user.nom;
              this.userPrenom = user.prenom;
              resNotif.idDocPartage = notification.idDocPartage;
              // calcul du temps
              let difference = this.toDay * 1000 - notification.date.seconds * 1000;
              console.log('dif: ', difference);
              const monthDifference = Math.floor(difference / 1000 / 60 / 60 / 24 / 30);
              difference -= monthDifference * 1000 * 60 * 60 * 24 * 30;
              console.log('monthDifference : ', monthDifference);
              const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
              difference -= daysDifference * 1000 * 60 * 60 * 24;
              console.log('daysDifference : ', daysDifference);
              const hoursDifference = Math.floor(difference / 1000 / 60 / 60);
              difference -= hoursDifference * 1000 * 60 * 60;
              console.log('hoursDifference : ', hoursDifference);
              const minutesDifference = Math.floor(difference / 1000 / 60);
              console.log('minuteTotal : ', minutesDifference);
              difference -= minutesDifference * 1000 * 60;
              console.log('minuteTotal 2 : ', minutesDifference);
              const secondsDifference = Math.floor(difference / 1000);
              // finir algo pour aller plus loin dans le temps
              if (monthDifference > 0) {
                resNotif.date = monthDifference + ' mois';
              } else if (daysDifference > 7) {
                resNotif.date = '1 sem';
                if (daysDifference > 14) {
                  resNotif.date = '2 sem';
                }
                if (daysDifference > 21) {
                  resNotif.date = '3 sem';
                }
                if (daysDifference > 27) {
                  resNotif.date = '4 sem';
                }
              } else if (daysDifference > 0) {
                resNotif.date = daysDifference + ' j';
              } else if (hoursDifference > 0) {
                resNotif.date = hoursDifference + ' h';
              } else {
                resNotif.date = minutesDifference + ' min';
              }
              resNotif.key = notification.key;
              resNotif.type = notification.type;
              resNotif.nom = plat.nom;
              resNotif.notification = notification.notification;
              resNotif.message = notification.message;
              resNotif.nomProprietaire = this.userNom;
              resNotif.prenomProprietaire = this.userPrenom;
              resNotif.notifDisabled = notification.notifDisabled;
              this.notificationFiche = resNotif;
            });
          });
          this.notifications.push(this.notificationFiche);
        }
      });
    });
  }



  openFiche(notification: NotificationFiche, type: string) {
    const disabledNotif = false;
    this.dataService.updateNotification(notification.key, disabledNotif);
    if ('fiche Préparation' === type) {
      this.dataService.getPrepaPartageById(notification.idDocPartage).then(prepa => {
        console.log(prepa);
        const navigationExtras: NavigationExtras = {
          state: {
            value: prepa,
            update: this.ficheUpdate
          }
        };
        this.route.navigate(['view-preparation'], navigationExtras);
      });
    } else {
      this.dataService.getPlatPartageById(notification.idDocPartage).then(plat => {
        const navigationExtras: NavigationExtras = {
          state: {
            value: plat,
            update: this.ficheUpdate
          }
        };
        this.route.navigate(['view-plat'], navigationExtras);
      });
    }
  }

}
