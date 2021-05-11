import { PrepaPage } from './../tab1-library/fiches/creation-fiche2/prepa/prepa.page';
import { Unites } from './../models/unites';
import { FicheTechniques } from './../models/ficheTechniques';
import { Plats } from './../models/plats';
import { Notification } from './../models/notification';
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
import { map } from 'rxjs/operators';
import { PosteDeTravail } from '../models/postes';


@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

  user = firebase.default.auth().currentUser;

  // liens URL
  private livresPath = '/livre';
  private preparationPath = '/preparation';
  private platPath = '/plats';
  private denreesPath = '/denrées';
  private experiencePath = '/experience';
  private produitPath = '/produits';
  private unitePath = '/unites';
  private ordreTableauFTPath = '/affichageIngredients';
  private ecranDefautPath = '/ecranDefaut';
  private fondPath = '/fond';
  private formationPath = '/formation';
  private utilisateurPath = '/utilisateur';
  private notificationPath = '/notification';
  private posteDeTravailPath = '/poste';
  // end lien URL

  // test



  // appel de la classe AngularFirestore
  livresDb: AngularFirestoreCollection<Livres> = null;
  livresPersoListe: Livres[] = [];
  livresPersoDb: AngularFirestoreCollection<Livres> = null;
  livresRefDb: AngularFirestoreCollection<Livres> = null;
  livresAchatDb: AngularFirestoreCollection<Livres> = null;

  notificationDb: AngularFirestoreCollection<Notification> = null;

  preparationDb: AngularFirestoreCollection<FicheTechniques>;
  prepaObservable: Observable<FicheTechniques[]>;

  posteDeTravailDB: AngularFirestoreCollection<PosteDeTravail> = null;
  posteDeTravailListe: PosteDeTravail[];

  ficheTechniqueByLivreDb: AngularFirestoreCollection<FicheTechniques> = null;
  ficheTechniquePrepaDb: AngularFirestoreCollection<FicheTechniques> = null;
  preparationListe: FicheTechniques[] = [];
  partagePrepaListe: FicheTechniques[] = [];
  platDb: AngularFirestoreCollection<Plats> = null;
  platListe: Plats[] = [];
  partagePlatsListe: Plats[] = [];
  fichesTechniqueAll: any[] = [];

  denreesDb: AngularFirestoreCollection<Denrees> = null;
  produitDb: AngularFirestoreCollection<Produits> = null;
  produitsListe: Produits[];
  unitesDb: AngularFirestoreCollection<Unites> = null;
  unitesListe: Unites[];

  ordreTableauFTDb: AngularFirestoreCollection<AffichageIngredients> = null;
  tableau1 = false;
  tableau2 = false;
  ecranDefautDb: AngularFirestoreCollection<EcranDefaut> = null;
  fondDb: AngularFirestoreCollection<Fond> = null;

  utilisateurDb: AngularFirestoreCollection<Utilisateurs> = null;
  utilisateur: Utilisateurs;
  tableData: FicheTechniques[];
  // end appel de la classe AngularFirestore

  constructor(public db: AngularFirestore, public authLogin: AuthLoginService) {

    if (this.user != null) {
      // this.preparationDb = db.collection<FicheTechniques>(this.preparationPath,ref => ref);
      this.getLivrePerso() // Au démarage application 
      this.getListePreparations();  // Au démarage application
      this.getFicheTechniquesPartage();  // Au démarage application
      this.getListePlats();  // Au démarage application
      this.getPlatsPartage();  // Au démarage application
      this.getCompteUtilisateur()  // Au démarage application
      this.getOrdreTableau();  // Au démarage application
      // this.getPosteDeTravail();  // Au démarage de la page creation de fiche
      // this.getProduitListe();  // Au démarage de la page creation de fiche
      this.getUnitesListe(); 

      // this.posteDb = db.collection(this.postesPath);

      // tslint:disable-next-line:max-line-length
      // this.livresRefDb = db.collection(this.livresPath, ref => ref.where('idUtilisateur', '==', [this.user.uid]).where('référence', '==', true));

      console.log('test auth ... ', [this.user.uid]);

      // this.fondDb = this.db.collection(this.fondPath, ref => ref.where('idUtilisateur', '==', this.user.uid));

    }
    // Used for design integration ONLY! (vincent rolland)
    // else {
    //   // TODO TODO TODO remove !!!
    //   this.user = {uid: 'oC0Eab3S4LNWGnXhJLfZZdNQEV13'} as any;
    // }
  }

  // creation des documents

  addFicheTechnique(fiche: FicheTechniques) {
    this.preparationDb = this.db.collection(this.preparationPath, ref => ref);
    console.log('add fiche prepa');
    return this.preparationDb.add({ ...fiche });
  }
  addPlat(plat: Plats) {
    this.platDb = this.db.collection(this.platPath, ref => ref);
    console.log('add fiche plat');
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
    console.log('add Utilisateur');
    return this.utilisateurDb.doc(key).set({ ...utilisateur });
  }
  addOrderTable(affichageIngredients: AffichageIngredients) {
    this.ordreTableauFTDb = this.db.collection(this.ordreTableauFTPath, ref => ref);
    console.log('add order table');
    return this.ordreTableauFTDb.add({ ...affichageIngredients });
  }
  addEcranDefaut(ecranDefaut: EcranDefaut) {
    this.ecranDefautDb = this.db.collection(this.ecranDefautPath, ref => ref);
    console.log('add ecran defaut');
    return this.ecranDefautDb.add({ ...ecranDefaut });
  }
  addFond(fond: Fond) {
    this.fondDb = this.db.collection(this.fondPath, ref => ref);
    console.log('add ecran defaut');
    return this.fondDb.add({ ...fond });
  }
  addNotification(notification: Notification) {
    this.notificationDb = this.db.collection(this.notificationPath, ref => ref);
    console.log('add notification');
    return this.notificationDb.add({ ...notification });
  }
  // end creation des documents


  // DEBUT  : affichage des documents appartenant à l'utilisateur
  getLivrePerso() {
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
      })
  }
  getListePreparations() {
    this.db.collection<FicheTechniques>(this.preparationPath, ref => ref
      .where('idUtilisateur', '==', this.user.uid)
      .orderBy('nom', 'asc')).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).subscribe((fiches: FicheTechniques[]) => {
        this.preparationListe = fiches;
      })
  }
  getFicheTechniquesPartage() {
    this.db.collection<FicheTechniques>(this.preparationPath, ref => ref
      .where('idPartage', '==', [this.user.uid])
      .orderBy('nom', 'asc'))
      .snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).subscribe((fiches: FicheTechniques[]) => {
        console.log('test4', fiches);
        this.partagePrepaListe = fiches;
      })
  }

  getListePlats() {
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
      })
  }
  getPlatsPartage() {
    this.db.collection<Plats>(this.platPath, ref => ref
      .where('idPartage', '==', [this.user.uid])
      .orderBy('nom', 'asc')).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).subscribe((plats: Plats[]) => {
        this.partagePlatsListe = plats;
      })
  }
  getFichesTechniqueAll(){
    if(this.preparationListe){
      this.preparationListe.forEach((fiche: any) => {
        this.fichesTechniqueAll.push(fiche)
      });
    }
    if(this.platListe){
      this.preparationListe.forEach((fiche: any) => {
        this.fichesTechniqueAll.push(fiche)
      });
    }
  }

  getCompteUtilisateur() {
    this.db.collection<Utilisateurs>(this.utilisateurPath, ref => ref
      .where('idUtilisateur', '==', this.user.uid)).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).subscribe((utilisateur: Utilisateurs[]) => {
        this.utilisateur = utilisateur[0];
      })
  }
  async getUtilisateurById(key: string) {
    const user = this.db.collection(this.utilisateurPath).doc(key).get().toPromise();
    return (await user).data();
  }

  // ------ordre d'affichage des denrées (Nature Unite Quantite ou Quantite Unite Nature)------
  getOrdreTableau() {
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
      })
  }
  getPosteDeTravail() {
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
      })
  }

  getProduitListe(){
    this.db.collection<Produits>(this.produitPath, ref => ref)
      .snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).subscribe((produits: Produits[]) => {
        this.produitsListe = produits;
      })
  }
  getUnitesListe(){
    this.db.collection<Unites>(this.unitePath, ref => ref)
      .snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).subscribe((unites: Unites[]) => {
        this.unitesListe = unites;
      })
  }




  getFicheTechniquesByUserIdList(userId: string): AngularFirestoreCollection<FicheTechniques> {
    this.preparationDb = this.db.collection(this.preparationPath, ref => ref.where('idPartage', '==', [userId]));
    return this.preparationDb;
  }
  async getPrepaPartageById(key: string) {
    const prepa = this.db.collection(this.preparationPath).doc(key).get().toPromise();
    return (await prepa).data();
  }
  getPrepaPartage(): AngularFirestoreCollection<FicheTechniques> {
    this.preparationDb = this.db.collection(this.preparationPath, ref => ref
      .where('idPartage', '==', [this.user.uid]).orderBy('nom', 'asc'));
    return this.preparationDb;
  }
  async getPlatPartageById(key: string) {
    const prepa = this.db.collection(this.platPath).doc(key).get().toPromise();
    return (await prepa).data();
  }
  getPlatPartage(): AngularFirestoreCollection<Plats> {
    this.platDb = this.db.collection(this.platPath, ref => ref.where('idPartage', '==', [this.user.uid]));
    return this.platDb;
  }

  getFicheTechniquesListPrepa(): AngularFirestoreCollection<FicheTechniques> {
    this.preparationDb = this.db.collection<FicheTechniques>(this.preparationPath, ref => ref
      .where('idUtilisateur', '==', this.user.uid)
      .orderBy('nom', 'asc'));
    return this.preparationDb;
  }

  getPlatspartage(userId: string): AngularFirestoreCollection<Plats> {
    this.platDb = this.db.collection(this.platPath, ref => ref.where('idPartage', '==', [userId]));
    return this.platDb;
  }
  getFicheTechniquesListPlat(): AngularFirestoreCollection<Plats> {
    this.platDb = this.db.collection(this.platPath, ref => ref
      .where('idUtilisateur', '==', this.user.uid)
      .orderBy('nom'));
    return this.platDb;
  }
  getFicheTechniquesByLivre(livreNom: string): AngularFirestoreCollection<FicheTechniques> {
    this.ficheTechniqueByLivreDb = this.db.collection(this.preparationPath, ref =>
      ref.where('idUtilisateur', '==', this.user.uid)
        .where('livre', '==', livreNom));
    return this.ficheTechniqueByLivreDb;
  }
  getFicheTechniquesByLivrePartage(livreNom: string, userId: string): AngularFirestoreCollection<FicheTechniques> {
    this.ficheTechniqueByLivreDb = this.db.collection(this.preparationPath, ref =>
      ref.where('idUtilisateur', '==', this.user.uid)
        .where('idPartage', '==', [userId])
        .where('livre', '==', livreNom));
    return this.ficheTechniqueByLivreDb;
  }
  getDenreesList(): AngularFirestoreCollection<Denrees> {
    this.denreesDb = this.db.collection(this.denreesPath, ref => ref.where('idUtilisateur', '==', this.user.uid));
    return this.denreesDb;
  }
  getProduitList(): AngularFirestoreCollection<Produits> {
    this.produitDb = this.db.collection(this.produitPath, ref => ref.orderBy('type', 'asc'));
    return this.produitDb;
  }
  getOrdreTableauFT(): AngularFirestoreCollection<AffichageIngredients> {
    this.ordreTableauFTDb = this.db.collection(this.ordreTableauFTPath, ref => ref.where('idUtilisateur', '==', this.user.uid));
    return this.ordreTableauFTDb;
  }
  getLivreList(): AngularFirestoreCollection<Livres> {
    this.livresDb = this.db.collection(this.livresPath, ref => ref.where('idUtilisateur', '==', [this.user.uid]));
    return this.livresDb;
  }
  getLivrePersoList(): AngularFirestoreCollection<Livres> {
    this.livresPersoDb = this.db.collection(this.livresPath, ref => ref
      .where('idUtilisateur', '==', [this.user.uid]).where('position', '==', 'personnel'));
    return this.livresPersoDb;
  }
  getLivreRefList(): AngularFirestoreCollection<Livres> {
    this.livresRefDb = this.db.collection(this.livresPath, ref => ref
      .where('idUtilisateur', '==', [this.user.uid]).where('référence', '==', true));
    return this.livresRefDb;
  }
  getLivreAchatList(): AngularFirestoreCollection<Livres> {
    this.livresAchatDb = this.db.collection(this.livresPath, ref => ref
      .where('idUtilisateur', '==', [this.user.uid]).where('position', '==', 'achat'));
    return this.livresAchatDb;
  }
  getUtilisateur(): AngularFirestoreCollection<Utilisateurs> {
    this.utilisateurDb = this.db.collection(this.utilisateurPath, ref => ref.where('idUtilisateur', '==', this.user.uid));
    return this.utilisateurDb;
  }

  // getUtilisateurById(userId: string): AngularFirestoreCollection<Utilisateurs> {
  //   this.utilisateurDb = this.db.collection(this.utilisateurPath, ref => ref.where('idUtilisateur', '==', userId));
  //   return this.utilisateurDb;
  // }

  getUtilisateurByEmail(email: string) {
    this.utilisateurDb = this.db.collection(this.utilisateurPath, ref => ref.where('email', '==', email));
    return this.utilisateurDb;
  }
  getEcranDefautByUID(uid: string): AngularFirestoreCollection<EcranDefaut> {
    this.ecranDefautDb = this.db.collection(this.ecranDefautPath, ref => ref.where('idUtilisateur', '==', uid));
    return this.ecranDefautDb;
  }
  getEcranDefaut(): AngularFirestoreCollection<EcranDefaut> {
    this.ecranDefautDb = this.db.collection(this.ecranDefautPath, ref => ref.where('idUtilisateur', '==', this.user.uid));
    return this.ecranDefautDb;
  }
  getNotification(): AngularFirestoreCollection<Notification> {
    this.notificationDb = this.db.collection(this.notificationPath, ref => ref.where('idUtilisateur', '==', this.user.uid).orderBy('date', 'asc'));
    return this.notificationDb;
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
    notification.notification = 'la fiche technique "' + fiche.nom + '" de type : "' + fiche.type + '" vient d\'être partagé avec vous !';
    notification.message = message;
    this.addNotification(notification);
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

  // end update documents

  // start delete

  deleteFiche(fiche) {
    if (fiche.type = "preparation") {
      this.db.collection(this.preparationPath).doc(fiche.key).delete().then(() => {
        console.log("Document successfully deleted!");
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    } else {
      this.db.collection(this.platPath).doc(fiche.key).delete().then(() => {
        console.log("Document successfully deleted!");
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    }
  }

  deleteUser(idUser: string) {
    this.db.collection(this.utilisateurPath, ref => ref.where('idUtilisateur', '==', idUser))
      .valueChanges().subscribe(res => {
        res.map((data: Utilisateurs) => {
          console.log(data);
          if (data) {
            this.db.doc(this.utilisateurPath + '/' + data.idUtilisateur).delete();
          }
        })
      })

    this.db.collection(this.ordreTableauFTPath, ref => ref.where('idUtilisateur', '==', idUser))
      .snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.doc.id })
          )
        )
      ).subscribe(res => {
        console.log(res);
        if (res) {
          this.db.doc(this.ordreTableauFTPath + '/' + res[0].key).delete();
        }
      });

    this.db.collection(this.ecranDefautPath, ref => ref.where('idUtilisateur', '==', idUser))
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

    this.db.collection(this.experiencePath, ref => ref.where('idUtilisateur', '==', idUser))
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

    this.db.collection(this.fondPath, ref => ref.where('idUtilisateur', '==', idUser))
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

    this.db.collection(this.formationPath, ref => ref.where('idUtilisateur', '==', idUser))
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

    this.db.collection(this.livresPath, ref => ref.where('idUtilisateur', '==', idUser))
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

    this.db.collection(this.notificationPath, ref => ref.where('idUtilisateur', '==', idUser))
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

    this.db.collection(this.platPath, ref => ref.where('idUtilisateur', '==', idUser))
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

    this.db.collection(this.preparationPath, ref => ref.where('idUtilisateur', '==', idUser))
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
  }






}
