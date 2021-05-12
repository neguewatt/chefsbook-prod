import { Denrees } from './denrees';

export class FichePlat {

    public key?: string;
    public denrees?: Denrees[] = [];
    public descriptionTechniques?: string;
    public idFicheTechnique?: string;
    public idUtilisateur?: string;
    public nom?: string;
    public quantiteproduitRef?: string;
    public produitRef?: Denrees;

}
