import { Chat } from './chat';
import { Forum } from './forum';
import { Denrees } from './denrees';
import { Produits } from './produits';


export class Utilisateurs
 {
    public idUtilisateur: string = "";
    public nom: string = "";
    public prenom: string = "";
    public email: string = "";
    public limiteFiche: number = 5;
    public date: any;
    public abonnement: string = "";


}