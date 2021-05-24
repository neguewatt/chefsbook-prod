import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Denrees } from 'src/app/models/denrees';

export class Preparation {

    public key?: string;
    public apportNutritionnel = '';
    public coutParPortion = 0;
    public date?: any;
    public descriptionTechniques?: string;
    public denrees?: Array<Denrees> = [];
    public idPartage?: string[] = [];
    public idUtilisateur?: string;
    public livre?: string;
    public nom?: string;
    // public photo?: string = '';
    public poste?: string;
    public produitRef?: Denrees;
    public type?: string;
    public toggle?: boolean = true;
    public ficheDenreesToggle?: boolean = true;
}

export class FicheByCom {
    public idFiche?: string;
    public idUtilisateur?: string;
    public livre?: string;
    public nom?: string;
    public type?: string;
    public poste?: string;
    public toggle?: boolean;
}
