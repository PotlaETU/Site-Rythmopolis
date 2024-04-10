import {Statut} from "./status";
import {Evenement} from "./evenement";
import {Client} from "./client";

export interface Reservation {
  id: number;
  date_res: Date;
  nb_billets: number;
  montant: number;
  statut: string;
  evenement: Evenement;
  client: Client;
}

export interface Reservation2{
  id:number;
  etat:string;
  date_reservation:string;
  nb_billets:number;
  montant:number;
}
