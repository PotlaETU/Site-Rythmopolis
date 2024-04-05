import {Statut} from "./status";
import {Evenement} from "./evenement";
import {Client} from "./client";

export interface Reservation {
  id: number;
  date_res: Date;
  nb_billets: number;
  montant: number;
  statut: Statut;
  evenement: Evenement;
  client: Client;
}
