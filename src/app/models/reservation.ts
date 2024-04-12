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
