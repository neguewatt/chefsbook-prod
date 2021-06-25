import { Preparation } from 'src/app/models/preparation';
import { Abonnement } from '../models/abonnement';
import { Unites } from './../models/unites';
import { Plats } from './../models/plats';
import { Notification, NotificationFiche } from './../models/notification';
import { Produits } from './../models/produits';
import { Denrees } from './../models/denrees';
import { Livres } from 'src/app/models/livres';
import { Utilisateurs } from './../models/Utilisateurs';
import { AuthLoginService } from './auth-login.service';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AffichageIngredients } from '../models/affichageIngredients';
import { EcranDefaut } from '../models/ecranDefaut';
import { Fond } from '../models/fond';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { PosteDeTravail } from '../models/postes';


@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

  // variable globale

  user = firebase.default.auth().currentUser;
  livresPersoListe: Livres[] = [];
  posteDeTravailListe: PosteDeTravail[];
  preparationListe: Preparation[] = [];
  partagePrepaListe: Preparation[] = [];
  platListe: Plats[] = [];
  partagePlatsListe: Plats[] = [];
  fichesTechniqueAll: any[] = [];
  /** poour l'instant utilisé en JSON car trop lourd voir si une solution est envisageable au moment ou l'app sera vendu **/
  produitsListe: Produits[];

  unitesListe: Unites[];
  tableau1 = false;
  tableau2 = false;
  utilisateur: Utilisateurs;
  tableData: Preparation[];
  abonnement: Abonnement;
  limitePartage: number;
  limitFiches: number;
  badgeNotif: number;


  // liens URL
  private livresPath = '/livre';
  private preparationPath = '/preparation';
  private platPath = '/plats';
  private denreesPath = '/denrées';
  private experiencePath = '/experience';
  /** poour l'instant utilisé en JSON car trop lourd voir si une solution est envisageable au moment ou l'app sera vendu **/
  private produitPath = '/produits';

  private unitePath = '/unites';
  private ordreTableauFTPath = '/affichageIngredients';
  private ecranDefautPath = '/ecranDefaut';
  private fondPath = '/fond';
  private formationPath = '/formation';
  private utilisateurPath = '/utilisateur';
  private notificationPath = '/notification';
  private posteDeTravailPath = '/poste';
  private formulePath = '/formule';
  // end lien URL

  // appel de la classe AngularFirestore
  private livresDb: AngularFirestoreCollection<Livres>;
  private livresPersoDb: AngularFirestoreCollection<Livres> = null;
  private livresRefDb: AngularFirestoreCollection<Livres> = null;
  private livresAchatDb: AngularFirestoreCollection<Livres> = null;
  private notificationDb: AngularFirestoreCollection<Notification> = null;
  private notificationAllDb: AngularFirestoreCollection<Notification> = null;
  private preparationDb: AngularFirestoreCollection<Preparation> = null;
  private ficheTechniqueByLivreDb: AngularFirestoreCollection<Preparation> = null;
  private platDb: AngularFirestoreCollection<Plats> = null;
  private denreesDb: AngularFirestoreCollection<Denrees> = null;

  /** poour l'instant utilisé en JSON car trop lourd voir si une solution est envisageable au moment ou l'app sera vendu **/
  private produitDb: AngularFirestoreCollection<Produits> = null;

  private ordreTableauFTDb: AngularFirestoreCollection<AffichageIngredients> = null;
  private ecranDefautDb: AngularFirestoreCollection<EcranDefaut> = null;
  private fondDb: AngularFirestoreCollection<Fond> = null;
  private utilisateurDb: AngularFirestoreCollection<Utilisateurs> = null;
  private utilisateurByIdDb: AngularFirestoreCollection<Utilisateurs> = null;

  // end appel de la classe AngularFirestore

  constructor(public db: AngularFirestore, public authLogin: AuthLoginService) {

    if (this.user !== null) {
      this.initCompteUtilisateur();  // Au démarage application
    }
  }

  initialiseGet() {
    const date = new Date();
    const first = new Date(date.getFullYear(), date.getMonth(), 1);
    this.initformule(); // Au démarage application
    this.initLivrePerso(); // Au démarage application
    this.initFicheTechniquesPartage();  // Au démarage application
    this.initPlatsPartage();  // Au démarage application
    this.initOrdreTableau();  // Au démarage application
    this.initPosteDeTravail();  // Au démarage de la page creation de fiche
    //this.getProduitListe();  // Au démarage de la page creation de fiche
    this.initUnitesListe(); // Au démarage de la page creation de fiche
    this.initFichesTechniqueAll();
    if (this.preparationListe.length === 0) {
      this.initListePreparations();  // Au démarage application
    }
    if (this.platListe.length === 0) {
      this.initListePlats();  // Au démarage application
    }
    if(this.utilisateur.partage !== 0 && date.getDate() === 14){
      console.log('remise a zero de partage');
      this.updateUtilisateurPartageZero()
    }
  }


  /** creation des documents **/

  addFicheTechnique(fiche: Preparation) {
    this.preparationDb = this.db.collection(this.preparationPath, ref => ref);
    //  console.log('add fiche prepa');
    return this.preparationDb.add({ ...fiche });
  }
  addPlat(plat: Plats) {
    this.platDb = this.db.collection(this.platPath, ref => ref);
    //  console.log('add fiche plat');
    return this.platDb.add({ ...plat });
  }
  addLivre(livre: Livres) {
    this.livresDb = this.db.collection(this.livresPath, ref => ref);
    return this.livresDb.add({ ...livre });
  }
  addDenrees(denrees: Denrees) {
    this.denreesDb = this.db.collection(this.denreesPath, ref => ref);
    return this.denreesDb.add({ ...denrees });
  }
  addUtilisateur(key: string, utilisateur: Utilisateurs) {
    this.utilisateurDb = this.db.collection(this.utilisateurPath, ref => ref);
    //  console.log('add Utilisateur');
    return this.utilisateurDb.doc(key).set({ ...utilisateur });
  }
  addOrderTable(affichageIngredients: AffichageIngredients) {
    this.ordreTableauFTDb = this.db.collection(this.ordreTableauFTPath, ref => ref);
    //  console.log('add order table');
    return this.ordreTableauFTDb.add({ ...affichageIngredients });
  }
  addEcranDefaut(ecranDefaut: EcranDefaut) {
    this.ecranDefautDb = this.db.collection(this.ecranDefautPath, ref => ref);
    //  console.log('add ecran defaut');
    return this.ecranDefautDb.add({ ...ecranDefaut });
  }
  addFond(fond: Fond) {
    this.fondDb = this.db.collection(this.fondPath, ref => ref);
    //  console.log('add ecran defaut');
    return this.fondDb.add({ ...fond });
  }
  addNotification(notification: Notification) {
    this.notificationDb = this.db.collection(this.notificationPath, ref => ref);
    //  console.log('add notification');
    return this.notificationDb.add({ ...notification });
  }

  /** end creation des documents **/

  /** ----------------------------------------------- **/

  /** Start  : INIT au démarage de l'application  **/


  initCompteUtilisateur() {
    this.db.collection<Utilisateurs>(this.utilisateurPath, ref => ref
      .where('idUtilisateur', '==', this.user.uid)).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).subscribe((utilisateur: Utilisateurs[]) => {
        this.utilisateur = utilisateur[0];
        console.log(this.utilisateur);
        this.initialiseGet();
    });

  }


  getBadgeNotif() {
    this.db.collection<Notification>(this.notificationPath, ref => ref
      .where('idUtilisateur', '==', this.user.uid)
      .where('notifDisabled', '==', true)
      .orderBy('date', 'desc'))
      .snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).subscribe(res => {
        this.badgeNotif = res.length;
      });
  }
  initLivrePerso() {
    this.db.collection<Livres>(this.livresPath, ref => ref
      .where('idUtilisateur', '==', [this.user.uid])
      .where('position', '==', 'personnel'))
      .snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).subscribe((livres: Livres[]) => {
        this.livresPersoListe = livres;
      });
  }
  initListePreparations() {
    this.db.collection<Preparation>(this.preparationPath, ref => ref
      .where('idUtilisateur', '==', this.user.uid)
      .orderBy('nom', 'asc')).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).subscribe((fiches: Preparation[]) => {
        this.preparationListe = fiches;
      });
  }
  initFicheTechniquesPartage() {
    this.db.collection<Preparation>(this.preparationPath, ref => ref
      .where('idPartage', 'array-contains', this.user.uid)
      .orderBy('nom', 'asc'))
      .snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).subscribe((fiches: Preparation[]) => {
        //  console.log('test4', fiches);
        this.partagePrepaListe = fiches;
      });
  }
  initListePlats() {
    this.db.collection<Plats>(this.platPath, ref => ref
      .where('idUtilisateur', '==', this.user.uid)
      .orderBy('nom', 'asc'))
      .snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).subscribe((plats: Plats[]) => {
        this.platListe = plats;
      });
  }
  initPlatsPartage() {
    this.db.collection<Plats>(this.platPath, ref => ref
      .where('idPartage', 'array-contains', this.user.uid)
      .orderBy('nom', 'asc')).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).subscribe((plats: Plats[]) => {
        this.partagePlatsListe = plats;
      });
  }
  initFichesTechniqueAll() {
    if (this.preparationListe) {
      this.preparationListe.forEach((fiche: any) => {
        this.fichesTechniqueAll.push(fiche);
      });
    }
    if (this.platListe) {
      this.platListe.forEach((fiche: any) => {
        this.fichesTechniqueAll.push(fiche);
      });
    }
  }

  /** ------ordre d'affichage des denrées (Nature Unite Quantite ou Quantite Unite Nature)------ **/

  initOrdreTableau() {
    this.db.collection<AffichageIngredients>(this.ordreTableauFTPath, ref => ref
      .where('idUtilisateur', '==', this.user.uid)).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).subscribe((table: AffichageIngredients[]) => {
        if (table[0].natureUniteQuantite) {
          this.tableau1 = false;
          this.tableau2 = true;
        } else {
          this.tableau1 = true;
          this.tableau2 = false;
        }
      });
  }
  initPosteDeTravail() {
    this.db.collection<PosteDeTravail>(this.posteDeTravailPath, ref => ref
      .orderBy('nom', 'asc'))
      .snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).subscribe((poste: PosteDeTravail[]) => {
        this.posteDeTravailListe = poste;
      });
  }
  initUnitesListe() {
    this.db.collection<Unites>(this.unitePath, ref => ref)
      .snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).subscribe((unites: Unites[]) => {
        this.unitesListe = unites;
      });
  }
  initformule() {
    this.db.collection<Abonnement>(this.formulePath, ref => ref.where('abonnement', '==', this.utilisateur.abonnement))
      .snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).subscribe((limite: Abonnement[]) => {
        this.abonnement = limite[0];

        this.limitePartage = this.abonnement.partage;
        this.limitFiches = this.abonnement.limiteFiche;
        // this.getAbonnement();
      });
  }
  // initAbonnement() {
  //   this.lmitesListe.forEach((limite: Abonnement) => {
  //     if (limite.abonnement === 'G' && this.utilisateur.abonnement === 'G') {
  //       this.limitFiches = limite.limiteFiche;
  //     }
  //     if (limite.abonnement === 'P1' && this.utilisateur.abonnement === 'P1') {
  //       this.limitFiches = limite.limiteFiche;
  //     }
  //     if (limite.abonnement === 'P2E' && this.utilisateur.abonnement === 'P2E') {
  //       this.limitFiches = limite.limiteFiche;
  //     }
  //     if (limite.abonnement === 'P3' && this.utilisateur.abonnement === 'P3') {
  //       this.limitFiches = limite.limiteFiche;
  //     }
  //     if (limite.abonnement === 'P4' && this.utilisateur.abonnement === 'P4') {
  //       this.limitFiches = limite.limiteFiche;
  //     }
  //   });
  // }


  /** END GET **/

  /** Start du GETER apres le call d'une page **/


  async getPrepaPartageById(key: string) {
    const prepa = this.db.collection(this.preparationPath).doc(key).get().toPromise();
    return (await prepa).data();
  }
  getPrepaPartage(): Observable<Preparation[]> {
    this.preparationDb = this.db.collection(this.preparationPath, ref => ref
      .where('idPartage', 'array-contains', this.user.uid).orderBy('nom', 'asc'));
    return this.preparationDb.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    );
  }
  async getPlatPartageById(key: string) {
    const prepa = this.db.collection(this.platPath).doc(key).get().toPromise();
    return (await prepa).data();
  }

  getUtilisateurById(key: string): Observable<Utilisateurs[]> {
    this.utilisateurByIdDb = this.db.collection(this.utilisateurPath, ref => ref
      .where('idUtilisateur', '==', key));
    return this.utilisateurByIdDb.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    );
  }


  getPlatPartage(): Observable<Plats[]> {
    this.platDb = this.db.collection(this.platPath, ref => ref.where('idPartage', 'array-contains', this.user.uid));
    return  this.platDb.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    );
  }

  getFicheTechniquesListPrepa(): Observable<Preparation[]> {
    this.preparationDb = this.db.collection<Preparation>(this.preparationPath, ref => ref
      .where('idUtilisateur', '==', this.user.uid)
      .orderBy('nom', 'asc'));
    return this.preparationDb.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    );
  }

  getFicheTechniquesListPlat(): Observable<Plats[]> {
    this.platDb = this.db.collection(this.platPath, ref => ref
      .where('idUtilisateur', '==', this.user.uid)
      .orderBy('nom'));
    return this.platDb.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    );
  }
  // getFicheTechniquesByLivre(livreNom: string): Observable<Preparation[]> {
  //   this.ficheTechniqueByLivreDb = this.db.collection(this.preparationPath, ref =>
  //     ref.where('idUtilisateur', '==', this.user.uid)
  //       .where('livre', '==', livreNom));
  //   return this.ficheTechniqueByLivreDb.snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(c =>
  //         ({ key: c.payload.doc.id, ...c.payload.doc.data() })
  //       )
  //     )
  //   );
  // }

  // getFicheTechniquesByLivrePartage(livreNom: string, userId: string): Observable<Preparation[]> {
  //   this.ficheTechniqueByLivreDb = this.db.collection(this.preparationPath, ref =>
  //     ref.where('idUtilisateur', '==', this.user.uid)
  //       .where('idPartage', '==', [userId])
  //       .where('livre', '==', livreNom));
  //   return this.ficheTechniqueByLivreDb.snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(c =>
  //         ({ key: c.payload.doc.id, ...c.payload.doc.data() })
  //       )
  //     )
  //   );
  // }

  // getDenreesList(): Observable<Denrees[]> {
  //   this.denreesDb = this.db.collection(this.denreesPath, ref => ref.where('idUtilisateur', '==', this.user.uid));
  //   return this.denreesDb.snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(c =>
  //         ({ key: c.payload.doc.id, ...c.payload.doc.data() })
  //       )
  //     )
  //   );
  // }

  // getProduitList(): AngularFirestoreCollection<Produits> {
  //   this.produitDb = this.db.collection(this.produitPath, ref => ref.orderBy('type', 'asc'));
  //   return this.produitDb;
  // }

  getOrdreTableauFT(): Observable<AffichageIngredients[]> {
    this.ordreTableauFTDb = this.db.collection(this.ordreTableauFTPath, ref => ref.where('idUtilisateur', '==', this.user.uid));
    return this.ordreTableauFTDb.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    );
  }

  // getLivreList(): AngularFirestoreCollection<Livres> {
  //   this.livresDb = this.db.collection(this.livresPath, ref => ref.where('idUtilisateur', '==', [this.user.uid]));
  //   return this.livresDb;
  // }

  getLivrePersoList(): Observable<Livres[]> {
    this.livresPersoDb = this.db.collection(this.livresPath, ref => ref
      .where('idUtilisateur', '==', [this.user.uid]).where('position', '==', 'personnel'));
    return this.livresPersoDb.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    );
  }

  // getLivreRefList(): AngularFirestoreCollection<Livres> {
  //   this.livresRefDb = this.db.collection(this.livresPath, ref => ref
  //     .where('idUtilisateur', '==', [this.user.uid]).where('référence', '==', true));
  //   return this.livresRefDb;
  // }

  // getLivreAchatList(): AngularFirestoreCollection<Livres> {
  //   this.livresAchatDb = this.db.collection(this.livresPath, ref => ref
  //     .where('idUtilisateur', '==', [this.user.uid]).where('position', '==', 'achat'));
  //   return this.livresAchatDb;
  // }

  getUtilisateur(): Observable<Utilisateurs[]> {
    this.utilisateurDb = this.db.collection(this.utilisateurPath, ref => ref.where('idUtilisateur', '==', this.user.uid));
    return this.utilisateurDb.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    );
  }

  // getUtilisateurById(userId: string): AngularFirestoreCollection<Utilisateurs> {
  //   this.utilisateurDb = this.db.collection(this.utilisateurPath, ref => ref.where('idUtilisateur', '==', userId));
  //   return this.utilisateurDb;
  // }

  getUtilisateurByEmail(email: string): Observable <Utilisateurs[]>{
    this.utilisateurDb = this.db.collection(this.utilisateurPath, ref => ref.where('email', '==', email));
    return this.utilisateurDb.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    );
  }
  // getEcranDefautByUID(uid: string): AngularFirestoreCollection<EcranDefaut> {
  //   this.ecranDefautDb = this.db.collection(this.ecranDefautPath, ref => ref.where('idUtilisateur', '==', uid));
  //   return this.ecranDefautDb;
  // }
  getEcranDefaut(): Observable<EcranDefaut[]> {
    this.ecranDefautDb = this.db.collection(this.ecranDefautPath, ref => ref.where('idUtilisateur', '==', this.user.uid));
    return this.ecranDefautDb.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    );
  }
  getNotification(): Observable<Notification[]> {
    this.notificationAllDb = this.db.collection(this.notificationPath, ref => ref
      .where('idUtilisateur', '==', this.user.uid).orderBy('date', 'desc'));
    return this.notificationAllDb.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    );
  }
  getNotificationBadge(): Observable<Notification[]> {
    this.notificationDb = this.db.collection(this.notificationPath, ref => ref
      .where('idUtilisateur', '==', this.user.uid)
      .where('notifDisabled', '==', true).orderBy('date', 'desc'))
    return this.notificationDb.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    );;
  }

  // end affichage des documents

  // start update documents
  updateLivre(key: string, newNom: string) {
    const updateLivre = this.db.collection(this.livresPath).doc(key).update({ nom: newNom });
    return updateLivre;
  }

  updateFicheIdPartage(fiche: any, userId: any, message: string) {
    let path: string;
    if (fiche.type === 'Plat') {
      path = this.platPath;
    } else {
      path = this.preparationPath;
    }
    const updateFiche = this.db.collection(path).doc(fiche.key).update({
      idPartage: firebase.default.firestore.FieldValue.arrayUnion(userId)
    });
    const notification = new Notification();
    const today = new Date();
    notification.idUtilisateur = userId;
    notification.idDocPartage = fiche.key;
    notification.date = today;
    notification.type = 'fiche ' + fiche.type;
    notification.notification = 'la fiche technique ' + fiche.nom + ' de type : ' + fiche.type + ' vient d\'être partagé avec vous !';
    notification.message = message;
    this.addNotification(notification);
    this.UpdateUtilisateurPartageIncrement();
    return updateFiche;
  }
  async updateUtilisateurPartageZero(){
    console.log(this.utilisateur.idUtilisateur);

    await delay(1500);
    this.utilisateur.partage = 0;
    const updateUtilisater = this.db.collection(this.utilisateurPath).doc(this.utilisateur.idUtilisateur).update(this.utilisateur);
    return updateUtilisater;
  }
  UpdateUtilisateurPartageIncrement() {
    console.log(this.utilisateur);
    this.utilisateur.partage++;
    const updateUtilisater = this.db.collection(this.utilisateurPath).doc(this.utilisateur.idUtilisateur).update(this.utilisateur);
    return updateUtilisater;
  }

  updateFichePrepa(key: string, fiche: Preparation) {
    const updateFiche = this.db.collection(this.preparationPath).doc(key).update({
      date: fiche.date,
      descriptionTechniques: fiche.descriptionTechniques,
      denrees: fiche.denrees,
      nom: fiche.nom,
      poste: fiche.poste,
      produitRef: fiche.produitRef,
      livre: fiche.livre,
    });

    // const notification = new Notification();
    // const today = new Date();
    // notification.idUtilisateur = userId;
    // notification.idDocPartage = fiche.key;
    // notification.date = today;
    // notification.type = 'fiche ' + fiche.type;
    // notification.notification = 'la fiche technique ' + fiche.nom + ' de type : ' + fiche.type + ' vient d\'être partagé avec vous !';
    // notification.message = message;
    // this.addNotification(notification);
    return updateFiche;
  }


  updateFichePlat(key: string, fiche: Plats) {
    const updateFiche = this.db.collection(this.preparationPath).doc(key).update({
      date: fiche.date,
      // denrees:
      // portion:
      nom: fiche.nom,
      poste: fiche.poste,
      // fichePreparation:
      descriptionCommercial: fiche.descriptionCommercial,
      descriptionTechnique: fiche.descriptionTechnique,

    });

    // const notification = new Notification();
    // const today = new Date();
    // notification.idUtilisateur = userId;
    // notification.idDocPartage = fiche.key;
    // notification.date = today;
    // notification.type = 'fiche ' + fiche.type;
    // notification.notification = 'la fiche technique ' + fiche.nom + ' de type : ' + fiche.type + ' vient d\'être partagé avec vous !';
    // notification.message = message;
    // this.addNotification(notification);
    return updateFiche;
  }




  updateTableauFiche(key: string, tableau: AffichageIngredients) {
    const table1 = this.db.collection(this.ordreTableauFTPath).doc(key).update(tableau);
    return table1;
  }

  updateEcranDefaut(key: string, tableau: EcranDefaut) {
    const table = this.db.collection(this.ecranDefautPath).doc(key).update(tableau);
    return table;
  }

  updateNotification(key: string, disabled: boolean) {
    const updateNotif = this.db.collection(this.notificationPath).doc(key).update({ notifDisabled: disabled });
    return updateNotif;
  }


  // end update documents

  // start delete

  deleteFiche(fiche) {
    if (fiche.type === 'Préparation') {
      this.db.collection(this.preparationPath).doc(fiche.key).delete().then(() => {
        //  console.log('Document prepa successfully deleted!');
        this.initListePreparations();
      }).catch((error) => {
        console.error('Error removing document: ', error);
      });
    } else {
      this.db.collection(this.platPath).doc(fiche.key).delete().then(() => {
        //  console.log('Document plat successfully deleted!');
      }).catch((error) => {
        console.error('Error removing document: ', error);
      });
    }
    this.db.collection(this.notificationPath, ref => ref.where('idDocPartage', '==', fiche.key))
    .snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id })
        )
      )
    ).subscribe(data => {
      if (data.length !== 0) {
        try {
          this.db.doc(this.notificationPath + '/' + data[0].key).delete();
        } catch (error) {
          console.log(error);
        }
      }
    });
  }

  deleteNotif(notifiaction: NotificationFiche){
    this.db.collection(this.notificationPath).doc(notifiaction.key).delete().then(() => {
    }).catch((error) => {
      console.error('Error removing document: ', error);
    });
  }



  deleteUser() {
    this.db.collection(this.utilisateurPath, ref => ref.where('idUtilisateur', '==', this.user.uid))
      .valueChanges().subscribe(res => {
        res.map((data: Utilisateurs) => {
          //  console.log(data);
          if (data) {
            this.db.doc(this.utilisateurPath + '/' + data.idUtilisateur).delete();
          }
        });
      });

    this.db.collection(this.ordreTableauFTPath, ref => ref.where('idUtilisateur', '==', this.user.uid))
      .snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.doc.id })
          )
        )
      ).subscribe(res => {
        //  console.log(res);
        if (res) {
          this.db.doc(this.ordreTableauFTPath + '/' + res[0].key).delete();
        }
      });

    this.db.collection(this.ecranDefautPath, ref => ref.where('idUtilisateur', '==', this.user.uid))
      .snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.doc.id })
          )
        )
      )
      .subscribe(res => {
        if (res) {
          this.db.doc(this.ecranDefautPath + '/' + res[0].key).delete();
        }
      });

    this.db.collection(this.experiencePath, ref => ref.where('idUtilisateur', '==', this.user.uid))
      .snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.doc.id })
          )
        )
      )
      .subscribe(res => {
        if (res) {
          this.db.doc(this.experiencePath + '/' + res[0].key).delete();
        }
      });

    this.db.collection(this.fondPath, ref => ref.where('idUtilisateur', '==', this.user.uid))
      .snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.doc.id })
          )
        )
      )
      .subscribe(res => {
        if (res) {
          this.db.doc(this.fondPath + '/' + res[0].key).delete();
        }
      });

    this.db.collection(this.formationPath, ref => ref.where('idUtilisateur', '==', this.user.uid))
      .snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.doc.id })
          )
        )
      )
      .subscribe(res => {
        if (res) {
          this.db.doc(this.formationPath + '/' + res[0].key).delete();
        }
      });

    this.db.collection(this.livresPath, ref => ref.where('idUtilisateur', '==', this.user.uid))
      .snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.doc.id })
          )
        )
      )
      .subscribe(res => {
        if (res) {
          res.forEach(livre => {
            this.db.doc(this.livresPath + '/' + livre.key).delete();
          });
        }
      });

    this.db.collection(this.notificationPath, ref => ref.where('idUtilisateur', '==', this.user.uid))
      .snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.doc.id })
          )
        )
      )
      .subscribe(res => {
        if (res) {
          res.forEach(notif => {
            this.db.doc(this.notificationPath + '/' + notif.key).delete();
          });
        }
      });

    this.db.collection(this.platPath, ref => ref.where('idUtilisateur', '==', this.user.uid))
      .snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.doc.id })
          )
        )
      )
      .subscribe(res => {
        if (res) {
          res.forEach(plat => {
            this.db.doc(this.platPath + '/' + plat.key).delete();
          });
        }
      });

    this.db.collection(this.preparationPath, ref => ref.where('idUtilisateur', '==', this.user.uid))
      .snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.doc.id })
          )
        )
      )
      .subscribe(res => {
        if (res) {
          res.forEach(prepa => {
            this.db.doc(this.preparationPath + '/' + prepa.key).delete();
          });
        }
      });
    this.user.delete();
    this.authLogin.signOutUser();
  }


}
