import { Livres } from 'src/app/models/livres';
import { Denrees } from './denrees';
import { FicheTechniques } from './ficheTechniques';
export class Plats {

    public key?: string;
    public denrees?: Array<Denrees> = [];
    public date?: any;
    public nom?: string;
    public idUtilisateur?: string;
    public fichePreparation?: Array<FicheTechniques> = [];
    public descriptionCommercial?: string;
    public descriptionTechnique?: string;
    public livre?: string;
    public portion?: string;
    public poste?: string;
    public type?: string;

}