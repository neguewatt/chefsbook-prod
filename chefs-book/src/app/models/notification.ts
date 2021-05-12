export class Notification {

    public idUtilisateur?: string;
    public idDocPartage?: string;
    public date?: any;
    public type?: string;
    public notification?: string;
    public message = 'vide';

}

export class NotificationFiche {

    public idDocPartage?: string;
    public nomProprietaire?: string;
    public prenomProprietaire?: string;
    public date?: string;
    public type?: string;
    public notification?: string;
    public nom?: string;
    public message = 'vide';

}
