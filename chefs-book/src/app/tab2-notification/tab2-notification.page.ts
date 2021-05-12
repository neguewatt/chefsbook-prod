import { Utilisateurs } from '../models/Utilisateurs';
import { FicheTechniques } from 'src/app/models/ficheTechniques';
import { NotificationFiche } from '../models/notification';
import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from '../service/auth-firebase.service';
import { map } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';
import { Plats } from '../models/plats';

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
  toDay = Math.round(new Date().getTime() / 1000);




  constructor(
    private dataService: AuthFirebaseService,
    private route: Router,
  ) {

  }


  ngOnInit() {
    this.getNotification();
  }

  getNotification() {
    this.dataService.getNotification().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(res => {
      res.forEach(notification => {
        if ('fiche Préparation' === notification.type) {
          this.dataService.getPrepaPartageById(notification.idDocPartage).then((prepa: FicheTechniques) => {
            this.dataService.getUtilisateurById(prepa.idUtilisateur).then((user: Utilisateurs) => {
              this.userNom = user.nom;
              this.userPrenom = user.prenom;
              const resNotif = new NotificationFiche();
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
              difference -= hoursDifference  * 1000 * 60 * 60;
              console.log('hoursDifference : ', hoursDifference );
              const minutesDifference = Math.floor(difference / 1000 / 60);
              console.log('minuteTotal : ', minutesDifference);
              difference -= minutesDifference * 1000 * 60;
              console.log('minuteTotal 2 : ', minutesDifference);
              const secondsDifference = Math.floor(difference / 1000);
              // finir algo pour aller plus loin dans le temps
              if (monthDifference > 0){
                resNotif.date =  monthDifference + ' mois';
              }else if (daysDifference > 7){
                resNotif.date = '1 sem';
                if (daysDifference > 14){
                  resNotif.date = '2 sem';
                }
                if (daysDifference > 21){
                  resNotif.date = '3 sem';
                }
                if (daysDifference > 27){
                  resNotif.date = '4 sem';
                }
              }
              else if (daysDifference > 0){
                resNotif.date = daysDifference + ' j';
              }else if (hoursDifference > 0){
                resNotif.date = hoursDifference + ' h';
              }else{
                resNotif.date = minutesDifference + ' min';
              }
              resNotif.type = notification.type;
              resNotif.nom = prepa.nom;
              resNotif.notification = notification.notification;
              resNotif.message = notification.message;
              resNotif.nomProprietaire = this.userNom;
              resNotif.prenomProprietaire = this.userPrenom;
              this.notificationFiche = resNotif;
              console.log(resNotif);
              this.notifications.push(this.notificationFiche);
            });
          });
        } else {
          this.dataService.getPlatPartageById(notification.idDocPartage).then((plat: Plats) => {
            this.dataService.getUtilisateurById(plat.idUtilisateur).then((user: Utilisateurs) => {
              this.userNom = user.nom;
              this.userPrenom = user.prenom;
              const resNotif = new NotificationFiche();
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
              difference -= hoursDifference  * 1000 * 60 * 60;
              console.log('hoursDifference : ', hoursDifference );
              const minutesDifference = Math.floor(difference / 1000 / 60);
              console.log('minuteTotal : ', minutesDifference);
              difference -= minutesDifference * 1000 * 60;
              console.log('minuteTotal 2 : ', minutesDifference);
              const secondsDifference = Math.floor(difference / 1000);
              // finir algo pour aller plus loin dans le temps
              if (monthDifference > 0){
                resNotif.date =  monthDifference + ' mois';
              }else if (daysDifference > 7){
                resNotif.date = '1 sem';
                if (daysDifference > 14){
                  resNotif.date = '2 sem';
                }
                if (daysDifference > 21){
                  resNotif.date = '3 sem';
                }
                if (daysDifference > 27){
                  resNotif.date = '4 sem';
                }
              }else if (daysDifference > 0){
                resNotif.date = daysDifference + ' j';
              }else if (hoursDifference > 0){
                resNotif.date = hoursDifference + ' h';
              }else{
                resNotif.date = minutesDifference + ' min';
              }

              resNotif.type = notification.type;
              resNotif.nom = plat.nom;
              resNotif.notification = notification.notification;
              resNotif.message = notification.message;
              resNotif.nomProprietaire = this.userNom;
              resNotif.prenomProprietaire = this.userPrenom;
              this.notificationFiche = resNotif;
              console.log(resNotif);
              this.notifications.push(this.notificationFiche);
            });
          });
        }
      });
    });
  }



  openFiche(key: string, type: string) {
    console.log(key);
    if ('fiche Préparation' === type) {
      this.dataService.getPrepaPartageById(key).then(prepa => {
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
      this.dataService.getPlatPartageById(key).then(plat => {
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