import { Chat } from './chat';
import { Forum } from './forum';
import { Denrees } from './denrees';
import { Produits } from './produits';


export class Utilisateurs
 {
    public idUtilisateur = '';
    public nom = '';
    public prenom = '';
    public email = '';
    public dateCreation: any;
    public abonnement = 'G';
    public partage = 0;
    public newConnection = true;
}
