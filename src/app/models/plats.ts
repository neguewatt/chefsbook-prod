import { Livres } from 'src/app/models/livres';
import { Denrees } from './denrees';
import { Preparation } from './preparation';
export class Plats {

    public key?: string;
    public denrees?: Array<Denrees> = [];
    public date?: any;
    public nom?: string;
    public idPartage?: string[] = [];
    public idUtilisateur?: string;
    public fichePreparation?: Array<Preparation> = [];
    public descriptionCommercial?: string;
    public descriptionTechnique?: string;
    public livre?: string;
    public portion?: number;
    public poste?: string;
    public type?: string;

}

